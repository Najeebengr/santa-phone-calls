'use client';
import Footer from "./components/Footer";
import FormWrapper from "./components/FormWrapper";
import Header from "./components/Header";

export default function Home() {
  return (
    <section className="bg-[url('/santa.jpeg')] bg-cover bg-center bg-no-repeat h-screen w-full ">
      <Header />
      {/* <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black-400 to-transparent"></div> */}
    <main>
      <FormWrapper />
      <Footer />
    </main>
    </section>
  );
}
