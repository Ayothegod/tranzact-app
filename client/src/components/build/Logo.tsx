import { Link } from "react-router-dom";

export default function Logo({
  logo,
  className,
  text,
}: {
  logo: any;
  className?: string;
  text?: boolean;
}) {
  const user = false;

  return (
    <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2">
      <img src={logo} alt="svg" className={`h-8 w-8 ${className}`} />
      {text && <p className="font-bold">Tranzact</p>}
    </Link>
  );
}
