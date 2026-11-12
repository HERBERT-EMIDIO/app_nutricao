import { useState } from 'react'
import { ProfileToggle } from './components/ProfileToggle'
import { MealSection } from './components/MealSection'
import { MacroSummary } from './components/MacroSummary'
import { emptyMacros } from './data/foods'
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

  return (
    <>
      <p className="app__patient">{plan.fullName}</p>

      <aside className="app__totals">
        <MacroSummary macros={totals.total} title="Totais selecionados" />
        <button type="button" className="btn-reset" onClick={resetProfile}>
          Limpar seleções
        </button>
      </aside>

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
      </main>
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
          Prescrição da nutricionista Rayana Carolina da Silva Cruz — selecione
          os itens do plano e acompanhe proteínas, carboidratos, gorduras e
          calorias em tempo real.
        </p>
        <ProfileToggle value={profileId} onChange={setProfileId} />
      </header>

      <ProfileWorkspace key={profileId} profileId={profileId} />

      <footer className="app__footer">
        Fonte: Documento Escaneado 22.pdf · Porções conforme prescrição · Macros
        estimados por porção
      </footer>
    </div>
  )
}
