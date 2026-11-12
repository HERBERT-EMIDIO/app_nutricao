import type { ProfileId } from './plans'

export type EnergyGoal = 'surplus' | 'deficit'

export type ProfileGoal = {
  energyGoal: EnergyGoal
  athleteNote: string
  focus: string
  aiBrief: string
}

export const PROFILE_GOALS: Record<ProfileId, ProfileGoal> = {
  herbert: {
    energyGoal: 'surplus',
    athleteNote:
      'Corredor com volume elevado — priorizar reposição de carboidrato e manter superávit para não emagrecer.',
    focus: 'Performance + superávit calórico',
    aiBrief:
      'Sugira montagens do plano com mais carboidrato em dias de volume/longa e proteína adequada na recuperação, sem sair dos alimentos prescritos.',
  },
  aline: {
    energyGoal: 'deficit',
    athleteNote:
      'Plano de emagrecimento com uso de caneta emagrecedora — priorizar saciedade, proteína e boa hidratação, sem forçar volume excessivo.',
    focus: 'Emagrecimento + alimentação adequada',
    aiBrief:
      'Sugira montagens leves e proteicas do plano, com carboidrato moderado, respeitando porções e favorecendo tolerância/saciedade sob GLP-1.',
  },
}
