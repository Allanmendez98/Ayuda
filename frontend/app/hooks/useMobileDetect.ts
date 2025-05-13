"use client"; // Asegúrate de marcar esto como un Client Component

import { useState, useEffect } from "react";

export function useMobileDetect() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileDevice = window.innerWidth <= 768; // Define el ancho máximo para móviles
      setIsMobile(isMobileDevice);
    };

    checkIfMobile(); // Verificar al cargar
    window.addEventListener("resize", checkIfMobile); // Verificar al cambiar el tamaño

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return isMobile;
}