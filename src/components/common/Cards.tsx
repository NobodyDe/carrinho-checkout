import type { Produto } from "../../types/props";
import { ShoppingCartPlus } from "lucide-react";
import formatValue from "../../utils/formartValue";
import type { Dispatch, SetStateAction } from "react";
import type { NewProductProps } from "../hooks/useCartActions";

interface CardsProps {
  catalogo: Produto[];
  sendProduct: (item: Produto) => void;
  setCartOpen: Dispatch<SetStateAction<boolean>>;
  shoppingCart: NewProductProps[];
}

export default function Cards({
  catalogo,
  sendProduct,
  setCartOpen,
  shoppingCart,
}: CardsProps) {
  const hasAdd = (item: Produto) => {
    if (shoppingCart.some((p) => p.id === item.id)) return "Adionado";
    return "Adicionar";
  };
  return (
    <div className="grid sm:grid-cols-3 grid-cols-1 gap-6 w-full max-w-6xl mx-auto ">
      {catalogo.map((item) => (
        <div
          key={item.id}
          className="flex flex-col bg-card max-w-xs p-4 rounded-lg gap-4 border border-border hover:bg-popover hover:border-secondary hover:scale-105 transition-transform"
        >
          <div className="flex bg-white justify-center items-center rounded-lg w-full h-[8.2rem]">
            <img
              src={item.imgUrl}
              className="max-w-full w-full h-full object-contain rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-white font-semibold">{item.nome}</h1>
            <p className="text-primary-foreground font-light text-sm">
              {item.descricao}
            </p>
          </div>
          <div className="lg:flex items-center justify-between w-full">
            <p className="font-extrabold text-2xl pr-4">
              {formatValue(item.precoCentavos)}
            </p>

            <div>
              <button
                onClick={() => {
                  (sendProduct(item), setCartOpen(true));
                }}
                className="w-full sm:w-auto cursor-pointer flex text-sm text-background gap-2 bg-white rounded-lg p-2 px-4 active:scale-95 transition-transform hover:bg-white/90"
              >
                <ShoppingCartPlus size={22} />
                {hasAdd(item)}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
