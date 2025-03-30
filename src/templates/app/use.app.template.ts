import { useEffect, useState } from "react";
import * as EmailValidator from "email-validator";
import { UseAuthForm } from "./types/use.app.template";
import { authUser } from "@/services/post.auth.service";
import { setCookie } from "@/utils/cookie";
import { useUserContext } from "@/context/user.context";
import { getMe } from "@/services/get.me.service";
import { AxiosErrorWithResponse } from "@/@types/api.axios.error";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useAppTemplate = () => {
  const router = useRouter();
  const { setUser } = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [disableSubmit, setDisableSubmit] = useState<boolean>(true);
  const [form, setForm] = useState<UseAuthForm>({
    email: "",
    password: "",
  });

  const handleAuthUser = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setLoading(true);
      setDisableSubmit(true);
      const response = await authUser(form);
      if (response.token) {
        setCookie(response.token, 1);
        const myData = await getMe(response.token);
        setUser(myData);
        toast.success(`Seja bem-vindo!`);
        router.push("/board");
      }
    } catch (error) {
      const e = error as AxiosErrorWithResponse;
      toast.error(e.response.data.message);
    } finally {
      setLoading(false);
      setDisableSubmit(false);
    }
  };

  const formIsValid = (data: UseAuthForm): boolean => {
    const { email, password } = data;
    if (EmailValidator.validate(email) && password.length >= 6) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    setDisableSubmit(formIsValid(form));
  }, [form]);

  return { form, setForm, loading, disableSubmit, handleAuthUser };
};
