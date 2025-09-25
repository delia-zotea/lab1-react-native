import React, { useState, useEffect } from "react";
import Inventory from "./components/Inventory";
import Crafting from "./components/Crafting";
import DiscoveryPanel from "./components/DiscoveryPanel";
import VictoryModal from "./components/VictoryModal";
import recipes from "./data/recipes.json";
import "./App.css";

export default function App() {
  const [inventory, setInventory] = useState(() => JSON.parse(localStorage.getItem("inventory")) || []);
  const [discovered, setDiscovered] = useState(() => JSON.parse(localStorage.getItem("discovered")) || []);
  const [victory, setVictory] = useState(() => JSON.parse(localStorage.getItem("victory")) || false);

  useEffect(() => localStorage.setItem("inventory", JSON.stringify(inventory)), [inventory]);
  useEffect(() => localStorage.setItem("discovered", JSON.stringify(discovered)), [discovered]);
  useEffect(() => localStorage.setItem("victory", JSON.stringify(victory)), [victory]);

  const handleCraft = (newItem) => {
    setInventory([...inventory, newItem]);

    if (!discovered.includes(newItem)) {
      setDiscovered([...discovered, newItem]);
    }

    const recipe = recipes.find((r) => r.result.name === newItem);
    if (recipe?.isFinal) {
      setVictory(true);
    }
  };

  const resetGame = () => {
    setInventory([]);
    setDiscovered([]);
    setVictory(false);
    localStorage.removeItem("inventory");
    localStorage.removeItem("discovered");
    localStorage.removeItem("victory");
  };

  return (
    <div className="app-container">
      <h1 className="title"> Joc de Crafting React </h1>

      <div className="main-grid">
        <div className="resources">
          <DiscoveryPanel inventory={inventory} discovered={discovered} />
        </div>

        <div className="crafting-area">
          <Crafting inventory={inventory} setInventory={setInventory} handleCraft={handleCraft} />
        </div>

        <div className="inventory-area">
          <Inventory inventory={inventory} setInventory={setInventory} />
        </div>

        <div className="garbage-area">
          <button className="btn clear-btn" onClick={() => setInventory([])}>
            🗑️ Golește Inventarul
          </button>
          <button className="btn reset-btn" onClick={resetGame}>
            🔄 Reset Joc
          </button>
        </div>
      </div>

      {victory && <VictoryModal resetGame={resetGame} finalItem={victory} />}
    </div>
  );
}
