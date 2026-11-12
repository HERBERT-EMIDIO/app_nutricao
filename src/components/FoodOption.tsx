import { FOODS } from '../data/foods'
import type { ChoiceOption } from '../data/plans'

type Props = {
  option: ChoiceOption
  groupId: string
  checked: boolean
  exclusive: boolean
  onToggle: () => void
}

export function FoodOption({
  option,
  groupId,
  checked,
  exclusive,
  onToggle,
}: Props) {
  const foods = option.foodIds.map((id) => FOODS[id]).filter(Boolean)
  const icon = foods[0]?.icon ?? '🍽️'
  const portion =
    foods.length === 1
      ? foods[0].portion
      : foods.map((f) => `${f.name} (${f.portion})`).join(' + ')

  return (
    <label className={`food-option ${checked ? 'is-checked' : ''}`}>
      <input
        type={exclusive ? 'radio' : 'checkbox'}
        checked={checked}
        onChange={onToggle}
        name={exclusive ? groupId : undefined}
      />
      <span className="food-option__icon" aria-hidden>
        {icon}
      </span>
      <span className="food-option__body">
        <span className="food-option__label">{option.label}</span>
        <span className="food-option__portion">{portion}</span>
        {option.note && <span className="food-option__note">{option.note}</span>}
        {foods.length > 0 && (
          <span className="food-option__macros">
            {Math.round(foods.reduce((s, f) => s + f.macros.kcal, 0))} kcal · P{' '}
            {foods.reduce((s, f) => s + f.macros.protein, 0).toFixed(1)} · C{' '}
            {foods.reduce((s, f) => s + f.macros.carbs, 0).toFixed(1)} · G{' '}
            {foods.reduce((s, f) => s + f.macros.fat, 0).toFixed(1)}
          </span>
        )}
      </span>
    </label>
  )
}
