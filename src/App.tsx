import Catalog from "./components/Catalog";
import Header from "./components/Header";
import "@fontsource-variable/jetbrains-mono/wght.css";

function App() {
  return (
    <main className="flex flex-col min-h-screen bg-background text-slate-100 px-10 gap-6">
      <Catalog />
    </main>
  );
}

export default App;
