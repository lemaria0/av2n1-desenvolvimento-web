# CineShelf — catálogo de filmes e séries

Aplicação web desenvolvida com HTML, CSS e TypeScript puro para o projeto da disciplina Tópicos Especiais em Projeto e Desenvolvimento Web.

**Objetivo:** organizar um catálogo pessoal de filmes e séries, permitindo cadastrar títulos, localizar registros, acompanhar o que já foi assistido e consultar um resumo da coleção.

**Autores:** [inserir nome(s) dos integrantes da equipe]

## Funcionalidades

- Cadastro de filmes, séries, documentários e animes.
- Validação de título obrigatório e ano inteiro entre 1888 e 2100.
- Exibição dos registros em cards responsivos.
- Busca por título e filtros por categoria e status.
- Edição dos dados e alteração entre “Quero assistir” e “Já assisti”.
- Exclusão de itens com confirmação.
- Resumo dinâmico da quantidade total, assistidos e pendentes.
- Persistência local no navegador via `localStorage`.
- Estado inicial com dados demonstrativos; os exemplos podem ser removidos.

## Tecnologias

- HTML5
- CSS3
- TypeScript 5
- JavaScript gerado pelo compilador TypeScript

## Como executar

### Abrir a aplicação

Abra o arquivo `index.html` em um navegador. O projeto já inclui o JavaScript compilado em `dist/main.js`.

### Recompilar o TypeScript

É necessário ter Node.js e npm instalados. Na pasta do projeto, execute:

```bash
npm install
npm run build
```

O comando `npm run build` compila os arquivos de `src/` e atualiza `dist/main.js`.

## Organização dos arquivos

```text
cineshelf/
├── src/
│   ├── components/
│   │   ├── catalogView.ts     # Renderização da lista e do resumo
│   │   ├── dialog.ts          # Formulário, modal, validação e notificações
│   │   └── movieCard.ts       # Criação do HTML dos cards
│   ├── data/
│   │   ├── initialData.ts     # Categorias e dados demonstrativos
│   │   └── storage.ts         # Leitura e gravação no localStorage
│   ├── dom/
│   │   └── elements.ts        # Seleção e referências aos elementos do DOM
│   ├── services/
│   │   ├── catalogActions.ts  # Cadastro, edição, status e exclusão
│   │   └── catalogFilters.ts  # Busca e filtros
│   ├── utils/
│   │   ├── catalogLabels.ts   # Rótulos e classes visuais por categoria
│   │   └── html.ts            # Escape de texto para renderização segura
│   ├── main.ts                # Eventos e inicialização da aplicação
│   └── types.ts               # Tipos e interface CatalogItem
├── dist/
│   └── main.js                # JavaScript compilado (gerado)
├── index.html
├── styles.css
├── package.json
├── tsconfig.json
└── README.md
```

## Conceitos de TypeScript demonstrados

- **Tipos e interface:** `Category`, `StatusFilter` e `CatalogItem`.
- **Array tipado:** catálogo declarado como `CatalogItem[]`.
- **Funções tipadas:** funções com parâmetros e retornos explícitos para validação, filtragem, renderização e operações do catálogo.
- **DOM e eventos:** seletores tipados, `addEventListener`, delegação de eventos e tratamento de elementos que podem não existir.
- **Tipagem segura:** uso de `unknown` na leitura dos dados armazenados e validação do formato, sem substituir a modelagem por `any`.

## Observações

- Os arquivos de `src/` são os fontes TypeScript. Edite esses arquivos, não `dist/main.js`.
- `dist/main.js` é gerado pelo comando `npm run build`.
- Não é necessário enviar `node_modules/` ao repositório.


## Apresentação em vídeo

**https://youtu.be/L6LFkabI0UQ**

## Equipe

- **João Pedro dos Santos Jácome da Silva**
- **Letícia Maria Eufrásio Reis**
- **Maria Luiza Pereira Sousa**