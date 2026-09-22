import { CATALOGO } from "../constants/dados";

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
  return (
    <main>
      <CatalogHeader />
      <div>
        <div className="bg-card max-w-2xs p-4 rounded-lg">
          <div className="bg-card-foreground rounded-lg">oi</div>
        </div>
      </div>
    </main>
  );
}
