import { useEffect } from "react";
import { useAuth } from "src/hooks/use-auth";

export const useAuthUserInformation = () => {
  const { user } = useAuth();

  useEffect(() => {
  }, [user]);

  return { user };
};
