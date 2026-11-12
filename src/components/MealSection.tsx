import type { Macros } from '../data/foods'
import type { Meal, MealOption, ChoiceGroup } from '../data/plans'
import { FoodOption } from './FoodOption'
import { MacroSummary } from './MacroSummary'

type Props = {
  meal: Meal
  activeOptionId: string | null
  mealMacros: Macros
  isSelected: (groupId: string, choiceId: string) => boolean
  onSelectMealOption: (optionId: string) => void
  onToggleChoice: (
    option: MealOption,
    group: ChoiceGroup,
    choiceId: string,
  ) => void
}

export function MealSection({
  meal,
  activeOptionId,
  mealMacros,
  isSelected,
  onSelectMealOption,
  onToggleChoice,
}: Props) {
  return (
    <section className="meal-section">
      <header className="meal-section__header">
        <div>
          <h2 className="meal-section__title">{meal.title}</h2>
          {meal.timeHint && (
            <p className="meal-section__hint">{meal.timeHint}</p>
          )}
        </div>
        <MacroSummary macros={mealMacros} compact />
      </header>

      <div className="meal-section__options">
        {meal.options.map((option) => {
          const isActive =
            !meal.exclusiveOptions || activeOptionId === option.id

          return (
            <article
              key={option.id}
              className={`meal-option ${isActive ? 'is-active' : ''} ${
                meal.exclusiveOptions ? 'is-exclusive' : ''
              }`}
            >
              {meal.exclusiveOptions ? (
                <button
                  type="button"
                  className="meal-option__picker"
                  aria-pressed={isActive}
                  onClick={() => onSelectMealOption(option.id)}
                >
                  <span className="meal-option__radio" aria-hidden />
                  <span>
                    <strong>{option.title}</strong>
                    {option.description && <em>{option.description}</em>}
                  </span>
                </button>
              ) : (
                <h3 className="meal-option__title">{option.title}</h3>
              )}

              {(isActive || !meal.exclusiveOptions) && (
                <div className="meal-option__groups">
                  {option.groups.map((group) => (
                    <div key={group.id} className="choice-group">
                      <div className="choice-group__head">
                        <h4>{group.title}</h4>
                        {group.hint && <span>{group.hint}</span>}
                      </div>
                      <div className="choice-group__list">
                        {group.options.map((choice) => (
                          <FoodOption
                            key={choice.id}
                            option={choice}
                            groupId={group.id}
                            exclusive={group.mode === 'exclusive'}
                            checked={isSelected(group.id, choice.id)}
                            onToggle={() =>
                              onToggleChoice(option, group, choice.id)
                            }
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}
