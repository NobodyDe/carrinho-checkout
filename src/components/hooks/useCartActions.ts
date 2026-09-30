import type { Dispatch, SetStateAction } from "react";
import type { NewProductProps } from "../Catalog";
import type { Produto } from "../../types/props";

type SetItems = Dispatch<SetStateAction<NewProductProps[]>>;
export interface ChangeProps {
  id: string;
  type: "add" | "remove";
}
export interface NewProductProps extends Produto {
  Quantidade: number;
}

export function useCartActions(setItems: SetItems) {
  const handleNewShippingCarList = (item: Produto) => {
    const newProduct: NewProductProps = { ...item, Quantidade: 1 };
    setItems((prev) =>
      prev.some((p) => p.id === newProduct.id) ? prev : [...prev, newProduct],
    );
  };

  const removeProduct = (id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const changeQuantity = ({ id, type }: ChangeProps) => {
    setItems((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        if (type === "remove") return { ...p, Quantidade: p.Quantidade - 1 };
        if (p.Quantidade >= p.estoque) return p;
        return { ...p, Quantidade: p.Quantidade + 1 };
      }),
    );
  };

  return { removeProduct, changeQuantity, handleNewShippingCarList };
}
