import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { CarCatalog } from "@/components/catalog/car-catalog";
import { Benefits } from "@/components/benefits";
import { Contacts } from "@/components/contacts";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Header />
      <Hero />
      <CarCatalog />
      <Benefits />
      <Contacts />
      <Footer />
    </main>
  );
}
