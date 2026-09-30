import { ShoppingCart } from "lucide-react";
import type { NewProductProps } from "./Catalog";
import type { Dispatch, SetStateAction } from "react";

interface HeaderProps {
  cart: NewProductProps[];
  setCartOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Header({ cart, setCartOpen }: HeaderProps) {
  return (
    <section className="flex w-full py-8 border-b border-border">
      <div className="flex h-full w-full justify-between">
        <div className="flex items-baseline">
          <h1 className="font-bold text-2xl pr-4">periférico</h1>
          <p className="font-light text-primary-foreground">
            teclados - mouses - áudio
          </p>
        </div>
        <div className="flex gap-4 items-center">
          {["Catálogo", "Carrinho"].map((option) => (
            <h1 key={option.length} className="">
              {option}
            </h1>
          ))}
          <button
            onClick={() => setCartOpen((prev) => !prev)}
            className="cursor-pointer flex border border-border p-2 px-4 rounded-full items-center justify-center gap-3"
          >
            <ShoppingCart size={18} />
            {cart.length}
          </button>
        </div>
      </div>
    </section>
  );
}
