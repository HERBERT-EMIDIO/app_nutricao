import type { ProfileId } from './plans'
import { PLANS } from './plans'
import { FOODS } from './foods'

export type BuilderRole = 'protein' | 'side'

export type BuilderFood = {
  foodId: string
  role: BuilderRole
  label: string
}

const PROTEIN_IDS = new Set([
  'whey_30',
  'whey_15',
  'ovo_2',
  'ovo_2_mexido',
  'queijo_mucarela_30',
  'queijo_coalho_40',
  'queijo_coalho_30',
  'peito_frango_100',
  'peito_frango_150',
  'patinho_100',
  'patinho_aline',
  'tilapia_150',
  'frango_desfiado_80',
  'frango_desfiado_60',
  'frango_desfiado_120',
  'atum_oleo_40',
  'atum_oleo_20',
  'atum_oleo_64',
  'frango_ou_atum_sanduiche',
  'iogurte_natural',
  'bebida_lactea_proteica',
  'requeijao_light_sobremesa',
  'requeijao_light_10',
])

function roleFor(foodId: string): BuilderRole {
  return PROTEIN_IDS.has(foodId) ? 'protein' : 'side'
}

/** Catálogo único de alimentos do plano do perfil (porções prescritas). */
export function getBuilderCatalog(profileId: ProfileId): {
  proteins: BuilderFood[]
  sides: BuilderFood[]
} {
  const plan = PLANS[profileId]
  const seen = new Set<string>()
  const proteins: BuilderFood[] = []
  const sides: BuilderFood[] = []

  for (const meal of plan.meals) {
    for (const option of meal.options) {
      for (const group of option.groups) {
        for (const choice of group.options) {
          for (const foodId of choice.foodIds) {
            if (seen.has(foodId) || !FOODS[foodId]) continue
            seen.add(foodId)
            const food = FOODS[foodId]
            const item: BuilderFood = {
              foodId,
              role: roleFor(foodId),
              label: `${food.name} (${food.portion})`,
            }
            if (item.role === 'protein') proteins.push(item)
            else sides.push(item)
          }
        }
      }
    }
  }

  proteins.sort((a, b) => a.label.localeCompare(b.label, 'pt-BR'))
  sides.sort((a, b) => a.label.localeCompare(b.label, 'pt-BR'))
  return { proteins, sides }
}
