import { useEffect, useState } from "react";
import { CATALOGO } from "../constants/dados";
import Cards from "./common/Cards";
import ShippingCar from "./ShippingCar";
import type { Produto } from "../types/props";
import Header from "./Header";
import { useCartActions, type NewProductProps } from "./hooks/useCartActions";

function CatalogHeader() {
  return (
    <section className="flex ">
      <div className="flex w-full justify-between items-baseline">
        <h1 className="text-3xl font-extrabold">Setup Completo</h1>
        <p className="font-light text-primary-foreground text-xs">
          {CATALOGO.length} produtos
        </p>
      </div>
    </section>
  );
}

export default function Catalog() {
  const [shoppingCart, setShippingCart] = useState<NewProductProps[]>([]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const { removeProduct, changeQuantity, handleNewShippingCarList } =
    useCartActions(setShippingCart);

  return (
    <main className="flex flex-col gap-4">
      <Header cart={shoppingCart} setCartOpen={setCartOpen} />
      <CatalogHeader />
      <div className="flex">
        <Cards
          shoppingCart={shoppingCart}
          catalogo={CATALOGO}
          sendProduct={handleNewShippingCarList}
          setCartOpen={setCartOpen}
        />
        <ShippingCar
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
          shoppingCart={shoppingCart}
          onRemove={removeProduct}
          onChange={changeQuantity}
        />
      </div>
    </main>
  );
}
