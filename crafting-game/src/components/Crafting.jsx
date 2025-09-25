import React, { useState } from "react";
import recipes from "../data/recipes.json";

export default function Crafting({ inventory, setInventory, handleCraft }) {
  const [craftingSlots, setCraftingSlots] = useState([]);

  // Drop în zona de crafting
  const handleDrop = (e) => {
    e.preventDefault();

    const resourceIndex = e.dataTransfer.getData("resourceIndex");
    const from = e.dataTransfer.getData("from");

    if (from === "inventory" && resourceIndex !== null && resourceIndex !== "") {
      const idx = parseInt(resourceIndex, 10);
      if (!Number.isNaN(idx) && idx >= 0 && idx < inventory.length) {
        const resource = inventory[idx]; // Obiectul {id, name}
        const updatedInventory = [...inventory];
        updatedInventory.splice(idx, 1);
        setInventory(updatedInventory);

        // Adăugăm obiectul complet în crafting
        setCraftingSlots((prev) => [...prev, resource]);
      }
    }
  };

  // Elimină resursa din crafting
  const removeFromCrafting = (index) => {
    const updated = [...craftingSlots];
    updated.splice(index, 1);
    setCraftingSlots(updated);
  };

  // Detectează dacă crafting-ul curent formează o rețetă validă
  const checkRecipe = () => {
    for (let recipe of recipes) {
      const needed = [...recipe.ingredients].sort().join(",");
      const current = craftingSlots.map(r => r.id).sort().join(",");
      if (needed === current) return recipe;
    }
    return null;
  };

  const recipeMatch = checkRecipe();

  // Confirmă crafting → adaugă în inventar
  const confirmCraft = () => {
    if (recipeMatch) {
      handleCraft(recipeMatch.result); // trimitem obiectul complet {id, name}
      setCraftingSlots([]); // golește crafting
    }
  };

  // Grid 3x3 pentru crafting
  const totalSlots = 9;
  const slots = Array.from({ length: totalSlots }, (_, i) => craftingSlots[i] || null);

  return (
    <div
      className="crafting-card card"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <h2 style={{ gridColumn: "1 / -1", textAlign: "center" }}>Zona de Crafting</h2>

      {slots.map((slot, i) => (
        <div
          key={i}
          className="slot"
          draggable={!!slot}
          onDragStart={(e) => {
            if (slot) {
              e.dataTransfer.setData("resourceId", slot.id);
              e.dataTransfer.setData("resourceName", slot.name);
              e.dataTransfer.setData("from", "crafting");
              e.dataTransfer.setData("craftingIndex", i);
            }
          }}
          onDragEnd={() => {
            if (slot) removeFromCrafting(i);
          }}
        >
          {slot ? slot.name : <span style={{ color: "#777", fontSize: "0.9rem" }}>+</span>}
        </div>
      ))}

      {recipeMatch && (
        <div style={{ gridColumn: "1 / -1", marginTop: "10px", textAlign: "center" }}>
          <p>Poți crea: <b>{recipeMatch.result.name}</b></p>
          <button className="button" onClick={confirmCraft}>
            Confirmă Craft
          </button>
        </div>
      )}
    </div>
  );
}
