# Projeto 01 — Carrinho de checkout

**Foco:** `useState`, props de pai para filho, callback de filho para pai, lifting state up e estado derivado.

Se você sente dificuldade com o básico do React, **comece por aqui**. Este projeto é inteiramente sobre isso.

---

## O problema real

Todo e-commerce tem a mesma dor. O carrinho precisa ser visto por vários componentes ao mesmo tempo:

- a **listagem de produtos** tem o botão "adicionar";
- a **linha do carrinho** tem o input de quantidade e o botão remover;
- o **resumo do pedido** mostra subtotal, desconto, frete e total;
- o **campo de cupom** muda o valor de tudo.

Se cada um desses componentes guardar seu próprio estado, os números divergem: você muda a quantidade e o total continua velho. A solução é sempre a mesma — **um único dono do estado, e filhos que só desenham e avisam**.

---

## O que você vai treinar

| Conceito                                    | Onde aparece                                            |
| ------------------------------------------- | ------------------------------------------------------- |
| `useState` com array e com objeto         | a lista de itens do carrinho                            |
| Imutabilidade (`map`, `filter`, spread) | toda alteração no carrinho                            |
| Passar prop de**pai para filho**      | `<ListaProdutos produtos={...} />`                    |
| Passar dado de**filho para pai**      | `onAdicionar`, `onRemover`, `onAlterarQuantidade` |
| Lifting state up                            | estado no pai, usado por 4 filhos                       |
| **Estado derivado**                   | total é calculado, não é`useState`                 |
| Renderização condicional                  | carrinho vazio, erro de cupom                           |
| Union discriminada no TypeScript            | cupom percentual vs. cupom fixo                         |

---

## Como criar o projeto

```bash
npm create vite@latest carrinho-checkout -- --template react-ts
```

```bash
cd carrinho-checkout && npm install && npm run dev
```

Não se preocupe com CSS. Use `<ul>`, `<li>`, `<button>` e `<input>` sem estilo nenhum.

---

## Estrutura de arquivos sugerida

```
src/
├── tipos.ts                     tipos do domínio
├── dados.ts                     catálogo de produtos e cupons (dados fixos)
├── carrinho.ts                  funções puras de cálculo (sem React)
├── componentes/
│   ├── ListaProdutos.tsx
│   ├── ItemCarrinhoLinha.tsx
│   ├── AplicarCupom.tsx
│   └── ResumoPedido.tsx
└── Carrinho.tsx                 o componente PAI, dono do estado
```

---

## Tipos para começar

Crie `src/tipos.ts` com isto. Repare no tipo `Cupom`: ele é uma **union discriminada** — o campo `tipo` decide quais outros campos existem, e o TypeScript vai te obrigar a tratar os dois casos.

```ts
export type Produto = {
  id: string
  nome: string
  precoCentavos: number
  estoque: number
}

export type ItemCarrinho = {
  produto: Produto
  quantidade: number
}

export type Cupom =
  | { codigo: string; tipo: 'percentual'; percentual: number; minimoCentavos: number }
  | { codigo: string; tipo: 'fixo'; valorCentavos: number; minimoCentavos: number }

export type ResumoCarrinho = {
  subtotalCentavos: number
  descontoCentavos: number
  freteCentavos: number
  totalCentavos: number
}
```

> **Por que centavos?** Porque `0.1 + 0.2 !== 0.3` em ponto flutuante. Guarde dinheiro sempre como número inteiro de centavos e converta só na hora de exibir. Isso é o que se faz em sistema de pagamento de verdade.

Dados fixos para `src/dados.ts` (faz o papel de um `GET /produtos`):

```ts
export const CATALOGO: Produto[] = [
  { id: 'p1', nome: 'Teclado mecânico', precoCentavos: 34900, estoque: 5 },
  { id: 'p2', nome: 'Mouse sem fio',    precoCentavos: 12990, estoque: 3 },
  { id: 'p3', nome: 'Monitor 27"',      precoCentavos: 149900, estoque: 2 },
  { id: 'p4', nome: 'Cabo HDMI',        precoCentavos: 3990,  estoque: 10 },
]

export const CUPONS: Cupom[] = [
  { codigo: 'BEMVINDO10', tipo: 'percentual', percentual: 10, minimoCentavos: 0 },
  { codigo: 'MENOS50',    tipo: 'fixo', valorCentavos: 5000,  minimoCentavos: 20000 },
  { codigo: 'METADE',     tipo: 'percentual', percentual: 50, minimoCentavos: 100000 },
]
```

---

## Funcionalidades

### 1. Listar os produtos do catálogo

Mostre nome, preço formatado e um botão **Adicionar**. O botão fica desabilitado quando o estoque é zero.

### 2. Adicionar produto ao carrinho

Clicar em Adicionar coloca o produto no carrinho com quantidade 1. Clicar de novo no mesmo produto **soma** à quantidade que já existe — não cria uma segunda linha.

### 3. Alterar a quantidade de um item

Cada linha do carrinho tem um `<input type="number">` com a quantidade atual. Mudar o valor atualiza o carrinho na hora.

### 4. Remover um item

Cada linha tem um botão **Remover**. Colocar a quantidade em zero também remove.

### 5. Aplicar cupom de desconto

