import { useEffect } from "react";
import { useProfile } from "../context/userContext";
import { profile } from "../services/api";

export const useStartProfile = () => {
  const { setUser, setLoading } = useProfile();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);

      try {
        const res = await profile();
        setUser(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [setUser, setLoading]);
};