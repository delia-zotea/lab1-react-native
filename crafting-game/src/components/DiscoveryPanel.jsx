import React from "react";
import recipes from "../data/recipes.json";

export default function DiscoveryPanel({ inventory, discovered }) {
  // Verifică dacă o rețetă poate fi creată cu ce ai în inventar
  const craftable = recipes.filter((recipe) => {
    const needed = [...recipe.ingredients]; // folosim id-urile din rețetă
    const available = inventory.map(r => r.id); // folosim id-urile din inventar
    return needed.every(item => available.includes(item));
  });

  return (
    <div className="resources card">
      <h2>Panoul de Descoperire</h2>

      {/* Obiecte descoperite */}
      <div>
        <p>Obiecte descoperite:</p>
        <ul className="discovered-list">
          {discovered.length > 0 ? (
            discovered.map((item, i) => <li key={i}>{item.name}</li>) // afișăm numele românesc
          ) : (
            <li style={{ color: "#777" }}>Niciun obiect creat încă</li>
          )}
        </ul>
      </div>

      {/* Obiecte craftabile */}
      <div style={{ marginTop: "15px" }}>
        <p>Obiecte ce pot fi create cu resursele disponibile:</p>
        <ul>
          {craftable.length > 0 ? (
            craftable.map((r) => <li key={r.id}>{r.result.name}</li>)
          ) : (
            <li style={{ color: "#777" }}>Nu există obiecte craftabile</li>
          )}
        </ul>
      </div>
    </div>
  );
}
