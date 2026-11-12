import { useMemo, useState } from 'react'
import { FOODS, sumFoodIds } from '../data/foods'
import { PROFILE_GOALS } from '../data/goals'
import { getBuilderCatalog } from '../data/builderCatalog'
import type { ProfileId } from '../data/plans'
import { TRAINING_OPTIONS, type TrainingId } from '../data/training'
import { suggestMeal } from '../lib/suggestMeal'
import { MacroSummary } from './MacroSummary'

type Props = {
  profileId: ProfileId
  selectedFoodIds: string[]
  onChange: (foodIds: string[]) => void
}

function toggleId(list: string[], id: string): string[] {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id]
}

export function CustomMealBuilder({
  profileId,
  selectedFoodIds,
  onChange,
}: Props) {
  const goal = PROFILE_GOALS[profileId]
  const catalog = useMemo(() => getBuilderCatalog(profileId), [profileId])
  const [trainingId, setTrainingId] = useState<TrainingId>(
    profileId === 'herbert' ? 'run_long' : 'rest',
  )
  const [trainingNote, setTrainingNote] = useState('')
  const [advice, setAdvice] = useState<ReturnType<typeof suggestMeal> | null>(
    null,
  )

  const selectedSet = useMemo(
    () => new Set(selectedFoodIds),
    [selectedFoodIds],
  )
  const customMacros = useMemo(
    () => sumFoodIds(selectedFoodIds),
    [selectedFoodIds],
  )

  const applySuggestion = () => {
    const suggestion = suggestMeal({ profileId, trainingId, trainingNote })
    setAdvice(suggestion)
    onChange([...suggestion.proteinIds, ...suggestion.sideIds])
  }

  const renderGroup = (
    title: string,
    items: { foodId: string; label: string }[],
  ) => (
    <div className="builder-group">
      <h4>{title}</h4>
      <div className="choice-group__list">
        {items.map((item) => {
          const food = FOODS[item.foodId]
          if (!food) return null
          const checked = selectedSet.has(item.foodId)
          return (
            <label
              key={item.foodId}
              className={`food-option ${checked ? 'is-checked' : ''}`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() =>
                  onChange(toggleId(selectedFoodIds, item.foodId))
                }
              />
              <span className="food-option__icon" aria-hidden>
                {food.icon}
              </span>
              <span className="food-option__body">
                <span className="food-option__label">{food.name}</span>
                <span className="food-option__portion">{food.portion}</span>
                <span className="food-option__macros">
                  {Math.round(food.macros.kcal)} kcal · P{' '}
                  {food.macros.protein.toFixed(1)} · C{' '}
                  {food.macros.carbs.toFixed(1)} · G{' '}
                  {food.macros.fat.toFixed(1)}
                </span>
              </span>
            </label>
          )
        })}
      </div>
    </div>
  )

  return (
    <section className="meal-section builder-section">
      <header className="meal-section__header">
        <div>
          <h2 className="meal-section__title">Monte sua alimentação</h2>
          <p className="meal-section__hint">
            Além das opções A/B/C do plano — monte proteína e acompanhamentos
            com sugestão da IA (somente alimentos prescritos).
          </p>
        </div>
        <MacroSummary macros={customMacros} compact />
      </header>

      <div className="goal-banner">
        <strong>{goal.focus}</strong>
        <p>{goal.athleteNote}</p>
      </div>

      <div className="training-panel">
        <label className="training-panel__label" htmlFor="training-select">
          O que você vai treinar hoje?
        </label>
        <select
          id="training-select"
          className="training-panel__select"
          value={trainingId}
          onChange={(e) => setTrainingId(e.target.value as TrainingId)}
        >
          {TRAINING_OPTIONS.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
        <p className="training-panel__hint">
          {TRAINING_OPTIONS.find((t) => t.id === trainingId)?.hint}
        </p>
        <input
          className="training-panel__note"
          type="text"
          value={trainingNote}
          onChange={(e) => setTrainingNote(e.target.value)}
          placeholder={
            profileId === 'herbert'
              ? 'Ex.: 18 km longão, pace fácil, pós-corrida…'
              : 'Ex.: caminhada leve, academia, dia sem treino…'
          }
          aria-label="Detalhe do treino"
        />
        <div className="training-panel__actions">
          <button type="button" className="btn-primary" onClick={applySuggestion}>
            Sugerir com IA do plano
          </button>
          <button
            type="button"
            className="btn-reset"
            onClick={() => {
              onChange([])
              setAdvice(null)
            }}
          >
            Limpar montagem
          </button>
        </div>
      </div>

      {advice && (
        <div className="ai-advice">
          <h3>{advice.title}</h3>
          <ul>
            {advice.rationale.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p className="ai-advice__tip">{advice.timingTip}</p>
        </div>
      )}

      <div className="builder-grid">
        {renderGroup('Proteínas', catalog.proteins)}
        {renderGroup('Acompanhamentos', catalog.sides)}
      </div>

      {selectedFoodIds.length > 0 && (
        <p className="builder-footnote">
          Itens na montagem livre:{' '}
          {selectedFoodIds
            .map((id) => FOODS[id]?.name)
            .filter(Boolean)
            .join(', ')}
          . Soma desta seção: {Math.round(customMacros.kcal)} kcal · P{' '}
          {customMacros.protein.toFixed(1)}g · C {customMacros.carbs.toFixed(1)}
          g · G {customMacros.fat.toFixed(1)}g
        </p>
      )}
    </section>
  )
}
