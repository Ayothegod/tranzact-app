import { useAuthStore } from "@/lib/store/userStore";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

export default function Logout() {
  const { setIsUser }: any = useAuthStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  const logout = async () => {
    try {
      setIsUser();
      localStorage.removeItem("user-profile");
      Cookies.remove("session");
      navigate("/login");
      toast({
        description: `You have been logged out successfully`,
      });
      return null;
    } catch (error) {
      toast({
        variant: "destructive",
        description: `Invalid credentials, try again!`,
      });
      console.log(error);
      return null;
    }
  };

  return <Button onClick={logout}>Logout</Button>;
}
