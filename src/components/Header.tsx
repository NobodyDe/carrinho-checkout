export default function Header() {
  return (
    <section className="flex w-full py-8 border-b border-sidebar-border/10">
      <div className="flex h-full w-full justify-between">
        <div className="flex items-baseline">
          <h1 className="font-bold text-2xl pr-4">periférico</h1>
          <p className="font-light text-primary-foreground">
            teclados - mouses - áudio
          </p>
        </div>
        <div className="flex gap-4 items-center">
          {["Catálogo", "Carrinho"].map((option) => (
            <h1 className="">{option}</h1>
          ))}
        </div>
      </div>
    </section>
  );
}
