export interface Starship {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  [key: string]: unknown;
}

interface StarshipCardProps {
  starship: Starship;
}

export default function StarshipCard({ starship }: StarshipCardProps) {
  return (
    <li
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "0.75rem",
        backgroundColor: "#1e1e1e", // Ajusta el fondo si tu app es modo claro/oscuro
        color: "#fff",
      }}
    >
      <h3 style={{ margin: "0 0 0.5rem 0", color: "#ffe81f" }}>
        {starship.name}
      </h3>
      <p style={{ margin: "0.25rem 0" }}>
        <strong>Modelo:</strong> {starship.model}
      </p>
      <p style={{ margin: "0.25rem 0" }}>
        <strong>Fabricante:</strong> {starship.manufacturer}
      </p>
      <p style={{ margin: "0.25rem 0" }}>
        <strong>Costo:</strong> {starship.cost_in_credits} créditos
      </p>
    </li>
  );
}