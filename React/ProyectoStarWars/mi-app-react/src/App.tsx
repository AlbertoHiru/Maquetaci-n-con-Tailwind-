import { useState, useEffect } from "react";
import StarshipCard, { type Starship } from "./StarshipCard";

interface SwapiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Starship[];
}

export default function Starships() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [starships, setStarships] = useState<Starship[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("https://swapi.dev/api/starships/", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Error en la petición: ${response.status}`);
        }

        const json: SwapiResponse = await response.json();
        setStarships(json.results);
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") return;
        console.error(err);
        setError("Ocurrió un error al cargar las naves. Inténtalo más tarde.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  // Early return para estado de carga
  if (loading) {
    return <p style={{ textAlign: "center", fontSize: "1.2rem" }}>Cargando naves...</p>;
  }

  // Early return para manejo de errores (lo solicitado en la lección)
  if (error) {
    return (
      <div style={{ padding: "1rem", color: "#ff4d4f", textAlign: "center" }}>
        <p>⚠️ {error}</p>
      </div>
    );
  }

  // Render principal cuando todo sale bien
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {starships.map((ship) => (
        <StarshipCard key={ship.name} starship={ship} />
      ))}
    </ul>
  );
}