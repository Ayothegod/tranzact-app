import logo from "@/assets/tranzact.svg";

export default function Logo({ withText }: { withText?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <img src={logo} alt="tranzact-logo" className="h-6 w-6" />
      {withText && <p className="font-bold">Tranzact</p>}
    </div>
  );
}
