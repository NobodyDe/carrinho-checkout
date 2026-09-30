# Passando subtotal, cupom e desconto para o `Total`

Arquivos envolvidos: `src/components/common/Total.tsx`, `src/utils/calculateCupom.ts`, `src/components/common/CupomField.tsx` e o componente pai (quem tem o `shoppingCart`).

## 1. O que o `calculateCupom` devolve e o que falta

Ele devolve `{ ok, totalFinal, cupom }`, mas o `Total` precisa de quatro números: subtotal, desconto, frete e total. O **desconto** não sai pronto, mas é só `subtotal - totalFinal`. O melhor é não guardar esses dois valores derivados (veja abaixo).

## 2. Guarde só o que não dá para calcular

O estado do pai (quem tem o `shoppingCart`) guarda apenas:

- os itens do carrinho (já existe)
- o `cupomAtivo: Cupom | null`

Todo o resto é **derivado** a cada render:

```tsx
const subtotal = itens.reduce((soma, i) => soma + i.precoCentavos * i.Quantidade, 0);
const desconto = cupomAtivo ? calcularDesconto(cupomAtivo, subtotal) : 0;
const frete = calcularFrete(subtotal);
```

**Por que não guardar o `totalFinal` que o `calculateCupom` devolve?** Porque ele foi calculado com o subtotal **daquele momento**. Se o usuário depois aumentar a quantidade de um item, o estado guardado fica desatualizado e o total mostra um valor errado. Derivando no render, o desconto acompanha o carrinho sozinho.

Para isso funcionar, exporte o `calcularDesconto` (hoje ele é privado no arquivo): `export function calcularDesconto`. Assim o pai o reaproveita.

## 3. O fluxo dos dados

```
CupomField ──onApply(cupom)──▶ Pai (itens + cupomAtivo)
                                   │ deriva subtotal, desconto, frete
                                   ▼
                          <Total subtotal desconto frete />
```

No `CupomField`, depois do `calculateCupom` dar `ok`, você envia o **cupom** (`onApply(resultado.cupom)`), e não o `totalFinal`. O `totalFinal` que a função devolve vira informação que o componente nem precisa usar.

## 4. O `Total` recebe por props e calcula o total

```tsx
interface TotalProps {
  subtotal: number;
  desconto: number;
  frete: number;
}

export default function Total({ subtotal, desconto, frete }: TotalProps) {
  const total = subtotal - desconto + frete;

  const values = [
    { label: "Subtotal", value: subtotal },
    { label: "Desconto", value: -desconto },
    { label: "Frete", value: frete },
    { label: "Total", value: total },
  ];
  // ...o seu map continua igual
}
```

Duas mudanças no arquivo:

- **Mova o array `values` para dentro da função.** Hoje ele está fora, então é criado uma vez com `0` e nunca vê as props.
- **O `total` nasce dentro do `Total`**, somando as três props, para não existir em dois lugares.

O `Total` não recebe o cupom em si, só números. Ele não precisa saber qual cupom está ativo, apenas quanto custa. Se quiser mostrar o nome do cupom no rótulo (`Desconto (MENOS50)`), aí passe também `cupomAtivo`.

## 5. Dois detalhes do código atual

- **`key` ausente no `map`:** falta `key={v.label}` na `div` de dentro do `map`.
- **Comparar `v.label === "Total"`** funciona agora, porque a caixa bate. Mas ele repete em três lugares. Para simplificar, use um campo `destaque: true` no item e leia `v.destaque` uma vez só.

## Por que essa arquitetura

O estado mínimo vive no pai, e tudo que dá para calcular a partir dele é calculado na hora. Com isso, adicionar item, remover item, trocar de cupom ou remover o cupom sempre deixam o total certo, sem precisar "lembrar" de atualizar nada.
