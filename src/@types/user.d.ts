interface Infos {
  name: string;
  avatar: string | null;
  document: string | null;
  document_type: "cpf" | "cnpj" | null;
}

export interface User {
  id: string;
  email: string;
  infos: Infos[];
}
