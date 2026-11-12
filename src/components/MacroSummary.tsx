import type { Macros } from '../data/foods'

type Props = {
  macros: Macros
  title?: string
  compact?: boolean
}

function fmt(n: number) {
  return Number.isInteger(n) ? String(n) : n.toFixed(1)
}

export function MacroSummary({ macros, title = 'Totais do dia', compact }: Props) {
  return (
    <section className={`macro-summary ${compact ? 'is-compact' : ''}`}>
      {!compact && <h2 className="macro-summary__title">{title}</h2>}
      <div className="macro-summary__grid">
        <div className="macro-chip macro-chip--kcal">
          <span className="macro-chip__label">Calorias</span>
          <strong className="macro-chip__value">{fmt(macros.kcal)}</strong>
          <span className="macro-chip__unit">kcal</span>
        </div>
        <div className="macro-chip macro-chip--p">
          <span className="macro-chip__label">Proteínas</span>
          <strong className="macro-chip__value">{fmt(macros.protein)}</strong>
          <span className="macro-chip__unit">g</span>
        </div>
        <div className="macro-chip macro-chip--c">
          <span className="macro-chip__label">Carboidratos</span>
          <strong className="macro-chip__value">{fmt(macros.carbs)}</strong>
          <span className="macro-chip__unit">g</span>
        </div>
        <div className="macro-chip macro-chip--f">
          <span className="macro-chip__label">Gorduras</span>
          <strong className="macro-chip__value">{fmt(macros.fat)}</strong>
          <span className="macro-chip__unit">g</span>
        </div>
      </div>
    </section>
  )
}
