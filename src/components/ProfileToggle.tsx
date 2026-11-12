import type { ProfileId } from '../data/plans'
import { PLANS } from '../data/plans'

type Props = {
  value: ProfileId
  onChange: (id: ProfileId) => void
}

export function ProfileToggle({ value, onChange }: Props) {
  return (
    <div className="profile-toggle" role="tablist" aria-label="Perfil">
      {(Object.keys(PLANS) as ProfileId[]).map((id) => {
        const plan = PLANS[id]
        const active = value === id
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={active}
            className={`profile-toggle__btn ${active ? 'is-active' : ''}`}
            onClick={() => onChange(id)}
          >
            <span className="profile-toggle__name">{plan.name}</span>
            <span className="profile-toggle__sub">{plan.subtitle}</span>
          </button>
        )
      })}
    </div>
  )
}
