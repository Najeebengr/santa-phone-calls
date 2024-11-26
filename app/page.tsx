'use client';
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePageWrapper from "./components/HomePageWrapper";

export default function Home() {
  return (
    <section className="bg-[url('/santa.jpeg')] bg-cover bg-center bg-no-repeat h-screen  w-full ">
      <Header />
      {/* <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black-400 to-transparent"></div> */}
    <main>
      <HomePageWrapper />
      <Footer />
      
    </main>
    </section>
  );
}
