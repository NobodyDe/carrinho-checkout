import { CUPONS } from "../constants/dados";
import type { Cupom } from "../types/props";
import formatValue from "./formartValue";

type ResultCupom =
  | { ok: true; totalFinal: number; cupom: Cupom }
  | { ok: false; erro: string };

function calcularDesconto(cupom: Cupom, total: number): number {
  const desconto =
    cupom.tipo === "percentual"
      ? Math.round((total * cupom.percentual) / 100)
      : cupom.valorCentavos;

  return Math.min(desconto, total); // nunca deixa o total negativo
}

export function calculateCupom(
  cupomDigitado: string,
  totalCentavos: number,
): ResultCupom {
  const codigo = cupomDigitado.trim().toUpperCase();
  const cupom = CUPONS.find((c) => c.codigo === codigo);

  if (!cupom) return { ok: false, erro: "Cupom inexistente" };

  if (totalCentavos < cupom.minimoCentavos)
    return {
      ok: false,
      erro: `Compra mínima de ${formatValue(cupom.minimoCentavos)}.`,
    };

  return {
    ok: true,
    totalFinal: totalCentavos - calcularDesconto(cupom, totalCentavos),
    cupom,
  };
}
