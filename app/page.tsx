import Hero from "./components/Hero";
import Slider from "./components/Slider";

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col px-2 md:px-10 min-w-full'>
      <Hero />
      <Slider />
    </main>
  );
}
