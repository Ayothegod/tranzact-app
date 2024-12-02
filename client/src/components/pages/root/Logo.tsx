import logo from "@/assets/tranzact.svg";
import clsx from "clsx";

export default function Logo({
  withText,
  size,
}: {
  withText?: boolean;
  size: "sm" | "lg" | "base";
}) {
  return (
    <div className="flex items-center gap-2">
      <img
        src={logo}
        alt="tranzact-logo"
        className={clsx(
          "",
          size == "sm" && "h-5 w-5",
          size == "base" && "h-6 w-6",
          size == "lg" && "h-8 w-8"
        )}
      />
      {withText && <p className="font-bold">Tranzact</p>}
    </div>
  );
}
