"use client";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { User } from "@/@types/user";

interface UserContextProps {
  user: User | null | undefined;
  setUser: (user: User | null) => void;
  loadingUserContext: boolean;
  setLoadingUserContext: (loading: boolean) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [loadingUserContext, setLoadingUserContext] = useState(true);
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
    setLoadingUserContext(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else if (user === null) {
      localStorage.removeItem("user");
    }
    setLoadingUserContext(false);
  }, [user]);

  return (
    <UserContext.Provider
      value={{ user, setUser, loadingUserContext, setLoadingUserContext }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export { UserContext, UserProvider, useUserContext };
