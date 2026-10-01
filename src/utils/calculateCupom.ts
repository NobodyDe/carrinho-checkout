import { CUPONS } from "../constants/dados";
import type { Cupom } from "../types/props";
import formatValue from "./formartValue";

type ValidationResult =
  | { ok: true; cupom: Cupom }
  | { ok: false; erro: string };

export function calcularDesconto(cupom: Cupom, total: number): number {
  const desconto =
    cupom.tipo === "percentual"
      ? Math.round((total * cupom.percentual) / 100)
      : cupom.valorCentavos;

  return Math.min(desconto, total); // nunca deixa o total negativo
}

export function validateCupom(
  codigoDigitado: string,
  subtotal: number,
): ValidationResult {
  const codigo = codigoDigitado.trim().toUpperCase();
  const cupom = CUPONS.find((c) => c.codigo === codigo);

  if (!cupom) return { ok: false, erro: "Cupom inexistente" };
  if (subtotal < cupom.minimoCentavos)
    return {
      ok: false,
      erro: `Compra mínima de ${formatValue(cupom.minimoCentavos)}.`,
    };

  return { ok: true, cupom };
}
