import { useState } from "react";
import { UseAuthForm } from "./types/use.app.template";

export const useAppTemplate = () => {
  const [form, setForm] = useState<UseAuthForm>({
    email: "",
    password: "",
  });

  return { form, setForm };
};
