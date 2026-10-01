import { useState, type Dispatch, type SetStateAction } from "react";
import { CUPONS } from "../../constants/dados";
import { validateCupom } from "../../utils/calculateCupom";
import type { Cupom } from "../../types/props";
import describeCupom from "../../utils/describeCupom";

interface CupomProps {
  total: number;
  onApply: (cupom: Cupom | null) => Dispatch<SetStateAction<Cupom | null>>;
  cupomAtivo: Cupom | null;
}

export default function CupomField({ total, onApply }: CupomProps) {
  const [cupom, setCupom] = useState<string>("");
  const [cupomAtivo, setCupomAtivo] = useState<Cupom | null>(null);
  const [err, setErr] = useState<string>("");
  const [displayCupom, setDisplayCupom] = useState<string>("");
  function handleCupom() {
    if (!cupom.trim()) return setErr("Digite um cupom");
    if (cupomAtivo)
      return setErr("Já existe um cupom aplicado. Remova-o antes.");
    const result = validateCupom(cupom, total);
    if (!result.ok) return setErr(result.erro);
    setErr("");
    setCupomAtivo(result.cupom);
    onApply(result.cupom);
  }

  function handleRemoverCupom() {
    setCupomAtivo(null);
    setCupom("");
    setErr("");
    onApply(null);
  }

  return (
    <div className="border-t border-border w-full flex flex-col ">
      <p className="text-muted text-sm py-4">CUPOM DE DESCONTO</p>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="PERIF10"
            value={cupom}
            onChange={(e) => {
              (setCupom(e.target.value), setErr(""));
            }}
            className={`bg-accent border border-border ${err ? "border-red-400" : "border-border"} rounded-lg w-full outline-border p-4 focus-border`}
          />
          <button
            onClick={handleCupom}
            className={`cursor-pointer p-4 border border-border bg-border rounded-lg active:scale-95 transition-transform`}
          >
            Aplicar
          </button>
        </div>
        {cupomAtivo && (
          <div className="w-full border border-border p-2 px-4 rounded-lg flex justify-between items-center">
            <span className="text-muted text-[12px]">
              {describeCupom(cupomAtivo)}
            </span>

            <a
              onClick={() => handleRemoverCupom()}
              className="text-xs underline cursor-pointer text-muted"
            >
              Remover cupom
            </a>
          </div>
        )}
      </div>
      {err && <span className="text-xs text-red-400">{err}</span>}
    </div>
  );
}
