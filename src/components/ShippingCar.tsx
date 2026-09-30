import { useState } from "react";
import type { NewProductProps } from "./Catalog";
import EmptyCart from "./common/EmptyCart";
import ProductInCart from "./common/ProductInCart";

interface ShippingCarProps {
  shoppingCart: NewProductProps[];
  cartOpen: boolean;
  onRemove: (id: string) => void;
  onChange: () => void;
}

export default function ShippingCar({
  shoppingCart,
  cartOpen,
  setCartOpen,
  onRemove,
  onChange,
}: ShippingCarProps) {
  return (
    <aside
      className={`flex flex-col max-w-[25rem] gap-4 w-full bg-foreground rounded-lg p-5.5 border border-border ${cartOpen ? "flex" : "hidden"}`}
    >
      <header className="w-full flex justify-between items-center">
        <h3 className="font-extrabold">Carrinho</h3>
        <p className="text-xs text-primary-foreground">
          {shoppingCart.length} items
        </p>
      </header>
      <main className="flex flex-col justify-center items-center gap-4 ">
        {shoppingCart.length <= 0 ? (
          <EmptyCart />
        ) : (
          shoppingCart.map((product) => (
            <ProductInCart
              key={product.id}
              product={product}
              onRemove={onRemove}
              onChange={onChange}
            />
          ))
        )}
        <div className="border-t border-border w-full">
          <p className="text-muted text-sm py-4">CUPOM DE DESCONTO</p>
        </div>
      </main>
    </aside>
  );
}
