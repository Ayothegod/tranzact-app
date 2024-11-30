import { Button } from "../ui/button";

export default function CallToAction() {
  return (
    <div className="bg-blue-400 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="w-full md:w-1/2 flex-shrink-0 flex flex-col gap-8">
          <h1 className="text-5xl tracking-wide font-bold text-white">
            <span className="text-neutral-300">Saving &</span> Investing are
            made <span className="text-green-600">simple.</span>
          </h1>

          <p className="text-neutral-200 text-justify">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem
            molestias ut quasi delectus esse dicta aspernatur magnam nemo,
            consequatur, facere fuga quidem ullam sed! Accusamus!
          </p>

          <div className="mt-4">
            <p className="mb-2 text-white font-medium">Get started now:</p>
            <div className="flex items-center gap-2">
              <Button size={"lg"} className="w-max">
                Watch Demo
              </Button>
              <Button size={"lg"} className="w-max">
                Join Tranzact
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
