
import React, { createContext, useContext, useState, useEffect } from 'react';
import { EQUIPMENT_LISTINGS, EQUIPMENT_CATEGORIES, PARTS_LISTINGS, DetailedEquipmentListing } from './constants';
import { PartListing } from './types';

interface SiteCopy {
  homeHeroTitle: string;
  homeHeroSubtitle: string;
  aboutMission: string;
  aboutHistory: string;
}

interface DataContextType {
  equipment: DetailedEquipmentListing[];
  categories: any[];
  parts: PartListing[];
  copy: SiteCopy;
  addEquipment: (item: DetailedEquipmentListing) => void;
  updateEquipment: (id: string, item: Partial<DetailedEquipmentListing>) => void;
  deleteEquipment: (id: string) => void;
  addCategory: (cat: any) => void;
  deleteCategory: (name: string) => void;
  updateCopy: (newCopy: Partial<SiteCopy>) => void;
  updatePart: (pn: string, item: Partial<PartListing>) => void;
  addPart: (item: PartListing) => void;
  deletePart: (pn: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [equipment, setEquipment] = useState<DetailedEquipmentListing[]>(EQUIPMENT_LISTINGS);
  const [categories, setCategories] = useState<any[]>(EQUIPMENT_CATEGORIES);
  const [parts, setParts] = useState<PartListing[]>(PARTS_LISTINGS);
  const [copy, setCopy] = useState<SiteCopy>({
    homeHeroTitle: "Global Equipment Solutions. Built for Your Fleet.",
    homeHeroSubtitle: "Enterprise-level sourcing, precision dismantling, and seamless logistics for the heavy construction industry worldwide.",
    aboutMission: "American Iron LLC was established to bring a higher standard of professionalism to the heavy equipment market. We recognized a gap between the needs of modern, large-scale fleets and the fragmented nature of parts sourcing.",
    aboutHistory: "We are not just a yard; we are a logistics and procurement engine. Our team combines decades of field experience with modern supply chain management to ensure your iron stays moving."
  });

  // Persist to localStorage for demo purposes
  useEffect(() => {
    const saved = localStorage.getItem('ai_studio_data');
    if (saved) {
      const parsed = JSON.parse(saved);
      setEquipment(parsed.equipment);
      setCategories(parsed.categories);
      setParts(parsed.parts);
      setCopy(parsed.copy);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ai_studio_data', JSON.stringify({ equipment, categories, parts, copy }));
  }, [equipment, categories, parts, copy]);

  const addEquipment = (item: DetailedEquipmentListing) => setEquipment(prev => [item, ...prev]);
  const updateEquipment = (id: string, updates: Partial<DetailedEquipmentListing>) => 
    setEquipment(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  const deleteEquipment = (id: string) => setEquipment(prev => prev.filter(item => item.id !== id));

  const addCategory = (cat: any) => setCategories(prev => [...prev, cat]);
  const deleteCategory = (name: string) => setCategories(prev => prev.filter(c => c.name !== name));

  const addPart = (item: PartListing) => setParts(prev => [item, ...prev]);
  const updatePart = (pn: string, updates: Partial<PartListing>) => 
    setParts(prev => prev.map(p => p.pn === pn ? { ...p, ...updates } : p));
  const deletePart = (pn: string) => setParts(prev => prev.filter(p => p.pn !== pn));

  const updateCopy = (newCopy: Partial<SiteCopy>) => setCopy(prev => ({ ...prev, ...newCopy }));

  return (
    <DataContext.Provider value={{ 
      equipment, categories, parts, copy, 
      addEquipment, updateEquipment, deleteEquipment,
      addCategory, deleteCategory,
      addPart, updatePart, deletePart,
      updateCopy 
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};
