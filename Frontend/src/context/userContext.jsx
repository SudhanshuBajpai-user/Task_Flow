import { createContext, useContext, useState } from "react";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <ProfileContext.Provider value={{user,setUser,loading,setLoading,}}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);