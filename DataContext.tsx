
import React, { createContext, useContext, useState, useEffect } from 'react';
import { EQUIPMENT_LISTINGS, EQUIPMENT_CATEGORIES, DetailedEquipmentListing } from './constants';
import { ENTERPRISE_PARTS_CATALOG } from './partsData';
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
  updateCategory: (name: string, updates: any) => void;
  deleteCategory: (name: string) => void;
  updateCopy: (newCopy: Partial<SiteCopy>) => void;
  updatePart: (part_number: string, item: Partial<PartListing>) => void;
  addPart: (item: PartListing) => void;
  deletePart: (part_number: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [equipment, setEquipment] = useState<DetailedEquipmentListing[]>(EQUIPMENT_LISTINGS);
  const [categories, setCategories] = useState<any[]>(EQUIPMENT_CATEGORIES);
  const [parts, setParts] = useState<PartListing[]>(ENTERPRISE_PARTS_CATALOG);
  const [copy, setCopy] = useState<SiteCopy>({
    homeHeroTitle: "COMMAND YOUR HORIZON.",
    homeHeroSubtitle: "Architecting the world's most resilient industrial supply chains. We deliver mission-critical heavy assets with unprecedented velocity and logistical precision.",
    aboutMission: "To architect the most reliable heavy equipment supply chain in the Western Hemisphere.",
    aboutHistory: "Transforming surplus industrial capital into operational leverage for contractors worldwide."
  });

  useEffect(() => {
    const saved = localStorage.getItem('american_iron_data');
    if (saved) {
      const parsed = JSON.parse(saved);
      setEquipment(parsed.equipment || EQUIPMENT_LISTINGS);
      setCategories(parsed.categories || EQUIPMENT_CATEGORIES);
      setParts(parsed.parts || ENTERPRISE_PARTS_CATALOG);
      setCopy(parsed.copy || copy);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('american_iron_data', JSON.stringify({ equipment, categories, parts, copy }));
  }, [equipment, categories, parts, copy]);

  const addEquipment = (item: DetailedEquipmentListing) => setEquipment(prev => [item, ...prev]);
  const updateEquipment = (id: string, updates: Partial<DetailedEquipmentListing>) => 
    setEquipment(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  const deleteEquipment = (id: string) => setEquipment(prev => prev.filter(item => item.id !== id));

  const addCategory = (cat: any) => setCategories(prev => [...prev, cat]);
  const updateCategory = (name: string, updates: any) =>
    setCategories(prev => prev.map(c => c.name === name ? { ...c, ...updates } : c));
  const deleteCategory = (name: string) => setCategories(prev => prev.filter(c => c.name !== name));

  const addPart = (item: PartListing) => setParts(prev => [item, ...prev]);
  const updatePart = (part_number: string, updates: Partial<PartListing>) => 
    setParts(prev => prev.map(p => p.part_number === part_number ? { ...p, ...updates } : p));
  const deletePart = (part_number: string) => setParts(prev => prev.filter(p => p.part_number !== part_number));

  const updateCopy = (newCopy: Partial<SiteCopy>) => setCopy(prev => ({ ...prev, ...newCopy }));

  return (
    <DataContext.Provider value={{ 
      equipment, categories, parts, copy, 
      addEquipment, updateEquipment, deleteEquipment,
      addCategory, updateCategory, deleteCategory,
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
