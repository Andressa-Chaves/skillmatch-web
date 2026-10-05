# SkillMatch Web

Aplicação web que analisa a compatibilidade entre o perfil de uma pessoa candidata e vagas reais de front-end júnior — calculando percentual de aderência, destacando a vaga mais compatível e recomendando o que estudar a seguir.

Este projeto é a evolução do **SkillMatch JS** (mini-projeto da Semana 06, um motor de compatibilidade rodando no console) para uma aplicação web completa em HTML, CSS e JavaScript puro, com formulário, persistência local e consumo de dados via fetch.

---

## O problema que resolve

Simula a situação de uma startup de recrutamento sobrecarregada com candidaturas: em vez de comparar currículo por currículo manualmente, a aplicação recebe o perfil da pessoa candidata, compara automaticamente com um catálogo de vagas e devolve, em segundos:

- o percentual de compatibilidade e a classificação (**Alta**, **Média** ou **Baixa**);
- as habilidades que a pessoa já tem e as que faltam;
- a vaga mais compatível;
- uma recomendação de estudo baseada nas habilidades que mais faltam nas vagas.

## Como executar

O projeto usa módulos ES e `fetch`, então **não funciona abrindo o `index.html` direto** (`file://`). É preciso um servidor local:

1. Clone o repositório:
   ```bash
   git clone https://github.com/Andressa-Chaves/skillmatch-web.git
   ```
2. Abra a pasta no **VS Code**.
3. Instale a extensão **Live Server** (se ainda não tiver).
4. Clique com o botão direito no `index.html` e escolha **Open with Live Server** (ou clique em **Go Live** na barra inferior).
5. A página abre no navegador, normalmente em `http://127.0.0.1:5500`.
6. Preencha o formulário de perfil e clique em **"Analisar a compatibilidade"**.
7. Veja o resumo do seu perfil, a vaga mais compatível, os cards com cada vaga e a recomendação de estudo.
8. Recarregue a página: o perfil continua salvo.

## Tecnologias e técnicas utilizadas

- **HTML5 semântico** — landmarks (`header`, `main`, `footer`), um único `h1`, hierarquia de títulos, `label`/`for` em todos os campos, `lang="pt-BR"`
- **CSS3** — variáveis customizadas, Flexbox, layout mobile-first com media queries (640px e 960px)
- **JavaScript (ES2022+)** — classes com herança, closures, callbacks, `async`/`await`, módulos ES
- **Fetch API** — carregamento do catálogo de vagas a partir de um arquivo JSON local
- **Web Storage API** (`localStorage`) — persistência do perfil entre visitas

## Estrutura do projeto

```
skillmatch-web/
├── index.html
├── README.md
└── assets/
    ├── styles/
    │   └── index.styles.css
    ├── scripts/
    │   ├── main.js      → ponto de entrada, orquestra os demais módulos
    │   ├── motor.js      → regras de negócio (classes, cálculo, recomendação)
    │   ├── ui.js         → renderização e manipulação do DOM
    │   └── dados.js      → fetch das vagas e persistência no localStorage
    ├── data/
    │   └── vagas.json
    └── img/
        └── logo.svg
```

## Decisões técnicas

### Regra de cálculo da compatibilidade

```
compatibilidade = (habilidades em comum ÷ total de requisitos da vaga) × 100

```

Aplicada de forma consistente a todas as vagas, dentro do método `calculateCompatibility` da classe `Job`.

### Classificação

| Percentual | Classificação |
| ---------- | ------------- |
| 80% a 100% | Alta          |
| 50% a 79%  | Média         |
| 0% a 49%   | Baixa         |

### Critério de desempate entre vagas

Quando duas vagas empatam no percentual de compatibilidade, vence a que tem **menos habilidades faltando** — um critério mais preciso do que decidir aleatoriamente, já que reflete melhor qual vaga exige menos esforço adicional da pessoa candidata.

### Recomendação de estudo

A habilidade recomendada é a que aparece como faltante no **maior número de vagas simultaneamente** — estudá-la aumenta a compatibilidade em várias oportunidades de uma vez, não em apenas uma.

### POO: herança com propósito

`Job` modela uma vaga genérica (construtor, atributos, método de cálculo usando `this`). `JobFrontEnd extends Job` especializa isso para vagas de front-end: acrescenta um atributo `stack` (definido a partir dos próprios requisitos da vaga — se inclui React, a stack é React; senão, JavaScript puro) e sobrescreve o método `label()` para exibir essa stack junto ao cargo.

### Closure e callback

- **Closure:** `createCounter()` retorna uma função que mantém um contador de quantas análises foram realizadas na sessão, preservado entre chamadas sem recorrer a variável global.
- **Callback:** `jobAnalyze` recebe uma função como parâmetro e a executa assim que a análise termina — é esse callback que dispara a renderização da melhor vaga, da recomendação e da lista completa de resultados.

### Arquitetura cliente-servidor (fetch + 3 estados)

O catálogo de vagas é carregado com `fetch` a partir de um arquivo JSON local, simulando a arquitetura cliente-servidor: a aplicação (cliente) solicita os dados, e a "resposta" é tratada em três estados possíveis:

- **Carregando** — mensagem exibida enquanto a Promise do `fetch` está pendente
- **Vazio** — mensagem exibida se o catálogo retornar sem nenhuma vaga
- **Erro** — `try/catch` captura falhas de rede ou um `response.ok` negativo, exibindo uma mensagem clara e acessível (`role="alert"`)

### Persistência

O perfil preenchido é salvo no `localStorage` a cada envio do formulário (`JSON.stringify`) e recuperado automaticamente ao recarregar a página (`JSON.parse`), pré-preenchendo os campos. O `null` da primeira visita é tratado explicitamente. Nenhum dado sensível é armazenado.

## Acessibilidade e SEO

- `title` descritivo e `meta description` no `<head>`
- Logo com `alt` informativo
- Mensagens de erro de validação com `role="alert"`
- Seção de resultados com `aria-live="polite"`, para leitores de tela anunciarem mudanças de conteúdo automaticamente
- Testado no Lighthouse: **100/100/100/100** em Performance, Acessibilidade, Boas Práticas e SEO

## Quadro Kanban

O planejamento e acompanhamento das tarefas está disponível em:
[LINK_DO_TRELLO](https://trello.com/invite/b/6ab013d99688a37afa95f92c/ATTI13569933eb119f19c139a7aa782be558E1C6D2DF/projeto-avaliativo-modulo-1)

## Vídeo de apresentação

[LINK_DO_VIDEO] (https://drive.google.com/drive/folders/1yb_pljfOrdKZdj2_PKCa7_hOsdKNSabH?usp=sharing)

## Melhorias futuras

- Filtro e ordenação de vagas (por modalidade, salário ou compatibilidade).
- Tema claro/escuro salvo no `localStorage`.
- Guardar o salário como número para permitir ordenação.
- Permitir cadastrar novas vagas.
- Sugerir cursos e materiais para cada habilidade que falta.
- Testes automatizados para o motor de compatibilidade.
- Deploy no GitHub Pages
- Uso de uma Browser API nativa (ex: Geolocation)

## Autoria e uso de IA

Desenvolvido por Andressa Chaves (https://github.com/Andressa-Chaves) como Projeto Avaliativo do Módulo 01 — Front-End React, Turma 03. A IA foi usada como apoio pontual durante o desenvolvimento (revisão de lógica, explicação de conceitos, sugestões de estrutura), com cada trecho testado, validado e explicado com segurança antes de ser incorporado ao projeto.
