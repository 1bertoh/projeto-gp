import React, { useState, useEffect } from "react";
import { FullScreenHandle } from "react-full-screen";

import RevenueView from "pages/VisoesBI/Revenue/revenueView";
import StockView from "pages/VisoesBI/Stock/stockView";

type ScreenProps = {
  fullscreenHandle: FullScreenHandle;
  screens?: {
    name: string;
    id: number | string;
    isActive: boolean;
    seconds: number;
  }[];
};

const BIShowcase = (props: ScreenProps) => {
  const { fullscreenHandle, screens: propScreens = [] } = props;

  // Filtra apenas as telas ativas
  const activeScreens = propScreens.filter((screen) => screen.isActive);

  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);

  useEffect(() => {
    // Garante que há telas ativas para exibir
    if (activeScreens.length === 0) return;

    const currentScreen = activeScreens[currentScreenIndex];
    const interval = setInterval(() => {
      setCurrentScreenIndex((prevIndex) => (prevIndex + 1) % activeScreens.length);
    }, currentScreen.seconds * 1000); // Usa o tempo definido em 'seconds'

    return () => clearInterval(interval);
  }, [currentScreenIndex, activeScreens]);

  // Mapeia os componentes pelo nome
  const screenComponents: Record<string, JSX.Element> = {
    Faturamento: <RevenueView />,
    Estoque: <StockView />,
  };

  const currentScreen = activeScreens[currentScreenIndex];

  return (
    <div>
      <i onClick={fullscreenHandle.exit} className="far fa-times-circle modetv-close-icon"></i>
      <div className="pt-1 var(--bs-body-bg)">
        {currentScreen && screenComponents[currentScreen.name]}
      </div>
    </div>
  );
};

export default BIShowcase;
