export type Macros = {
  protein: number
  carbs: number
  fat: number
  kcal: number
}

export type FoodItem = {
  id: string
  name: string
  portion: string
  icon: string
  macros: Macros
}

/** Valores nutricionais pela porção prescrita (aprox. TACO/rótulos). */
export const FOODS: Record<string, FoodItem> = {
  // Proteínas & laticínios
  whey_30: {
    id: 'whey_30',
    name: 'Whey protein',
    portion: '30g',
    icon: '🥤',
    macros: { protein: 24, carbs: 3, fat: 1.5, kcal: 120 },
  },
  whey_15: {
    id: 'whey_15',
    name: 'Whey protein',
    portion: '15g',
    icon: '🥤',
    macros: { protein: 12, carbs: 1.5, fat: 0.8, kcal: 60 },
  },
  leite_desnatado_200: {
    id: 'leite_desnatado_200',
    name: 'Leite desnatado',
    portion: '200ml',
    icon: '🥛',
    macros: { protein: 6.8, carbs: 9.8, fat: 0.2, kcal: 68 },
  },
  ovo_2: {
    id: 'ovo_2',
    name: 'Ovo de galinha',
    portion: '2 unidades',
    icon: '🥚',
    macros: { protein: 13, carbs: 1.1, fat: 10.6, kcal: 155 },
  },
  ovo_2_mexido: {
    id: 'ovo_2_mexido',
    name: 'Ovo mexido sem óleo ou cozido',
    portion: '2 unidades',
    icon: '🍳',
    macros: { protein: 13, carbs: 1.1, fat: 10.6, kcal: 155 },
  },
  queijo_mucarela_30: {
    id: 'queijo_mucarela_30',
    name: 'Queijo muçarela',
    portion: '2 fatias / 30g',
    icon: '🧀',
    macros: { protein: 6.7, carbs: 0.9, fat: 6.8, kcal: 90 },
  },
  queijo_coalho_40: {
    id: 'queijo_coalho_40',
    name: 'Queijo coalho',
    portion: '1 fatia / 40g',
    icon: '🧀',
    macros: { protein: 10, carbs: 1.2, fat: 9.2, kcal: 128 },
  },
  queijo_coalho_30: {
    id: 'queijo_coalho_30',
    name: 'Queijo coalho',
    portion: '1 fatia / 30g',
    icon: '🧀',
    macros: { protein: 7.5, carbs: 0.9, fat: 6.9, kcal: 96 },
  },
  requeijao_light_sobremesa: {
    id: 'requeijao_light_sobremesa',
    name: 'Requeijão light',
    portion: '1 colher de sobremesa',
    icon: '🫙',
    macros: { protein: 1.2, carbs: 0.6, fat: 1.5, kcal: 20 },
  },
  requeijao_light_10: {
    id: 'requeijao_light_10',
    name: 'Requeijão light',
    portion: '2 colheres de sobremesa / 10g',
    icon: '🫙',
    macros: { protein: 2.4, carbs: 1.2, fat: 3, kcal: 40 },
  },
  iogurte_natural: {
    id: 'iogurte_natural',
    name: 'Iogurte natural',
    portion: '1 unidade / 170g',
    icon: '🍶',
    macros: { protein: 6.8, carbs: 7.8, fat: 5.1, kcal: 103 },
  },
  bebida_lactea_proteica: {
    id: 'bebida_lactea_proteica',
    name: 'Bebida láctea proteica',
    portion: '1 unidade',
    icon: '🧃',
    macros: { protein: 15, carbs: 12, fat: 2, kcal: 125 },
  },
  cafe: {
    id: 'cafe',
    name: 'Café',
    portion: '1 xícara',
    icon: '☕',
    macros: { protein: 0.2, carbs: 0, fat: 0, kcal: 2 },
  },
  suco: {
    id: 'suco',
    name: 'Suco',
    portion: '1 copo',
    icon: '🧃',
    macros: { protein: 0.7, carbs: 22, fat: 0.2, kcal: 90 },
  },

  // Carnes / peixes
  peito_frango_100: {
    id: 'peito_frango_100',
    name: 'Peito de galinha/frango cozido',
    portion: '100g',
    icon: '🍗',
    macros: { protein: 32, carbs: 0, fat: 2.5, kcal: 150 },
  },
  peito_frango_150: {
    id: 'peito_frango_150',
    name: 'Peito de galinha/frango cozido',
    portion: '150g',
    icon: '🍗',
    macros: { protein: 48, carbs: 0, fat: 3.8, kcal: 225 },
  },
  patinho_100: {
    id: 'patinho_100',
    name: 'Patinho moído',
    portion: '4 colheres de sopa / 100g',
    icon: '🥩',
    macros: { protein: 26, carbs: 0, fat: 7, kcal: 167 },
  },
  patinho_aline: {
    id: 'patinho_aline',
    name: 'Patinho moído',
    portion: '5 colheres de sopa / 100g',
    icon: '🥩',
    macros: { protein: 26, carbs: 0, fat: 7, kcal: 167 },
  },
  tilapia_150: {
    id: 'tilapia_150',
    name: 'Tilápia',
    portion: '2 filés / 150g',
    icon: '🐟',
    macros: { protein: 30, carbs: 0, fat: 2.5, kcal: 144 },
  },
  frango_desfiado_80: {
    id: 'frango_desfiado_80',
    name: 'Frango desfiado',
    portion: '4 colheres de sopa / 80g',
    icon: '🍗',
    macros: { protein: 25.6, carbs: 0, fat: 2, kcal: 120 },
  },
  frango_desfiado_60: {
    id: 'frango_desfiado_60',
    name: 'Frango desfiado',
    portion: '3 colheres de sopa / 60g',
    icon: '🍗',
    macros: { protein: 19.2, carbs: 0, fat: 1.5, kcal: 90 },
  },
  frango_desfiado_120: {
    id: 'frango_desfiado_120',
    name: 'Frango desfiado',
    portion: '6 colheres de sopa / 120g',
    icon: '🍗',
    macros: { protein: 38.4, carbs: 0, fat: 3, kcal: 180 },
  },
  atum_oleo_40: {
    id: 'atum_oleo_40',
    name: 'Atum em conserva em óleo',
    portion: '3 colheres de sopa / 40g',
    icon: '🐠',
    macros: { protein: 10, carbs: 0, fat: 8, kcal: 112 },
  },
  atum_oleo_20: {
    id: 'atum_oleo_20',
    name: 'Atum em conserva em óleo',
    portion: '2 colheres de sopa / 20g',
    icon: '🐠',
    macros: { protein: 5, carbs: 0, fat: 4, kcal: 56 },
  },
  atum_oleo_64: {
    id: 'atum_oleo_64',
    name: 'Atum em conserva em óleo',
    portion: '6 colheres de sopa / 64g',
    icon: '🐠',
    macros: { protein: 16, carbs: 0, fat: 12.8, kcal: 179 },
  },
  frango_ou_atum_sanduiche: {
    id: 'frango_ou_atum_sanduiche',
    name: 'Frango desfiado ou atum em óleo',
    portion: '3 colheres de sopa',
    icon: '🥪',
    macros: { protein: 15, carbs: 0, fat: 4, kcal: 96 },
  },

  // Carboidratos
  arroz_80: {
    id: 'arroz_80',
    name: 'Arroz',
    portion: '4 colheres de sopa / 80g',
    icon: '🍚',
    macros: { protein: 2, carbs: 22.4, fat: 0.2, kcal: 102 },
  },
  arroz_100: {
    id: 'arroz_100',
    name: 'Arroz',
    portion: '5 colheres de sopa / 100g',
    icon: '🍚',
    macros: { protein: 2.5, carbs: 28, fat: 0.3, kcal: 128 },
  },
  arroz_120: {
    id: 'arroz_120',
    name: 'Arroz',
    portion: '6 colheres de sopa / 120g',
    icon: '🍚',
    macros: { protein: 3, carbs: 33.6, fat: 0.4, kcal: 153 },
  },
  macarrao_integral: {
    id: 'macarrao_integral',
    name: 'Macarrão integral',
    portion: 'porção equivalente',
    icon: '🍝',
    macros: { protein: 5, carbs: 28, fat: 1.2, kcal: 140 },
  },
  pure_batata: {
    id: 'pure_batata',
    name: 'Purê de batata inglesa',
    portion: 'porção equivalente',
    icon: '🥔',
    macros: { protein: 2.5, carbs: 24, fat: 2, kcal: 120 },
  },
  quinoa: {
    id: 'quinoa',
    name: 'Quinoa',
    portion: 'porção equivalente',
    icon: '🥣',
    macros: { protein: 4.4, carbs: 21, fat: 1.9, kcal: 120 },
  },
  batata_doce_cozida: {
    id: 'batata_doce_cozida',
    name: 'Batata doce cozida',
    portion: 'porção equivalente',
    icon: '🍠',
    macros: { protein: 1.3, carbs: 24, fat: 0.1, kcal: 100 },
  },
  cuscuz_80: {
    id: 'cuscuz_80',
    name: 'Cuscuz de milho',
    portion: '4 colheres de sopa / 80g',
    icon: '🌽',
    macros: { protein: 2.8, carbs: 20, fat: 0.5, kcal: 90 },
  },
  cuscuz_140: {
    id: 'cuscuz_140',
    name: 'Cuscuz de milho',
    portion: '7 colheres de sopa / 140g',
    icon: '🌽',
    macros: { protein: 4.9, carbs: 35, fat: 0.9, kcal: 158 },
  },
  cuscuz_180: {
    id: 'cuscuz_180',
    name: 'Cuscuz de milho',
    portion: '7 colheres de sopa / 180g',
    icon: '🌽',
    macros: { protein: 6.3, carbs: 45, fat: 1.1, kcal: 203 },
  },
  tapioca_45: {
    id: 'tapioca_45',
    name: 'Goma de tapioca',
    portion: '3 colheres de sopa / 45g',
    icon: '🫓',
    macros: { protein: 0.1, carbs: 39.6, fat: 0, kcal: 152 },
  },
  tapioca_15: {
    id: 'tapioca_15',
    name: 'Goma de tapioca',
    portion: '1 colher de sopa / 15g',
    icon: '🫓',
    macros: { protein: 0, carbs: 13.2, fat: 0, kcal: 51 },
  },
  tapioca_30: {
    id: 'tapioca_30',
    name: 'Goma de tapioca',
    portion: '2 colheres de sopa / 30g',
    icon: '🫓',
    macros: { protein: 0.1, carbs: 26.4, fat: 0, kcal: 102 },
  },
  tapioca_60: {
    id: 'tapioca_60',
    name: 'Goma de tapioca',
    portion: '4 colheres de sopa / 60g',
    icon: '🫓',
    macros: { protein: 0.1, carbs: 52.8, fat: 0, kcal: 203 },
  },
  batata_doce_120: {
    id: 'batata_doce_120',
    name: 'Batata doce',
    portion: '4 fatias / 120g',
    icon: '🍠',
    macros: { protein: 1.6, carbs: 28.8, fat: 0.1, kcal: 118 },
  },
  batata_doce_250: {
    id: 'batata_doce_250',
    name: 'Batata doce',
    portion: '4 fatias / 250g',
    icon: '🍠',
    macros: { protein: 3.3, carbs: 60, fat: 0.3, kcal: 245 },
  },
  inhame_130: {
    id: 'inhame_130',
    name: 'Inhame',
    portion: '4 rodelas / 130g',
    icon: '🟤',
    macros: { protein: 2.2, carbs: 30.7, fat: 0.1, kcal: 126 },
  },
  inhame_260: {
    id: 'inhame_260',
    name: 'Inhame',
    portion: '4 rodelas / 260g',
    icon: '🟤',
    macros: { protein: 4.4, carbs: 61.4, fat: 0.3, kcal: 252 },
  },
  macaxeira_100: {
    id: 'macaxeira_100',
    name: 'Macaxeira',
    portion: '2 pedaços / 100g',
    icon: '🪵',
    macros: { protein: 1.1, carbs: 36.2, fat: 0.3, kcal: 151 },
  },
  macaxeira_200: {
    id: 'macaxeira_200',
    name: 'Macaxeira',
    portion: '2 pedaços / 200g',
    icon: '🪵',
    macros: { protein: 2.2, carbs: 72.4, fat: 0.6, kcal: 302 },
  },
  pao_frances: {
    id: 'pao_frances',
    name: 'Pão francês',
    portion: '1 unidade',
    icon: '🥖',
    macros: { protein: 8, carbs: 58, fat: 3.1, kcal: 300 },
  },
  pao_forma_integral_2: {
    id: 'pao_forma_integral_2',
    name: 'Pão de forma integral',
    portion: '2 fatias',
    icon: '🍞',
    macros: { protein: 6, carbs: 24, fat: 2, kcal: 140 },
  },
  torrada_integral_2: {
    id: 'torrada_integral_2',
    name: 'Torrada integral',
    portion: '2 unidades',
    icon: '🍞',
    macros: { protein: 3.5, carbs: 18, fat: 1.5, kcal: 100 },
  },
  aveia_20: {
    id: 'aveia_20',
    name: 'Aveia',
    portion: '1 colher de sopa / 20g',
    icon: '🌾',
    macros: { protein: 2.8, carbs: 13.3, fat: 1.7, kcal: 78 },
  },

  // Leguminosas
  feijao_preto_100: {
    id: 'feijao_preto_100',
    name: 'Feijão preto',
    portion: '1 concha / 100g',
    icon: '🫘',
    macros: { protein: 4.5, carbs: 14, fat: 0.5, kcal: 77 },
  },
  feijao_verde: {
    id: 'feijao_verde',
    name: 'Feijão verde',
    portion: '1 concha',
    icon: '🟢',
    macros: { protein: 3.5, carbs: 12, fat: 0.4, kcal: 65 },
  },
  lentilha: {
    id: 'lentilha',
    name: 'Lentilha',
    portion: '1 concha',
    icon: '🟤',
    macros: { protein: 6.3, carbs: 16, fat: 0.4, kcal: 93 },
  },
  grao_bico: {
    id: 'grao_bico',
    name: 'Grão de bico',
    portion: '1 concha',
    icon: '🟡',
    macros: { protein: 6.2, carbs: 16.7, fat: 1.7, kcal: 104 },
  },

  // Saladas / extras
  salada_vapor_3: {
    id: 'salada_vapor_3',
    name: 'Salada de legumes no vapor',
    portion: '3 colheres de sopa',
    icon: '🥦',
    macros: { protein: 1.5, carbs: 4, fat: 0.2, kcal: 25 },
  },
  salada_crua: {
    id: 'salada_crua',
    name: 'Salada crua à vontade',
    portion: 'à vontade',
    icon: '🥗',
    macros: { protein: 1, carbs: 3, fat: 0.2, kcal: 18 },
  },
  chia_10: {
    id: 'chia_10',
    name: 'Semente de chia',
    portion: '1 colher de sopa / 10g',
    icon: '🌱',
    macros: { protein: 1.7, carbs: 4.2, fat: 3.1, kcal: 49 },
  },
  chia_15: {
    id: 'chia_15',
    name: 'Semente de chia',
    portion: '1 colher de sopa / 15g',
    icon: '🌱',
    macros: { protein: 2.5, carbs: 6.3, fat: 4.6, kcal: 73 },
  },

  // Frutas
  mamao_fatia: {
    id: 'mamao_fatia',
    name: 'Mamão',
    portion: '1 fatia',
    icon: '🍈',
    macros: { protein: 0.5, carbs: 10.4, fat: 0.1, kcal: 43 },
  },
  fruta: {
    id: 'fruta',
    name: 'Fruta',
    portion: '1 porção',
    icon: '🍎',
    macros: { protein: 0.8, carbs: 18, fat: 0.3, kcal: 75 },
  },
  laranja: {
    id: 'laranja',
    name: 'Laranja',
    portion: '1 unidade',
    icon: '🍊',
    macros: { protein: 1, carbs: 13, fat: 0.2, kcal: 55 },
  },
  abacaxi_70: {
    id: 'abacaxi_70',
    name: 'Abacaxi',
    portion: '1 fatia / 70g',
    icon: '🍍',
    macros: { protein: 0.6, carbs: 8.6, fat: 0.1, kcal: 34 },
  },
  kiwi: {
    id: 'kiwi',
    name: 'Kiwi',
    portion: '1 unidade',
    icon: '🥝',
    macros: { protein: 0.8, carbs: 11, fat: 0.4, kcal: 46 },
  },
}

export function emptyMacros(): Macros {
  return { protein: 0, carbs: 0, fat: 0, kcal: 0 }
}

export function addMacros(a: Macros, b: Macros): Macros {
  return {
    protein: a.protein + b.protein,
    carbs: a.carbs + b.carbs,
    fat: a.fat + b.fat,
    kcal: a.kcal + b.kcal,
  }
}

export function sumFoodIds(ids: string[]): Macros {
  return ids.reduce((acc, id) => {
    const food = FOODS[id]
    return food ? addMacros(acc, food.macros) : acc
  }, emptyMacros())
}
