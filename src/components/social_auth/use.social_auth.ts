import { toast } from "sonner";
import { setCookie } from "@/utils/cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getMe } from "@/services/get.me.service";
import { useUserContext } from "@/context/user.context";
import { signIn, signOut, useSession } from "next-auth/react";
import { verifyToken } from "@/services/post.auth.service";

export const useSocialAuth = () => {
  const router = useRouter();
  const { setUser } = useUserContext();
  const { data: session } = useSession();
  const [loadingHook, setLoadingHooks] = useState(false);

  const handleSignIn = async () => {
    try {
      setLoadingHooks(true);
      await signIn("google");
    } catch {
      toast.error("Erro ao fazer login com Google.");
    }
  };

  useEffect(() => {
    const verifyUserToken = async () => {
      if (session?.accessToken) {
        try {
          setLoadingHooks(true);
          const response = await verifyToken(session.accessToken);
          if (response.valid) {
            setCookie(session.accessToken, 1);
            const myData = await getMe(session.accessToken);
            setUser(myData);
            toast.success(`Seja bem-vindo!`);
            setTimeout(() => {
              router.push("/board");
            }, 3000);
          } else {
            toast.error("Token inválido.");
            signOut();
          }
        } catch {
          toast.error("Erro ao verificar token.");
        } finally {
          setLoadingHooks(false);
        }
      }
    };

    verifyUserToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return {
    signOut,
    loadingHook,
    useSession,
    handleSignIn,
  };
};
