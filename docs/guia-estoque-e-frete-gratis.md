# Guia: aviso de estoque temporário e barra de frete grátis

Continuação do trabalho no carrinho de checkout. Arquivos envolvidos:

- `src/components/common/ProductInCart.tsx`
- `src/components/ShippingCar.tsx`
- `src/components/common/FreeShippingBar.tsx` (novo)

---

## 1. Mensagem de estoque que some depois de 2 segundos

Esse tipo de comportamento é **estado + efeito**. Hoje a mensagem depende só de
`product.Quantidade >= product.estoque`, que continua verdadeiro para sempre, por isso ela
nunca some. É preciso um valor que possa mudar com o tempo.

### Lógica em passos

1. **Um estado booleano** no `ProductInCart`, por exemplo `showLimit`, que controla se a
   mensagem aparece.
2. **Um `useEffect` que observa `product.Quantidade`.** Quando o valor muda e
   `Quantidade >= estoque` é verdadeiro, ele liga `showLimit` e agenda o desligamento com
   `setTimeout` de 2000 ms.
3. **A função de limpeza (`return () => clearTimeout(id)`) é obrigatória.** Sem ela:
   - o timer dispara depois de o componente ser removido do carrinho e tenta atualizar um
     estado que não existe mais;
   - cliques rápidos empilham timers e a mensagem some antes da hora.
   A limpeza cancela o timer anterior toda vez que o efeito roda de novo.
4. **O JSX passa a usar `showLimit`** no lugar da condição atual.

### Decisão de comportamento

- **Aparecer quando a quantidade *chega* ao estoque.** É o que o efeito acima faz. O botão
  "+" já está `disabled` nesse ponto, então o usuário vê a mensagem ao atingir o limite e
  depois ela some. Mantém o `disabled` como está.
- **Aparecer quando o usuário *tenta* passar do limite.** Um botão `disabled` não dispara
  `onClick`, então o botão precisa ficar clicável, e o clique no limite liga o `showLimit`.
  Costuma ser mais claro para o usuário, mas exige tirar o `disabled` e tratar o estilo
  visual à mão.

---

## 2. Barra de frete grátis

Nada disso precisa de estado. O total é derivado da lista do carrinho, e a cor, a largura e
a mensagem são derivadas do total. Recalcule tudo a cada renderização.

Os preços estão em **centavos** (`precoCentavos`), então o limite de R$ 200 é **`20000`**.

### Passo 1: total no `ShippingCar`

```tsx
const total = shoppingCart.reduce(
  (acc, p) => acc + p.precoCentavos * p.Quantidade,
  0,
);
```

Multiplique pela `Quantidade`, senão dois itens contam como um.

### Passo 2: componente `FreeShippingBar`

Recebe só o total e não conhece o carrinho:

```tsx
import formatValue from "../../utils/formartValue";

const FREE_SHIPPING_CENTS = 20000;

interface FreeShippingBarProps {
  total: number;
}

export default function FreeShippingBar({ total }: FreeShippingBarProps) {
  const reached = total >= FREE_SHIPPING_CENTS;
  const percent = Math.min((total / FREE_SHIPPING_CENTS) * 100, 100);
  const missing = FREE_SHIPPING_CENTS - total;
  const fillColor = reached ? "bg-green-500" : "bg-yellow-400";

  return (
    <div className="w-full flex flex-col gap-2">
      <p className="text-xs text-primary-foreground">
        {reached
          ? "Você ganhou frete grátis!"
          : `Faltam ${formatValue(missing)} para o frete grátis`}
      </p>
      <div className="h-2 w-full rounded-full bg-white overflow-hidden">
        <div
          className={`h-full ${fillColor} transition-all duration-300`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
```

### Passo 3: usar no `ShippingCar`

Coloque `<FreeShippingBar total={total} />` logo abaixo do `<header>` (ou acima do cupom).

### Como atende ao pedido

- **Branca sem nada:** o trilho é sempre `bg-white`. Com total 0 o preenchimento tem 0% de
  largura, então a barra aparece toda branca.
- **Amarela até 200:** preenchimento `bg-yellow-400`, crescendo com o total.
- **Verde ao passar de 200:** `reached` vira `true`, o preenchimento fica `bg-green-500` a
  100% e a mensagem muda.

### Cuidados

- **Não monte a classe por interpolação** (`` `bg-${color}-500` ``). O Tailwind só gera CSS
  para classes escritas por inteiro no código. Por isso a cor é escolhida entre duas strings
  completas.
- **A largura vai no `style`**, porque é um valor calculado em tempo de execução.
- **`Math.min(..., 100)`** evita a barra passar do trilho quando o total ultrapassa 200.
- **A constante do limite** fica no topo do arquivo com nome claro. Se a regra mudar, altere
  em um lugar só.
- Opcional, para acessibilidade: `role="progressbar"` e `aria-valuenow` no trilho.

---

## Pendências levantadas antes (revisar amanhã)

- `NewProductProps` está declarada em mais de um lugar. Deixar uma só (de preferência em
  `types/props.ts`) e importar onde precisar, para o hook não depender de um componente.
- `useCartActions`: o `"remove"` do `changeQuantity` subtrai sem piso. Proteger para não
  passar de 1 se quiser a regra na ação, não só na tela.
- `Catalog.tsx` precisa passar `shoppingCart` para o `Cards` (a prop usada no `isInCart`).
- `Cards.tsx`: trocar `hasAdd` por um booleano `isInCart` e considerar `disabled={isInCart}`.
- `ShippingCar.tsx`: remover `setCartOpen` e `useState` não usados, e alinhar o tipo de
  `onChange` com o do `ProductInCart`.
- `ProductInCart.tsx`: trocar o `<main>` repetido por `<div>`/`<li>`, `<a>` sem `href` por
  `<span>`/`<button>`, estilo `disabled:` no botão "+", e mostrar o total do item
  (`precoCentavos * Quantidade`) no valor em destaque.
