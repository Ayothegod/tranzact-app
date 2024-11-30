import { footerLegal, footerLinks } from "@/lib/data";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { Copyright } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="bg-blue-500 text-white">
      <div className="max-w-5xl mx-auto py-10 flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/5 flex flex-col gap-4 flex-shrink-0">
          <Logo withText />
          <p className="text-sm w-full md:w-3/5">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit odio
            labore voluptates numquam at quae?
          </p>
        </div>

        <div className="w-full grid gap-y-8 grid-cols-1 md:grid-cols-3 ">
          <div>
            <h4 className="text-xl font-bold mb-4">Useful Links</h4>
            <ul className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <Link
                  to={link.url}
                  key={link.title}
                  className="text-neutral-300 hover:text-white text-sm"
                >
                  {link.title}
                </Link>
              ))}
            </ul>
          </div>

          <div className="">
            <h4 className="text-xl font-bold mb-4">Useful Links</h4>
            <ul className="flex flex-col gap-2">
              {footerLegal.map((link) => (
                <Link
                  to={link.url}
                  key={link.title}
                  className="text-neutral-300 hover:text-white text-sm"
                >
                  {link.title}
                </Link>
              ))}
            </ul>
          </div>

          <div className="">
            <h4 className="text-xl font-bold mb-4">Now you're here</h4>
            <p className="text-sm">
              Ready to take control of your financial activities?
            </p>
            <Button className="mt-4" size={"lg"}>
              Get started
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto border-t  border-t-white/30 flex items-center justify-center py-4 text-sm text-neutral-300 gap-1">
        <Copyright className="h-4 w-4" /> <span>Tranzact LLC {"" + year}.</span>
        <p>All right reserved.</p>
      </div>
    </div>
  );
}
