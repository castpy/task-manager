import { signOut } from "next-auth/react";
import { setCookie } from "@/utils/cookie";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/user.context";
import { useTaskContext } from "@/context/task.context";

export const useApp = () => {
  const router = useRouter();
  const { setUser } = useUserContext();
  const { setTasks } = useTaskContext();

  const logOut = () => {
    signOut();
    setCookie("", -1);
    setTasks(null);
    setUser(null);
    router.push(`/`);
  };

  return {
    logOut,
  };
};
