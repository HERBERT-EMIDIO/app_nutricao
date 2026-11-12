export type TrainingId =
  | 'rest'
  | 'run_easy'
  | 'run_moderate'
  | 'run_long'
  | 'run_intervals'
  | 'strength'
  | 'other'

export type TrainingOption = {
  id: TrainingId
  label: string
  hint: string
}

export const TRAINING_OPTIONS: TrainingOption[] = [
  {
    id: 'rest',
    label: 'Descanso / mobilidade',
    hint: 'Dia leve — manter proteína e ajustar energia',
  },
  {
    id: 'run_easy',
    label: 'Corrida leve / regenerativa',
    hint: 'Reposição moderada de carboidrato',
  },
  {
    id: 'run_moderate',
    label: 'Corrida moderada',
    hint: 'Equilíbrio proteína + carboidrato',
  },
  {
    id: 'run_long',
    label: 'Corrida longa / volume alto',
    hint: 'Mais carboidrato e energia total',
  },
  {
    id: 'run_intervals',
    label: 'Intervalado / qualidade',
    hint: 'Carboidrato disponível + proteína na recuperação',
  },
  {
    id: 'strength',
    label: 'Força / musculação',
    hint: 'Ênfase em proteína',
  },
  {
    id: 'other',
    label: 'Outro treino',
    hint: 'Descreva abaixo para afinar a sugestão',
  },
]
