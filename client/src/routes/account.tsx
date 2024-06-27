import Cookies from "js-cookie";
import { json, redirect } from "react-router-dom";

export async function Loader() {
  const session = Cookies.get("session");
  if (!session) {
    return redirect("/login");
  }
  return json(null);
}

export default function Account() {
  return <div>Account</div>;
}
