import { useUserContext } from "@/context/user.context";
import { getCookie, setCookie } from "@/utils/cookie";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useTaskContext } from "@/context/task.context";

export const useApp = () => {
  const router = useRouter();
  const { setUser } = useUserContext();
  const { setTasks } = useTaskContext();
  const token = getCookie(`${process.env.NEXT_PUBLIC_COOKIE_NAME}`);

  const logOut = () => {
    router.push(`/`);
    setCookie("", -1);
    setTasks(null);
    setUser(null);
    signOut();
  };

  return {
    logOut,
    token,
  };
};
