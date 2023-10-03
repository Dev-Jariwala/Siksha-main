// Create a custom hook for authentication
import { useState, useEffect } from "react";
import axios from "axios";

export const useAuthentication = () => {
  const [userAuth, setUserAuth] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const result = await axios.get(
          "http://localhost:8080/api/user/authenticate",
          { withCredentials: true }
        );
        setUserAuth(result.data.authenticated);
        console.log(result.data.authenticated);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setUserAuth(false);
      }
    };

    checkAuthentication();
  }, []);

  return { userAuth, setUserAuth };
};