Um campo de texto + botão **Aplicar**. O código digitado é procurado na lista de cupons (ignorando maiúsculas/minúsculas e espaços). Se não existir, mostre "Cupom inválido". Se existir mas o pedido não atingir o valor mínimo, mostre a mensagem com o valor exigido. Se estiver tudo certo, o desconto entra no resumo e aparece um botão para remover o cupom.

### 6. Resumo do pedido

Mostre, sempre atualizado: **subtotal**, **desconto**, **frete** e **total**.

### 7. Estado vazio

Quando não há nenhum item, mostre "Carrinho vazio" no lugar da lista.

---

## Regras de negócio

- A quantidade de um item **nunca passa do estoque** do produto. Se pedir mais, trave no estoque.
- Quantidade menor ou igual a zero **remove** o item.
- Desconto de cupom **percentual**: `Math.round(subtotal * percentual / 100)`.
- O cupom só vale se `subtotal >= cupom.minimoCentavos`.
- O desconto **nunca** pode ser maior que o subtotal.
- Frete: **R$ 19,90**, grátis quando `(subtotal − desconto) >= R$ 200,00`, e **R$ 0,00** com o carrinho vazio.
- Total = `subtotal − desconto + frete`.

Repare na ordem: **o frete é decidido depois do desconto**. Um pedido de R$ 239,40 com um cupom de R$ 50 cai para R$ 189,40 e volta a pagar frete. Esse tipo de detalhe é exatamente o que gera bug em produção.

---

## Passo a passo sugerido

**1. Escreva primeiro as funções puras, sem React nenhum.**

Em `src/carrinho.ts`, quatro funções que recebem dados e devolvem dados:

```ts
adicionarItem(itens, produto, quantidade)     → ItemCarrinho[]
alterarQuantidade(itens, produtoId, nova)     → ItemCarrinho[]
removerItem(itens, produtoId)                 → ItemCarrinho[]
calcularResumo(itens, cupom)                  → ResumoCarrinho
```

Todas devolvem **um array novo**, nunca alteram o array recebido. Teste no console antes de ligar na tela — é muito mais rápido depurar aqui.

**2. Escreva os filhos.**

Cada um recebe o que precisa por prop e avisa o pai por callback. Exemplo do contrato:

```ts
type ListaProdutosProps = {
  produtos: Produto[]
  onAdicionar: (produto: Produto) => void
}
```

O filho **não sabe** como o pai guarda o carrinho. Ele só diz "clicaram em adicionar este produto aqui". Esse desacoplamento é o coração do React.

**3. Escreva o pai.**

Em `Carrinho.tsx` você precisa de exatamente **três** `useState`:

```ts
const [itens, setItens] = useState<ItemCarrinho[]>([])
const [cupom, setCupom] = useState<Cupom | null>(null)
const [erroCupom, setErroCupom] = useState<string | null>(null)
```

E de **nenhum** `useState` para subtotal, desconto, frete ou total. Esses são calculados:

```ts
const resumo = calcularResumo(itens, cupom)
```

---

## Armadilhas (é aqui que o projeto ensina)

**Não guarde valor derivado em estado.**
Se você tem `itens` e `cupom`, o total é uma consequência deles. Criar um `useState` para o total significa ter que lembrar de atualizá-lo em todo lugar que mexe no carrinho — e alguém sempre esquece um. Esse é o bug número 1 de "mudei a quantidade e o total ficou velho".

**Não mute o array.**

```ts
itens.push(novo)      // ❌ a referência não muda, o React não re-renderiza
setItens(itens)

setItens([...itens, novo])   // ✅
```

O React decide se precisa redesenhar comparando referências com `===`. Mutar é o mesmo que não fazer nada.

**A `key` da lista é o id do produto, nunca o índice.**
Com índice, remover o primeiro item faz o React reaproveitar o input errado e a quantidade "pula" de linha.

**O `value` de um `<input type="number">` vem como string.**
Converta com `Number(e.target.value)`.

**Prefira a forma funcional do setState.**

```ts
setItens((atual) => adicionarItem(atual, produto))
```

Ela sempre recebe o valor mais recente. Com `setItens(adicionarItem(itens, produto))`, duas atualizações no mesmo ciclo leem o mesmo `itens` antigo e uma sobrescreve a outra.

---

## Checklist de conclusão

- [ ] Adicionar o mesmo produto 3x resulta em uma linha com quantidade 3
- [ ] A quantidade trava no estoque do produto
- [ ] Colocar quantidade 0 remove o item e volta a aparecer "Carrinho vazio"
- [ ] O total muda sozinho a cada alteração, sem nenhum `useState` para ele
- [ ] Cupom inexistente mostra erro e não aplica desconto
- [ ] Cupom abaixo do mínimo mostra a mensagem com o valor exigido
- [ ] Um pedido de R$ 239,40 com o cupom `MENOS50` **volta a pagar frete**
- [ ] Remover o cupom devolve o total cheio
- [ ] Nenhuma função de `carrinho.ts` altera o array que recebeu

---

## Desafios extras

1. Salvar o carrinho no `localStorage` e recarregar ao abrir a página. Use o *lazy initializer*: `useState(() => carregarDoStorage())` — a função roda só na primeira renderização.
2. Permitir vários cupons acumulados, mantendo todas as regras acima.
3. Trocar os três `useState` do pai por um único `useReducer` e comparar qual ficou mais legível. É exatamente o assunto do projeto 05.
