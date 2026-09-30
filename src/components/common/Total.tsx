import formatValue from "../../utils/formartValue";

const values = [
  { label: "Subtotal", value: 0 },
  { label: "Desconto", value: 0 },
  { label: "Frete", value: 0 },
  { label: "Total", value: 0 },
];

export default function Total() {
  return (
    <main className="w-full">
      <div className="flex flex-col gap-2">
        {values.map((v) => (
          <div
            className={
              v.label === "Total"
                ? "flex justify-between mt-2"
                : "flex justify-between "
            }
          >
            <span
              className={
                v.label === "Total"
                  ? "text-lg"
                  : "text-sm text-muted-foreground"
              }
            >
              {v.label}
            </span>
            <span className={v.label === "Total" ? "text-lg" : "text-sm "}>
              {formatValue(v.value)}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
