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
    <div className="w-full flex flex-col gap-2 bg-foreground p-4 rounded-lg border border-border">
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
