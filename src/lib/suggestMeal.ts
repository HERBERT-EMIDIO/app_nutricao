import { FOODS } from '../data/foods'
import { PROFILE_GOALS } from '../data/goals'
import { getBuilderCatalog } from '../data/builderCatalog'
import type { ProfileId } from '../data/plans'
import type { TrainingId } from '../data/training'
import { TRAINING_OPTIONS } from '../data/training'

export type MealSuggestion = {
  proteinIds: string[]
  sideIds: string[]
  title: string
  rationale: string[]
  timingTip: string
}

function pickFirstAvailable(
  preferred: string[],
  available: Set<string>,
): string | null {
  for (const id of preferred) {
    if (available.has(id)) return id
  }
  return null
}

function pickMany(
  preferred: string[],
  available: Set<string>,
  count: number,
): string[] {
  const out: string[] = []
  for (const id of preferred) {
    if (available.has(id) && !out.includes(id)) {
      out.push(id)
      if (out.length >= count) break
    }
  }
  return out
}

function detectHighVolumeNote(note: string): boolean {
  const n = note.toLowerCase()
  return (
    n.includes('longa') ||
    n.includes('km') ||
    n.includes('volume') ||
    n.includes('maratona') ||
    n.includes('meio') ||
    n.includes('tiro') ||
    /\d+\s*k/.test(n)
  )
}

/**
 * Assistente nutricional integrado: escolhe apenas itens do plano
 * conforme meta do perfil + tipo de treino informado.
 */
