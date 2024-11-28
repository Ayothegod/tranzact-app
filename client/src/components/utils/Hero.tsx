import { Button } from "../ui/button";
import ScrollHero from "./ScrollHero";

export default function Hero() {
  return (
    <div className="h-hero body debug flex items-start justify-between text-white relative">
      <div className="w-full mt-24 md:w-1/3 flex flex-col gap-4 debug">
        <p className="text-sm">INVEST IN YOUR FUTURE</p>
        <h1 className="text-5xl tracking-wider font-bold">
          <span className="text-neutral-300">Saving &</span> Investing are made
          simple
        </h1>
      </div>

      <ScrollHero/>

      <div className="hidden lg:flex flex-col justify-center h-full w-1/3 debug gap-4">
        <div className="grid grid-cols-2 ">
          <div className="flex flex-col">
            <label htmlFor="active-users" className="text-neutral-300">
              Active users
            </label>
            <p className="font-extrabold text-3xl">200+</p>
          </div>

          <div className="flex flex-col">
            <label className="text-neutral-300" htmlFor="active-users">
              Site visitors
            </label>
            <p className="font-extrabold text-3xl">2000+</p>
          </div>
        </div>

        <p className="text-sm text-neutral-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
          deserunt eum unde. Rem voluptate earum corrupti porro maxime voluptas,
          iure distinctio iste minima minus nostrum dolores, nisi dolorem
          temporibus facilis.
        </p>

        <div className="mt-4">
          <p className="mb-2">Get started now:</p>
          <div className="grid grid-cols-2 gap-2">
            <Button size={"lg"} className="w-full">
              Watch Demo
            </Button>
            <Button size={"lg"} className="w-full">
              Join Tranzact
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
