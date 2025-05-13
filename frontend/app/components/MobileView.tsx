import React from "react";
import "./MobileView.css"; // Importa los estilos específicos para móviles

interface MobileViewProps {
  children: React.ReactNode; // Acepta cualquier contenido como hijos
}

const MobileView: React.FC<MobileViewProps> = ({ children }) => {
  return <div className="mobile-view">{children}</div>;
};

export default MobileView;