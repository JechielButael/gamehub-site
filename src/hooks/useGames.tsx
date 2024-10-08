import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Game {
  id: number;
  name: string;
  background_image: string;
}

interface FetchGamesResponse {
  count: number;
  results: Game[];
}

const useGames = (gameQuery: string) => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController(); //used to cancel further requests
    apiClient
      .get<FetchGamesResponse>("/games", {
        signal: controller.signal,
        params: {
          search: gameQuery,
        },
      })
      .then((res) => setGames(res.data.results))
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  });

  return { games, error };
};

export default useGames;
