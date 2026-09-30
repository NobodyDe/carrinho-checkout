import { Trash } from "lucide-react";
import type { NewProductProps } from "../Catalog";
import formatValue from "../../utils/formartValue";
import type { ChangeProps } from "../hooks/useCartActions";

interface PruductInCartProps {
  product: NewProductProps;
  onRemove: (id: string) => void;
  onChange: ({ id, type }: ChangeProps) => void;
}

export default function ProductInCart({
  product,
  onRemove,
  onChange,
}: PruductInCartProps) {
  return (
    <main className="w-full flex flex-col gap-2">
      <div className="flex w-full gap-2 border-b border-border pb-4">
        <div className="bg-card-foreground w-16 h-16 rounded-lg shrink-0">
          <img
            src={product.imgUrl}
            className="max-w-full w-full h-full object-contain rounded-lg"
          />
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex justify-between ">
            <p className="font-bold">{product.nome}</p>
            <span className="font-bold">
              {formatValue(product.precoCentavos)}
            </span>
          </div>
          <div className="flex justify-between ">
            <span className="text-xs text-primary-foreground">
              {formatValue(product.precoCentavos)} / un.
            </span>
            <span className="text-[10px] text-primary-foreground">
              {`${product.Quantidade} x ${formatValue(product.precoCentavos)}`}
            </span>
          </div>
          <div className="flex items-center mt-2">
            {product.Quantidade <= 1 ? (
              <button
                onClick={() => onRemove(product.id)}
                className="bg-accent border border-border h-12 w-12 p-2 px-4 rounded-l-lg cursor-pointer"
              >
                <Trash size={16} />
              </button>
            ) : (
              <button
                onClick={() => onChange({ id: product.id, type: "remove" })}
                className="bg-accent border border-border p-2 px-4 h-12 w-12 rounded-l-lg cursor-pointer"
              >
                -
              </button>
            )}

            <a className="flex items-center justify-center bg-accent border border-border p-2 px-4 h-12 w-12">
              {product.Quantidade}
            </a>
            <button
              onClick={() => onChange({ id: product.id, type: "add" })}
              disabled={product.Quantidade >= product.estoque}
              className="bg-accent border border-border p-2 px-4 h-12 w-12 rounded-r-lg cursor-pointer"
            >
              +
            </button>
            <a
              onClick={() => onRemove(product.id)}
              className="text-xs underline cursor-pointer text-primary-foreground"
            >
              Remover
            </a>
          </div>
          {product.Quantidade >= product.estoque && (
            <span className="text-xs text-red-400">
              Estoque maximo atingido
            </span>
          )}
        </div>
      </div>
    </main>
  );
}
