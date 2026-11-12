# Especificações — App Nutrição

## Objetivo
Aplicativo web de montagem de refeições e cálculo de macros, estritamente alinhado ao plano alimentar prescrito por **Rayana Carolina da Silva Cruz** (NOVAMED Recife) para:

| Perfil | Paciente | Identificador |
|--------|----------|---------------|
| Plano 1 | Herbert Felipe Emidio da Silva | `herbert` |
| Plano 2 | Aline de Almeida C | `aline` |

## Fonte da verdade
- Arquivo: `Documento Escaneado 22.pdf` (2 páginas escaneadas)
- Páginas extraídas para referência visual: `pdf_pages/page1_0.jpg`, `pdf_pages/page2_0.jpg`
- Quantidades (g, ml, colheres, fatias, unidades) e alternativas **OU** não podem ser alteradas sem nova prescrição

## Metas clínicas (contexto do app)
- **Herbert:** corredor com volume alto → manter **superávit** (não emagrecer)
- **Aline:** emagrecimento + caneta emagrecedora → **déficit**, saciedade e alimentação adequada

## Funcionalidades obrigatórias
1. Toggle dinâmico Herbert / Aline
2. Categorias de refeição por perfil (ver abaixo)
3. Checkboxes / seleção exclusiva para opções OU e “Escolher 1”
4. Bloco **Monte sua alimentação** (proteína + acompanhamentos do plano)
5. Campo **O que você vai treinar?** + sugestão da IA integrada (só alimentos prescritos)
6. Cálculo em tempo real: Proteínas, Carboidratos, Gorduras, kcal (plano + montagem)
7. Totais **não flutuantes** (sem sticky)
8. Ícones por alimento/grupo

## Herbert (Plano 1)
- Café da manhã: Opção A (whey + leite) **OU** Opção B (ovos + mamão + chia)
- Almoço com feijão: salada + proteína + carboidrato + leguminosa
- Almoço SEM feijão (alternativa, mutex com o anterior): salada + proteína + carb aumentado
- Jantar 19:00: Opção 1 (carb + prot) **OU** Sanduíche **OU** Crepioca

## Aline (Plano 2)
- Café: Opções A / B / C (crepioca)
- Almoço: salada + proteína + carb + feijão + fruta
- Lanche da tarde: Opções A–E
- Jantar: carboidrato (1) + proteína (1); macaxeira inclui pão francês (anotação do plano)

## Arquitetura
```
src/
  data/foods.ts   # porções + macros estimados
  data/plans.ts   # árvore de refeições/opções
  hooks/useMealSelection.ts
  components/ProfileToggle, MealSection, FoodOption, MacroSummary
```

## Regras de IA / manutenção
- Não inventar substituições dietéticas
- Não misturar gramagens de Herbert e Aline
- Preferir editar `plans.ts` / `foods.ts` a hardcode em UI
- Macros são estimativas por porção (TACO/rótulos), não substituem o PDF clínico
