import { useMemo, useState } from 'react'
import {
  FOODS,
  addMacros,
  emptyMacros,
  type Macros,
} from '../data/foods'
import {
  PLANS,
  type ChoiceGroup,
  type Meal,
  type MealOption,
  type ProfileId,
} from '../data/plans'

export type SelectionMap = Record<string, Set<string>>

function cloneSelection(map: SelectionMap): SelectionMap {
  const next: SelectionMap = {}
  for (const [key, value] of Object.entries(map)) {
    next[key] = new Set(value)
  }
  return next
}

function clearMealGroups(meal: Meal, map: SelectionMap): SelectionMap {
  const next = cloneSelection(map)
  for (const option of meal.options) {
    for (const group of option.groups) {
      delete next[group.id]
    }
  }
  return next
}

function isOptionActive(
  meal: Meal,
  option: MealOption,
  selectedMealOption: string | null,
): boolean {
  if (!meal.exclusiveOptions) return true
  return selectedMealOption === option.id
}

function autoPickOption(option: MealOption, map: SelectionMap): SelectionMap {
  const next = cloneSelection(map)
  for (const group of option.groups) {
    if (group.mode === 'multi' && group.options.length === 1) {
      next[group.id] = new Set([group.options[0].id])
    }
  }
  return next
}

export function useMealSelection(profileId: ProfileId) {
  const plan = PLANS[profileId]
  const [activeMealOption, setActiveMealOption] = useState<
    Record<string, string | null>
  >({})
  const [selected, setSelected] = useState<SelectionMap>({})

  const resetProfile = () => {
    setActiveMealOption({})
    setSelected({})
  }

  const selectMealOption = (meal: Meal, optionId: string) => {
    const turningOff = activeMealOption[meal.id] === optionId

    setActiveMealOption((prev) => ({
      ...prev,
      [meal.id]: turningOff ? null : optionId,
    }))

    setSelected((prev) => {
      let next = clearMealGroups(meal, prev)
      if (turningOff) return next
      const option = meal.options.find((o) => o.id === optionId)
      return option ? autoPickOption(option, next) : next
    })
  }

  const clearSiblingMeals = (meal: Meal, map: SelectionMap): SelectionMap => {
    let next = map
    if (!meal.mutexWith?.length) return next
    for (const siblingId of meal.mutexWith) {
      const sibling = plan.meals.find((m) => m.id === siblingId)
      if (sibling) next = clearMealGroups(sibling, next)
    }
    return next
  }

  const toggleChoice = (
    meal: Meal,
    option: MealOption,
    group: ChoiceGroup,
    choiceId: string,
  ) => {
    if (meal.mutexWith?.length) {
      setActiveMealOption((prev) => {
        const next = { ...prev }
        for (const siblingId of meal.mutexWith!) {
          next[siblingId] = null
        }
        return next
      })
    }

    if (meal.exclusiveOptions && activeMealOption[meal.id] !== option.id) {
      setActiveMealOption((prev) => ({ ...prev, [meal.id]: option.id }))
      setSelected((prev) => {
        let next = clearSiblingMeals(meal, clearMealGroups(meal, prev))
        next = autoPickOption(option, next)
        const key = group.id
        const current = next[key] ? new Set(next[key]) : new Set<string>()
        if (group.mode === 'exclusive') {
          current.clear()
          current.add(choiceId)
        } else {
          current.add(choiceId)
        }
        next[key] = current
        return next
      })
      return
    }

    setSelected((prev) => {
      let next = clearSiblingMeals(meal, cloneSelection(prev))
      const key = group.id
      const current = next[key] ? new Set(next[key]) : new Set<string>()

      if (group.mode === 'exclusive') {
        if (current.has(choiceId)) {
          current.delete(choiceId)
        } else {
          current.clear()
          current.add(choiceId)
        }
      } else if (current.has(choiceId)) {
        current.delete(choiceId)
      } else {
        current.add(choiceId)
      }

      next[key] = current
      return next
    })
  }

  const isSelected = (groupId: string, choiceId: string) =>
    selected[groupId]?.has(choiceId) ?? false

  const totals = useMemo(() => {
    let total = emptyMacros()
    const byMeal: Record<string, Macros> = {}

    for (const meal of plan.meals) {
      let mealTotal = emptyMacros()
      const selectedOptionId = activeMealOption[meal.id] ?? null

      for (const option of meal.options) {
        if (!isOptionActive(meal, option, selectedOptionId)) continue

        for (const group of option.groups) {
          const picks = selected[group.id]
          if (!picks) continue
          for (const choiceId of picks) {
            const choice = group.options.find((o) => o.id === choiceId)
            if (!choice) continue
            for (const foodId of choice.foodIds) {
              const food = FOODS[foodId]
              if (food) {
                mealTotal = addMacros(mealTotal, food.macros)
              }
            }
          }
        }
      }

      byMeal[meal.id] = mealTotal
      total = addMacros(total, mealTotal)
    }

    return { total, byMeal }
  }, [plan.meals, activeMealOption, selected])

  return {
    plan,
    activeMealOption,
    selectMealOption,
    toggleChoice,
    isSelected,
    totals,
    resetProfile,
  }
}
