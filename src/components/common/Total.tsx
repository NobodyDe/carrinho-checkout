import formatValue from "../../utils/formartValue";

interface TotalProps {
  subtotal: number;
  desconto: number;
  frete?: number;
}

export default function Total({ subtotal, desconto }: TotalProps) {
  const total = subtotal - desconto;

  const items = [
    { label: "Subtotal", value: subtotal },
    { label: "Desconto", value: desconto },
    { label: "Frete", value: 0 },
    { label: "Total", value: total },
  ];

  return (
    <main className="w-full">
      <div className="flex flex-col gap-2">
        {items.map((i) => (
          <div
            className={
              i.label === "Total"
                ? "flex justify-between mt-2"
                : "flex justify-between "
            }
          >
            <span
              className={
                i.label === "Total"
                  ? "text-lg"
                  : "text-sm text-muted-foreground"
              }
            >
              {i.label}
            </span>
            <span className={i.label === "Total" ? "text-lg" : "text-sm "}>
              {formatValue(i.value)}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
