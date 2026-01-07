import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { ParcFeature } from '@/components/features/interactive-map/components';
import { getNotifiedSet } from '@/components/features/interactive-map/services/notification-service';

interface TerrainContextType {
  selectedFeature: ParcFeature | null;
  isDialogOpen: boolean;
  openDialog: (feature: ParcFeature) => void;
  closeDialog: () => void;
  notifiedSet: Set<string>;
  setNotifiedSet: React.Dispatch<React.SetStateAction<Set<string>>>;
  loadNotifications: () => void
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
  const [notifiedSet, setNotifiedSet] = React.useState<Set<string>>(new Set());

  React.useEffect(() => {
    loadNotifications();
  }, [])

  const loadNotifications = () => {
    getNotifiedSet().then(setNotifiedSet)
  };

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
        notifiedSet,
        setNotifiedSet,
        loadNotifications,
      }}
    >
      {children}
    </TerrainContext.Provider>
  );
};