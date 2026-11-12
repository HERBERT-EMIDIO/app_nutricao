import { useMemo, useState } from 'react'
import { ProfileToggle } from './components/ProfileToggle'
import { MealSection } from './components/MealSection'
import { MacroSummary } from './components/MacroSummary'
import { CustomMealBuilder } from './components/CustomMealBuilder'
import { addMacros, emptyMacros, sumFoodIds } from './data/foods'
import { PROFILE_GOALS } from './data/goals'
import type { ProfileId } from './data/plans'
import { useMealSelection } from './hooks/useMealSelection'

function ProfileWorkspace({ profileId }: { profileId: ProfileId }) {
  const {
    plan,
    activeMealOption,
    selectMealOption,
    toggleChoice,
    isSelected,
    totals,
    resetProfile,
  } = useMealSelection(profileId)

  const [customFoodIds, setCustomFoodIds] = useState<string[]>([])
  const goal = PROFILE_GOALS[profileId]

  const customMacros = useMemo(
    () => sumFoodIds(customFoodIds),
    [customFoodIds],
  )

  const grandTotal = useMemo(
    () => addMacros(totals.total, customMacros),
    [totals.total, customMacros],
  )

  const clearAll = () => {
    resetProfile()
    setCustomFoodIds([])
  }

  return (
    <>
      <p className="app__patient">{plan.fullName}</p>
      <p className="app__goal-line">{goal.focus} — {goal.athleteNote}</p>

      <main className="app__meals">
        {plan.meals.map((meal) => (
          <MealSection
            key={meal.id}
            meal={meal}
            activeOptionId={activeMealOption[meal.id] ?? null}
            mealMacros={totals.byMeal[meal.id] ?? emptyMacros()}
            isSelected={isSelected}
            onSelectMealOption={(optionId) => selectMealOption(meal, optionId)}
            onToggleChoice={(option, group, choiceId) =>
              toggleChoice(meal, option, group, choiceId)
            }
          />
        ))}

        <CustomMealBuilder
          profileId={profileId}
          selectedFoodIds={customFoodIds}
          onChange={setCustomFoodIds}
        />
      </main>

      <aside className="app__totals">
        <MacroSummary macros={grandTotal} title="Totais do dia (plano + montagem)" />
        <p className="totals-breakdown">
          Plano prescrito: {Math.round(totals.total.kcal)} kcal · Montagem livre:{' '}
          {Math.round(customMacros.kcal)} kcal
        </p>
        <button type="button" className="btn-reset" onClick={clearAll}>
          Limpar tudo
        </button>
      </aside>
    </>
  )
}

export default function App() {
  const [profileId, setProfileId] = useState<ProfileId>('herbert')

  return (
    <div className="app">
      <div className="app__glow" aria-hidden />
      <header className="app__hero">
        <p className="app__eyebrow">NOVAMED · Recife</p>
        <h1 className="app__brand">Plano Alimentar</h1>
        <p className="app__lead">
          Prescrição da nutricionista Rayana Carolina da Silva Cruz — use as
          opções do plano ou monte sua refeição com sugestão por treino e
          acompanhe os macros.
        </p>
        <ProfileToggle value={profileId} onChange={setProfileId} />
      </header>

      <ProfileWorkspace key={profileId} profileId={profileId} />

      <footer className="app__footer">
        Fonte: Documento Escaneado 22.pdf · Porções conforme prescrição · A IA
        só sugere alimentos do plano · Macros estimados por porção
      </footer>
    </div>
  )
}