export function suggestMeal(params: {
  profileId: ProfileId
  trainingId: TrainingId
  trainingNote: string
}): MealSuggestion {
  const { profileId, trainingId, trainingNote } = params
  const goal = PROFILE_GOALS[profileId]
  const catalog = getBuilderCatalog(profileId)
  const available = new Set([
    ...catalog.proteins.map((p) => p.foodId),
    ...catalog.sides.map((s) => s.foodId),
  ])
  const training =
    TRAINING_OPTIONS.find((t) => t.id === trainingId) ?? TRAINING_OPTIONS[0]
  const highFromNote = detectHighVolumeNote(trainingNote)
  const isHighLoad =
    trainingId === 'run_long' ||
    trainingId === 'run_intervals' ||
    highFromNote
  const isEasy =
    trainingId === 'rest' || trainingId === 'run_easy' || trainingId === 'other'

  const rationale: string[] = []
  let proteinIds: string[] = []
  let sideIds: string[] = []
  let title = ''
  let timingTip = ''

  if (profileId === 'herbert') {
    rationale.push(goal.athleteNote)

    if (isHighLoad) {
      title = 'Montagem para volume / carga alta'
      timingTip =
        'Em dias longos: carboidrato antes/depois e proteína na refeição principal para recuperar sem cair no déficit.'
      proteinIds = [
        pickFirstAvailable(
          [
            'peito_frango_100',
            'frango_desfiado_80',
            'patinho_100',
            'ovo_2_mexido',
            'whey_30',
            'tilapia_150',
          ],
          available,
        ),
      ].filter(Boolean) as string[]

      sideIds = pickMany(
        [
          'arroz_100',
          'arroz_80',
          'batata_doce_120',
          'cuscuz_80',
          'macaxeira_100',
          'feijao_preto_100',
          'salada_crua',
          'chia_10',
          'mamao_fatia',
        ],
        available,
        4,
      )
      rationale.push(
        `Treino: ${training.label}${trainingNote ? ` — ${trainingNote}` : ''}.`,
      )
      rationale.push(
        'Priorizei carboidrato do plano (arroz aumentado / tubérculos / cuscuz) + proteína magra para manter superávit.',
      )
    } else if (trainingId === 'strength') {
      title = 'Montagem com foco em proteína'
      timingTip =
        'Proteína na refeição pós-treino e carboidrato do plano para não treinar em déficit.'
      proteinIds = [
        pickFirstAvailable(
          ['peito_frango_100', 'ovo_2', 'whey_30', 'patinho_100'],
          available,
        ),
      ].filter(Boolean) as string[]
      sideIds = pickMany(
        ['arroz_80', 'batata_doce_cozida', 'feijao_preto_100', 'salada_vapor_3'],
        available,
        3,
      )
      rationale.push('Ênfase em proteína do plano + carboidrato de suporte.')
    } else {
      title = isEasy
        ? 'Montagem de recuperação / dia mais leve'
        : 'Montagem equilibrada do plano'
      timingTip =
        'Mesmo em dia mais leve, Herbert deve evitar subalimentação crônica — mantenha pelo menos uma fonte de carboidrato do plano.'
      proteinIds = [
        pickFirstAvailable(
          ['ovo_2', 'whey_30', 'peito_frango_100', 'queijo_coalho_40'],
          available,
        ),
      ].filter(Boolean) as string[]
      sideIds = pickMany(
        [
          'arroz_80',
          'cuscuz_80',
          'feijao_preto_100',
          'salada_crua',
          'leite_desnatado_200',
          'mamao_fatia',
        ],
        available,
        3,
      )
      rationale.push(
        `Treino: ${training.label}. Mantive energia adequada sem exagerar o volume.`,
      )
    }
  } else {
    // Aline — déficit / caneta emagrecedora
    rationale.push(goal.athleteNote)
    title = isHighLoad
      ? 'Montagem leve com mais energia (dia mais ativo)'
      : 'Montagem para saciedade e emagrecimento'
    timingTip =
      'Com caneta emagrecedora: priorize proteína primeiro, mastigue devagar e não force volume se houver náusea — hidrate-se.'

    proteinIds = [
      pickFirstAvailable(
        [
          'peito_frango_150',
          'frango_desfiado_120',
          'ovo_2_mexido',
          'tilapia_150',
          'whey_30',
          'atum_oleo_64',
          'iogurte_natural',
        ],
        available,
      ),
    ].filter(Boolean) as string[]

    if (isHighLoad) {
      sideIds = pickMany(
        [
          'arroz_120',
          'batata_doce_250',
          'cuscuz_180',
          'feijao_preto_100',
          'salada_crua',
          'laranja',
          'fruta',
        ],
        available,
        3,
      )
      rationale.push(
        'Dia mais ativo: mantive proteína alta e carboidrato do plano em porção controlada — sem sair do déficit prescrito.',
      )
    } else if (trainingId === 'strength') {
      sideIds = pickMany(
        ['salada_vapor_3', 'feijao_preto_100', 'fruta', 'torrada_integral_2'],
        available,
        3,
      )
      rationale.push(
        'Foco em proteína e volume baixo de carboidrato para saciedade.',
      )
    } else {
      sideIds = pickMany(
        [
          'salada_crua',
          'feijao_preto_100',
          'arroz_120',
          'kiwi',
          'torrada_integral_2',
          'aveia_20',
        ],
        available,
        3,
      )
      rationale.push(
        `Treino: ${training.label}${trainingNote ? ` — ${trainingNote}` : ''}.`,
      )
      rationale.push(
        'Priorizei proteína + salada/leguminosa e carboidrato moderado das opções do plano.',
      )
    }
  }

  // Fallback se catálogo não tiver os IDs preferidos
  if (!proteinIds.length && catalog.proteins[0]) {
    proteinIds = [catalog.proteins[0].foodId]
  }
  if (!sideIds.length) {
    sideIds = catalog.sides.slice(0, 2).map((s) => s.foodId)
  }

  const kcal = [...proteinIds, ...sideIds].reduce(
    (sum, id) => sum + (FOODS[id]?.macros.kcal ?? 0),
    0,
  )
  rationale.push(
    `Estimativa desta montagem: ~${Math.round(kcal)} kcal (apenas itens do plano).`,
  )

  return { proteinIds, sideIds, title, rationale, timingTip }
}
