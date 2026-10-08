import Link from "next/link";
import { Header } from "@/components/sections/Header";

export default function NotFound() {
  return (
    <>
      <Header base="/" alwaysSolid />
      <main id="conteudo" className="container-x flex min-h-[80svh] flex-col items-start justify-center pt-[var(--header-h)]">
        <h1 className="type-h2">Esta página não existe.</h1>
        <p className="type-lead mt-4 max-w-[44ch]">O endereço pode ter mudado ou a peça saiu do catálogo.</p>
        <Link href="/#produtos" className="btn btn-solid mt-8">
          Ver o catálogo
        </Link>
      </main>
    </>
  );
}
