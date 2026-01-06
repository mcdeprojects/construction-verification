import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { ParcFeature } from '@/components/features/interactive-map/components';

interface TerrainContextType {
  selectedFeature: ParcFeature | null;
  isDialogOpen: boolean;
  openDialog: (feature: ParcFeature) => void;
  closeDialog: () => void;
}

const TerrainContext = createContext<TerrainContextType | undefined>(undefined);

export const useTerrainContext = () => {
  const context = useContext(TerrainContext);
  if (!context) {
    throw new Error('useTerrainContext must be used within TerrainProvider');
  }
  return context;
};

interface TerrainProviderProps {
  children: ReactNode;
}

export const TerrainProvider: React.FC<TerrainProviderProps> = ({ children }) => {
  const [selectedFeature, setSelectedFeature] = useState<ParcFeature | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = (feature: ParcFeature) => {
    setSelectedFeature(feature);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setTimeout(() => setSelectedFeature(null), 300);
  };

  return (
    <TerrainContext.Provider
      value={{
        selectedFeature,
        isDialogOpen,
        openDialog,
        closeDialog,
      }}
    >
      {children}
    </TerrainContext.Provider>
  );
};