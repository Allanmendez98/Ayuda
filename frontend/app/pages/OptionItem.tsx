// OptionItem.tsx
import React from "react";
import { Opcion } from "./data"; // Importamos la interfaz Opcion desde data.ts

// Definimos la interfaz OptionItemProps
export
interface OptionItemProps {
  opcion: Opcion;
  expandedOption: string | null;
  selectedSubOption: string | null;
  handleOptionClick: (id: string) => void;
  handleSubOptionClick: (id: string) => void;
}

// Definimos el componente OptionItem
export const OptionItem = React.memo<OptionItemProps>(({
  opcion,
  expandedOption,
  selectedSubOption,
  handleOptionClick,
  handleSubOptionClick,
}) => (
  <li key={opcion.id}>
    <div
      className={`option-header ${expandedOption === opcion.id ? "selected" : ""}`}
      onClick={() => handleOptionClick(opcion.id)}
    >
        
      <img
        src={
          opcion.id === "opcion1"
            ? "/imgs/usuario.png"
            : opcion.id === "opcion2"
            ? "/imgs/candado.png"
            : "/imgs/chats.png"
        }
        alt={`Ícono de ${opcion.titulo}`}//Agregamos un atributo alt al ícono
        className="option-icon"
      />
      {opcion.titulo}
      <span className="arrow">{expandedOption === opcion.id ? "▲" : "▼"}</span>
    </div>
    
    {expandedOption === opcion.id && (
      <ul className="subopciones">
        {opcion.subopciones.map((subopcion) => (
          <li
            key={subopcion.id}
            className={`subopcion ${selectedSubOption === subopcion.id ? "selected" : ""}`}
            onClick={() => handleSubOptionClick(subopcion.id)}
          >
            {subopcion.titulo}
          </li>
        ))}
      </ul>
    )}
  </li>
));