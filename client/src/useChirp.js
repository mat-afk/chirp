import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const useChirp = () => {
  const [chirps, setChirps] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getChirps = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/chirps`);
        const data = await response.json();
        setChirps(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getChirps();
  }, []);

  const createChirp = async ({ content, author }) => {
    try {
      const response = await fetch(`${API_URL}/api/chirps`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, author }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return { chirps, setChirps, loading, createChirp };
};

export default useChirp;
