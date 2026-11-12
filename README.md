# Plano Alimentar — NOVAMED

App web para montar refeições e acompanhar macros com base na prescrição da nutricionista **Rayana Carolina da Silva Cruz** para **Herbert** (Plano 1) e **Aline** (Plano 2).

## Rodar

```bash
npm install
npm run dev
```

Build estático (útil no XAMPP):

```bash
npm run build
```

Abra `dist/index.html` ou sirva a pasta `dist`.

## Estrutura

- `.cursor/rules/` — especificações do projeto para o Cursor
- `src/data/plans.ts` — refeições e opções OU por perfil
- `src/data/foods.ts` — porções e macros estimados
- `Documento Escaneado 22.pdf` — fonte oficial da prescrição
