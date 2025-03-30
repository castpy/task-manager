import { useUserContext } from "@/context/user.context";
import { getCookie, setCookie } from "@/utils/cookie";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export const useApp = () => {
  const router = useRouter();
  const { setUser } = useUserContext();
  const token = getCookie(`${process.env.NEXT_PUBLIC_COOKIE_NAME}`);

  const logOut = () => {
    router.push(`/`);
    setCookie("", -1);
    setUser(null);
    signOut();
  };

  return {
    logOut,
    token,
  };
};
