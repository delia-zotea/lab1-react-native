import React from "react";

export default function VictoryModal({ resetGame, finalItem }) {
  return (
    <div className="victory-overlay">
      <div className="victory-modal">
        <h2>🎉 Felicitări! Ai câștigat! 🎉</h2>
        <p>Ai creat obiectul final: <b>{finalItem.name}</b></p>
        <button className="button" onClick={resetGame}>
          Începe din nou
        </button>
      </div>
    </div>
  );
}
