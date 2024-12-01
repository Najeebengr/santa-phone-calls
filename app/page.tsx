"use client";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePageWrapper from "./components/HomePageWrapper";

export default function Home() {
  return (
    <section className="relative bg-[url('/santa.jpeg')] bg-cover bg-center bg-no-repeat h-full md:h-screen w-full">
      <div className="absolute inset-0 bg-black/30" aria-hidden="true"></div>
      <div className="relative z-10">
        <Header />
        <main>
          <HomePageWrapper />
          <Footer />
        </main>
      </div>
    </section>
  );
}
