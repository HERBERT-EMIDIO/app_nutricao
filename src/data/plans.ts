export type ProfileId = 'herbert' | 'aline'

export type ChoiceOption = {
  id: string
  label: string
  foodIds: string[]
  note?: string
}

export type ChoiceGroup = {
  id: string
  title: string
  hint?: string
  /** exclusive = escolher 1; multi = vários permitidos (raro) */
  mode: 'exclusive' | 'multi'
  options: ChoiceOption[]
}

export type MealOption = {
  id: string
  title: string
  description?: string
  groups: ChoiceGroup[]
}

export type Meal = {
  id: string
  title: string
  timeHint?: string
  /** Se true, as mealOptions são alternativas OU entre si */
  exclusiveOptions: boolean
  /** Refeições mutuamente exclusivas (ex.: almoço com vs sem feijão) */
  mutexWith?: string[]
  options: MealOption[]
}

export type ProfilePlan = {
  id: ProfileId
  name: string
  fullName: string
  subtitle: string
  meals: Meal[]
}

export const PLANS: Record<ProfileId, ProfilePlan> = {
  herbert: {
    id: 'herbert',
    name: 'Herbert',
    fullName: 'Herbert Felipe Emidio da Silva',
    subtitle: 'Plano 1 — NOVAMED',
    meals: [
      {
        id: 'h_cafe',
        title: 'Café da manhã',
        exclusiveOptions: true,
        options: [
          {
            id: 'h_cafe_a',
            title: 'Opção A',
            groups: [
              {
                id: 'h_cafe_a_items',
                title: 'Itens',
                mode: 'multi',
                options: [
                  {
                    id: 'h_cafe_a_all',
                    label: 'Whey protein + Leite desnatado',
                    foodIds: ['whey_30', 'leite_desnatado_200'],
                  },
                ],
              },
            ],
          },
          {
            id: 'h_cafe_b',
            title: 'Opção B (OU)',
            groups: [
              {
                id: 'h_cafe_b_items',
                title: 'Itens',
                mode: 'multi',
                options: [
                  {
                    id: 'h_cafe_b_all',
                    label: 'Ovos + Mamão + Chia',
                    foodIds: ['ovo_2', 'mamao_fatia', 'chia_10'],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'h_almoco',
        title: 'Almoço (com feijão)',
        exclusiveOptions: false,
        mutexWith: ['h_almoco_sem'],
        options: [
          {
            id: 'h_almoco_padrao',
            title: 'Montagem do prato',
            groups: [
              {
                id: 'h_almoco_salada',
                title: 'Prato base / Salada',
                hint: 'Escolher 1',
                mode: 'exclusive',
                options: [
                  {
                    id: 'h_salada_vapor',
                    label: 'Salada de legumes no vapor',
                    foodIds: ['salada_vapor_3'],
                  },
                  {
                    id: 'h_salada_crua',
                    label: 'Salada crua à vontade',
                    foodIds: ['salada_crua'],
                  },
                ],
              },
              {
                id: 'h_almoco_prot',
                title: 'Proteína',
                hint: 'Escolher 1',
                mode: 'exclusive',
                options: [
                  {
                    id: 'h_prot_frango',
                    label: 'Peito de galinha/frango cozido',
                    foodIds: ['peito_frango_100'],
                  },
                  {
                    id: 'h_prot_patinho',
                    label: 'Patinho moído',
                    foodIds: ['patinho_100'],
                  },
                  {
                    id: 'h_prot_tilapia',
                    label: 'Tilápia',
                    foodIds: ['tilapia_150'],
                  },
                ],
              },
              {
                id: 'h_almoco_carb',
                title: 'Carboidrato',
                hint: 'Escolher 1',
                mode: 'exclusive',
                options: [
                  { id: 'h_carb_arroz', label: 'Arroz', foodIds: ['arroz_80'] },
                  {
                    id: 'h_carb_macarrao',
                    label: 'Macarrão integral',
                    foodIds: ['macarrao_integral'],
                  },
                  {
                    id: 'h_carb_pure',
                    label: 'Purê de batata inglesa',
                    foodIds: ['pure_batata'],
                  },
                  { id: 'h_carb_quinoa', label: 'Quinoa', foodIds: ['quinoa'] },
                  {
                    id: 'h_carb_batata',
                    label: 'Batata doce cozida',
                    foodIds: ['batata_doce_cozida'],
                  },
                ],
              },
              {
                id: 'h_almoco_feijao',
                title: 'Feijão / Leguminosas',
                hint: 'Escolher 1',
                mode: 'exclusive',
                options: [
                  {
                    id: 'h_feijao_preto',
                    label: 'Feijão preto',
                    foodIds: ['feijao_preto_100'],
                  },
                  {
                    id: 'h_feijao_verde',
                    label: 'Feijão verde',
                    foodIds: ['feijao_verde'],
                  },
                  { id: 'h_lentilha', label: 'Lentilha', foodIds: ['lentilha'] },
                  {
                    id: 'h_grao_bico',
                    label: 'Grão de bico',
                    foodIds: ['grao_bico'],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'h_almoco_sem',
        title: 'Almoço SEM feijão',
        timeHint: 'Alternativa — carboidrato aumentado',
        exclusiveOptions: false,
        mutexWith: ['h_almoco'],
        options: [
          {
            id: 'h_almoco_sem_montagem',
            title: 'Montagem do prato',
            groups: [
              {
                id: 'h_almoco_sem_salada',
                title: 'Prato base / Salada',
                hint: 'Escolher 1',
                mode: 'exclusive',
                options: [
                  {
                    id: 'h_sem_salada_vapor',
                    label: 'Salada de legumes no vapor',
                    foodIds: ['salada_vapor_3'],
                  },
                  {
                    id: 'h_sem_salada_crua',
                    label: 'Salada crua à vontade',
                    foodIds: ['salada_crua'],
                  },
                ],
              },
              {
                id: 'h_almoco_sem_prot',
                title: 'Proteína',
                hint: 'Escolher 1',
                mode: 'exclusive',
                options: [
                  {
                    id: 'h_sem_prot_frango',
                    label: 'Peito de galinha/frango cozido',
                    foodIds: ['peito_frango_100'],
                  },
                  {
                    id: 'h_sem_prot_patinho',
                    label: 'Patinho moído',
                    foodIds: ['patinho_100'],
                  },
                  {
                    id: 'h_sem_prot_tilapia',
                    label: 'Tilápia',
                    foodIds: ['tilapia_150'],
                  },
                ],
              },
              {
                id: 'h_almoco_sem_carb',
                title: 'Carboidrato aumentado',
                hint: 'Escolher 1',
                mode: 'exclusive',
                options: [
                  {
                    id: 'h_sem_carb_arroz',
                    label: 'Arroz',
                    foodIds: ['arroz_100'],
                  },
                  {
                    id: 'h_sem_carb_macarrao',
                    label: 'Macarrão integral',
                    foodIds: ['macarrao_integral'],
                  },
                  {
                    id: 'h_sem_carb_pure',
                    label: 'Purê de batata inglesa',
                    foodIds: ['pure_batata'],
                  },
                  {
                    id: 'h_sem_carb_quinoa',
                    label: 'Quinoa',
                    foodIds: ['quinoa'],
                  },
                  {
                    id: 'h_sem_carb_batata',
                    label: 'Batata doce cozida',
                    foodIds: ['batata_doce_cozida'],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'h_jantar',
        title: 'Jantar',
        timeHint: '19:00',
        exclusiveOptions: true,
        options: [
          {
            id: 'h_jantar_1',
            title: 'Opção 1 — Carboidrato + Proteína',
            groups: [
              {
                id: 'h_j1_carb',
                title: 'Carboidrato',
                hint: 'Escolher 1',
                mode: 'exclusive',
                options: [
                  {
                    id: 'h_j1_cuscuz',
                    label: 'Cuscuz de milho',
                    foodIds: ['cuscuz_80'],
                  },
                  {
                    id: 'h_j1_tapioca',
                    label: 'Goma de tapioca',
                    foodIds: ['tapioca_45'],
                  },
                  {
                    id: 'h_j1_batata',
                    label: 'Batata doce',
                    foodIds: ['batata_doce_120'],
                  },
                  {
                    id: 'h_j1_inhame',
                    label: 'Inhame',
                    foodIds: ['inhame_130'],
                  },
                  {
                    id: 'h_j1_macaxeira',
                    label: 'Macaxeira',
                    foodIds: ['macaxeira_100'],
                  },
                ],
              },
              {
                id: 'h_j1_prot',
                title: 'Proteína',
                hint: 'Escolher 1',
                mode: 'exclusive',
                options: [
                  {
                    id: 'h_j1_ovo',
                    label: 'Ovo mexido sem óleo ou cozido',
                    foodIds: ['ovo_2_mexido'],
                  },
                  {
                    id: 'h_j1_coalho',
                    label: 'Queijo coalho',
                    foodIds: ['queijo_coalho_40'],
                  },
                  {
                    id: 'h_j1_frango',
                    label: 'Frango desfiado',
                    foodIds: ['frango_desfiado_80'],
                  },
                  {
                    id: 'h_j1_atum',
                    label: 'Atum em conserva em óleo',
                    foodIds: ['atum_oleo_40'],
                  },
                ],
              },
            ],
          },
          {
            id: 'h_jantar_2',
            title: 'Opção 2 — Sanduíche natural',
            groups: [
              {
                id: 'h_j2_items',
                title: 'Itens',
                mode: 'multi',
                options: [
                  {
                    id: 'h_j2_all',
                    label:
                      '2 fatias pão integral + frango/atum + requeijão light',
                    foodIds: [
                      'pao_forma_integral_2',
                      'frango_ou_atum_sanduiche',
                      'requeijao_light_sobremesa',
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'h_jantar_3',
            title: 'Opção 3 — Crepioca',
            groups: [
              {
                id: 'h_j3_items',
                title: 'Itens',
                mode: 'multi',
                options: [
                  {
                    id: 'h_j3_all',
                    label: 'Ovos + Tapioca + Frango + Chia',
                    foodIds: [
                      'ovo_2',
                      'tapioca_15',
                      'frango_desfiado_60',
                      'chia_10',
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  aline: {
    id: 'aline',
    name: 'Aline',
    fullName: 'Aline de Almeida C',
    subtitle: 'Plano 2 — NOVAMED',
    meals: [
      {
        id: 'a_cafe',
        title: 'Café da manhã',
        exclusiveOptions: true,
        options: [
          {
            id: 'a_cafe_a',
            title: 'Opção A',
            groups: [
              {
                id: 'a_cafe_a_prot',
                title: 'Proteína base',
                hint: 'Escolher 1',
                mode: 'exclusive',
                options: [
                  {
                    id: 'a_cafe_a_ovo',
                    label: 'Ovo mexido ou cozido',
                    foodIds: ['ovo_2_mexido'],
                  },
                  {
                    id: 'a_cafe_a_queijo',
                    label: 'Queijo muçarela',
                    foodIds: ['queijo_mucarela_30'],
                  },
                ],
              },
              {
                id: 'a_cafe_a_rest',
                title: 'Acompanhamentos',
                mode: 'multi',
                options: [
                  {
                    id: 'a_cafe_a_bundle',
                    label: 'Pão francês + Whey + Suco + Fruta',
                    foodIds: ['pao_frances', 'whey_30', 'suco', 'fruta'],
                  },
                ],
              },
            ],
          },
          {
            id: 'a_cafe_b',
            title: 'Opção B (OU)',
            groups: [
              {
                id: 'a_cafe_b_carb',
                title: 'Carboidrato',
                hint: 'Escolher 1',
                mode: 'exclusive',
                options: [
                  {
                    id: 'a_cafe_b_cuscuz',
                    label: 'Cuscuz de milho',
                    foodIds: ['cuscuz_140'],
                  },
                  {
                    id: 'a_cafe_b_tapioca',
                    label: 'Goma de tapioca',
                    foodIds: ['tapioca_60'],
                  },
                ],
              },
              {
                id: 'a_cafe_b_ovo',
                title: 'Proteína',
                mode: 'multi',
                options: [
                  {
                    id: 'a_cafe_b_ovos',
                    label: '2 ovos de galinha',
                    foodIds: ['ovo_2'],
                  },
                ],
              },
            ],
          },
          {
            id: 'a_cafe_c',
            title: 'Opção C (OU) — Crepioca',
            groups: [
              {
                id: 'a_cafe_c_items',
                title: 'Itens',
                mode: 'multi',
                options: [
                  {
                    id: 'a_cafe_c_all',
                    label: 'Ovos + Tapioca + Chia + Frango',
                    foodIds: [
                      'ovo_2',
                      'tapioca_30',
                      'chia_15',
                      'frango_desfiado_60',
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'a_almoco',
        title: 'Almoço',
        exclusiveOptions: false,
        options: [
          {
            id: 'a_almoco_montagem',
            title: 'Montagem do prato',
            groups: [
              {
                id: 'a_almoco_salada',
                title: 'Prato base / Salada',
                hint: 'Escolher 1',
                mode: 'exclusive',
                options: [
                  {
                    id: 'a_salada_vapor',
                    label: 'Salada de legumes no vapor',
                    foodIds: ['salada_vapor_3'],
                  },
                  {
                    id: 'a_salada_crua',
                    label: 'Salada crua à vontade',
                    foodIds: ['salada_crua'],
                  },
                ],
              },
              {
                id: 'a_almoco_prot',
                title: 'Proteína',
                hint: 'Escolher 1',
                mode: 'exclusive',
                options: [
                  {
                    id: 'a_prot_frango',
                    label: 'Peito de galinha/frango cozido',
                    foodIds: ['peito_frango_150'],
                  },
                  {
                    id: 'a_prot_patinho',
                    label: 'Patinho moído',
                    foodIds: ['patinho_aline'],
                  },
                  {
                    id: 'a_prot_tilapia',
                    label: 'Tilápia',
                    foodIds: ['tilapia_150'],
                  },
                ],
              },
              {
                id: 'a_almoco_carb',
                title: 'Carboidrato',
                hint: 'Escolher 1',
                mode: 'exclusive',
                options: [
                  { id: 'a_carb_arroz', label: 'Arroz', foodIds: ['arroz_120'] },
                  {
                    id: 'a_carb_macarrao',
                    label: 'Macarrão integral',
                    foodIds: ['macarrao_integral'],
                  },
                  {
                    id: 'a_carb_pure',
                    label: 'Purê de batata inglesa',
                    foodIds: ['pure_batata'],
                  },
                  { id: 'a_carb_quinoa', label: 'Quinoa', foodIds: ['quinoa'] },
                  {
                    id: 'a_carb_batata',
                    label: 'Batata doce cozida',
                    foodIds: ['batata_doce_cozida'],
                  },
                ],
              },
              {
                id: 'a_almoco_feijao',
                title: 'Feijão / Leguminosas',
                hint: 'Escolher 1',
                mode: 'exclusive',
                options: [
                  {
                    id: 'a_feijao_preto',
                    label: 'Feijão preto',
                    foodIds: ['feijao_preto_100'],
                  },
                  {
                    id: 'a_feijao_verde',
                    label: 'Feijão verde',
                    foodIds: ['feijao_verde'],
                  },
                  { id: 'a_lentilha', label: 'Lentilha', foodIds: ['lentilha'] },
                  {
                    id: 'a_grao_bico',
                    label: 'Grão de bico',
                    foodIds: ['grao_bico'],
                  },
                ],
              },
              {
                id: 'a_almoco_fruta',
                title: 'Frutas',
                hint: 'Escolher 1',
                mode: 'exclusive',
                options: [
                  { id: 'a_fruta_laranja', label: 'Laranja', foodIds: ['laranja'] },
                  {
                    id: 'a_fruta_abacaxi',
                    label: 'Abacaxi',
                    foodIds: ['abacaxi_70'],
                  },
                  { id: 'a_fruta_kiwi', label: 'Kiwi', foodIds: ['kiwi'] },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'a_lanche',
        title: 'Lanche da tarde',
        exclusiveOptions: true,
        options: [
          {
            id: 'a_lanche_a',
            title: 'Opção A',
            groups: [
              {
                id: 'a_lanche_a_base',
                title: 'Base',
                mode: 'multi',
                options: [
                  {
                    id: 'a_lanche_a_torrada',
                    label: 'Torrada integral (2 unidades)',
                    foodIds: ['torrada_integral_2'],
                  },
                ],
              },
              {
                id: 'a_lanche_a_top',
                title: 'Cobertura',
                hint: 'Escolher 1',
                mode: 'exclusive',
                options: [
                  {
                    id: 'a_lanche_a_req',
                    label: 'Requeijão light',
                    foodIds: ['requeijao_light_10'],
                  },
                  {
                    id: 'a_lanche_a_atum',
                    label: 'Atum em conserva em óleo',
                    foodIds: ['atum_oleo_20'],
                  },
                  {
                    id: 'a_lanche_a_coalho',
                    label: 'Queijo coalho',
                    foodIds: ['queijo_coalho_30'],
                  },
                ],
              },
              {
                id: 'a_lanche_a_cafe',
                title: 'Bebida',
                mode: 'multi',
                options: [
                  { id: 'a_lanche_a_cafe_item', label: 'Café', foodIds: ['cafe'] },
                ],
              },
            ],
          },
          {
            id: 'a_lanche_b',
            title: 'Opção B (OU)',
            groups: [
              {
                id: 'a_lanche_b_items',
                title: 'Itens',
                mode: 'multi',
                options: [
                  {
                    id: 'a_lanche_b_all',
                    label: 'Fruta + Aveia',
                    foodIds: ['fruta', 'aveia_20'],
                  },
                ],
              },
            ],
          },
          {
            id: 'a_lanche_c',
            title: 'Opção C (OU)',
            groups: [
              {
                id: 'a_lanche_c_items',
                title: 'Itens',
                mode: 'multi',
                options: [
                  {
                    id: 'a_lanche_c_all',
                    label: 'Iogurte natural + Fruta + Whey 15g',
                    foodIds: ['iogurte_natural', 'fruta', 'whey_15'],
                  },
                ],
              },
            ],
          },
          {
            id: 'a_lanche_d',
            title: 'Opção D (OU)',
            groups: [
              {
                id: 'a_lanche_d_items',
                title: 'Itens',
                mode: 'multi',
                options: [
                  {
                    id: 'a_lanche_d_all',
                    label: 'Bebida láctea proteica + Fruta',
                    foodIds: ['bebida_lactea_proteica', 'fruta'],
                  },
                ],
              },
            ],
          },
          {
            id: 'a_lanche_e',
            title: 'Opção E (OU) — Sanduíche natural',
            groups: [
              {
                id: 'a_lanche_e_items',
                title: 'Itens',
                mode: 'multi',
                options: [
                  {
                    id: 'a_lanche_e_all',
                    label:
                      '2 fatias pão integral + frango/atum + requeijão light',
                    foodIds: [
                      'pao_forma_integral_2',
                      'frango_ou_atum_sanduiche',
                      'requeijao_light_sobremesa',
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'a_jantar',
        title: 'Jantar',
        exclusiveOptions: false,
        options: [
          {
            id: 'a_jantar_montagem',
            title: 'Montagem',
            groups: [
              {
                id: 'a_jantar_carb',
                title: 'Carboidrato',
                hint: 'Escolher 1',
                mode: 'exclusive',
                options: [
                  {
                    id: 'a_j_cuscuz',
                    label: 'Cuscuz de milho',
                    foodIds: ['cuscuz_180'],
                  },
                  {
                    id: 'a_j_tapioca',
                    label: 'Goma de tapioca',
                    foodIds: ['tapioca_60'],
                  },
                  {
                    id: 'a_j_batata',
                    label: 'Batata doce',
                    foodIds: ['batata_doce_250'],
                  },
                  {
                    id: 'a_j_inhame',
                    label: 'Inhame',
                    foodIds: ['inhame_260'],
                  },
                  {
                    id: 'a_j_macaxeira',
                    label: 'Macaxeira + Pão francês',
                    foodIds: ['macaxeira_200', 'pao_frances'],
                    note: 'Anotação do plano: + pão francês 1 unidade',
                  },
                ],
              },
              {
                id: 'a_jantar_prot',
                title: 'Proteína',
                hint: 'Escolher 1',
                mode: 'exclusive',
                options: [
                  {
                    id: 'a_j_ovo',
                    label: 'Ovo mexido sem óleo ou cozido',
                    foodIds: ['ovo_2_mexido'],
                  },
                  {
                    id: 'a_j_coalho',
                    label: 'Queijo coalho',
                    foodIds: ['queijo_coalho_40'],
                  },
                  {
                    id: 'a_j_frango',
                    label: 'Frango desfiado',
                    foodIds: ['frango_desfiado_120'],
                  },
                  {
                    id: 'a_j_atum',
                    label: 'Atum em conserva em óleo',
                    foodIds: ['atum_oleo_64'],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
}
