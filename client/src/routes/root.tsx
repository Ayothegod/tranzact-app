/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Link, useRouteError } from "react-router-dom";
import { useAuthStore } from "@/lib/store/userStore";
import Head from "@/components/pages/root/Head";
import RootHeader from "@/components/pages/root/RootHeader";
import Hero from "@/components/pages/root/Hero";
import Features from "@/components/pages/root/Features";
import HowItWorks from "@/components/pages/root/HowItWorks";
import Footer from "@/components/pages/root/Footer";
import CallToAction from "@/components/pages/root/CallToAction";
import Reviews from "@/components/pages/root/Reviews";
import Carousel from "@/components/pages/root/Carousel";

export default function Root() {
  return (
    <>
      <Head
        title="Tranzact - Homepage"
        description="This is the home page description"
      />

      <div className="bg-blue-500">
        <RootHeader />
        <Hero />
      </div>

      <Features />
      <HowItWorks />

      <Carousel />
      <Reviews />
      <CallToAction />
      <Footer />
    </>
  );
}

export async function Loader() {
  return null;
}

export function RootError() {
  const { isUser }: any = useAuthStore();
  const error = useRouteError();

  console.error(error);
  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-200">404</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-gray-500">We can't find this page.</p>

        <Link to={isUser ? "/dashboard" : "/"}>
          <Button className="mt-6">
            {isUser ? "Return to dashboard" : "Go Back Home"}
          </Button>
        </Link>
      </div>
    </div>
  );
}
