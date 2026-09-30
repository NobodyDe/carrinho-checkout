import type { Cupom } from "../types/props";
import formatValue from "./formartValue";

export default function describeCupom(cupom: Cupom): string {
  const desconto =
    cupom.tipo === "percentual"
      ? `${cupom.percentual}%`
      : formatValue(cupom.valorCentavos);

  return `${cupom.codigo} — ${desconto} · mínimo ${formatValue(cupom.minimoCentavos)}`;
}
