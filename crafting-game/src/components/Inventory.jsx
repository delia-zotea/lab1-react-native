import React from "react";

export default function Inventory({ inventory, setInventory }) {
  const baseResources = [
    { id: "wood", name: "Lemn" },
    { id: "stone", name: "Piatra" },
    { id: "water", name: "Apa" }
  ];

  // Adaugă resursă manual
  const addResource = (resource) => {
    setInventory([...inventory, resource]);
  };

  // Șterge resursă după index
  const removeResource = (index) => {
    const updated = [...inventory];
    updated.splice(index, 1);
    setInventory(updated);
  };

  // Drop din Crafting în Inventar
  const handleDrop = (e) => {
    e.preventDefault();
    const resourceId = e.dataTransfer.getData("resourceId");
    const resourceName = e.dataTransfer.getData("resourceName");
    const from = e.dataTransfer.getData("from");

    if (from === "crafting" && resourceId && resourceName) {
      setInventory([...inventory, { id: resourceId, name: resourceName }]);
    }
  };

  return (
    <div
      className="inventory-card card"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <h2>Inventar</h2>

      {/* Butoane pentru generare resurse */}
      <div className="inventory-controls" style={{ marginBottom: 10 }}>
        {baseResources.map((res) => (
          <button
            key={res.id}
            className="button"
            onClick={() => addResource(res)}
          >
            Adaugă {res.name}
          </button>
        ))}
      </div>

      {/* Lista de obiecte */}
      {inventory.length === 0 && (
        <div style={{ gridColumn: "1 / -1", color: "#777" }}>
          Nicio resursă adăugată
        </div>
      )}
      {inventory.map((item, index) => (
        <div
          key={index}
          className="item"
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData("resourceIndex", index);
            e.dataTransfer.setData("from", "inventory");
          }}
        >
          <span>{item.name}</span>
          <button
            className="button"
            style={{
              backgroundColor: "#e74c3c",
              color: "#fff",
              marginLeft: "8px",
              padding: "4px 6px",
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
              fontSize: "0.8rem",
            }}
            onClick={() => removeResource(index)}
          >
            Șterge
          </button>
        </div>
      ))}
    </div>
  );
}
