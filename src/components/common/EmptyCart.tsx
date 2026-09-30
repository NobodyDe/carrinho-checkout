import { ShoppingCart } from "lucide-react";

export default function EmptyCart() {
  return (
    <main>
      <div className="flex flex-col gap-3 justify-center items-center text-muted px-10 py-14 border border-dotted border-border rounded-lg">
        <ShoppingCart />
        <p className="text-md">Carrinho Vazio</p>
        <p className="text-xs text-muted-foreground">
          Adicione um periférico do catálogo para começar
        </p>
      </div>
    </main>
  );
}
