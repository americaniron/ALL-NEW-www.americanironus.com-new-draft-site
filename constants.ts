
import { EquipmentListing, PartListing } from './types';

export const COLORS = {
  primary: '#111111',
  secondary: '#FFCC00',
  text: '#333333',
  lightBg: '#f9f9f9',
  border: '#e5e5e5'
};

export interface DetailedEquipmentListing extends EquipmentListing {
  description: string;
  specs: { label: string; value: string }[];
  features: string[];
}

// Enterprise Fleet Index - Populated with precise data from PDF OCR
export const EQUIPMENT_LISTINGS: DetailedEquipmentListing[] = [
  // BULLDOZERS (From PDF Page 1-2)
  { img: 'input_file_11.png', title: "CAT D312", make: "CAT", model: "D312", id: "784453", year: 2021, meter: "4501", price: "CALL", city: "Grand Rapids", state: "MI", category: "BULLDOZERS", description: "Standard bulldozer.", specs: [], features: [] },
  { img: 'input_file_11.png', title: "CAT D6 3D", make: "CAT", model: "D6 3D", id: "4920655", year: 2024, meter: "780", price: "$567,105", city: "", state: "TX", category: "BULLDOZERS", description: "Grade 3D equipped.", specs: [], features: [] },
  { img: 'input_file_11.png', title: "CAT D6 3D", make: "CAT", model: "D6 3D", id: "7809431", year: 2023, meter: "3147", price: "$448,455", city: "Aubrey", state: "TX", category: "BULLDOZERS", description: "Low hour unit.", specs: [], features: [] },
  { img: 'input_file_11.png', title: "CAT D620XEVP", make: "CAT", model: "D620XEVP", id: "9779051", year: 2021, meter: "5501", price: "$245,000", city: "Hope Mills", state: "NC", category: "BULLDOZERS", description: "High efficiency electric drive.", specs: [], features: [] },
  { img: 'input_file_11.png', title: "CAT D620XE", make: "CAT", model: "D620XE", id: "9844705", year: 2019, meter: "8816", price: "CALL", city: "Eau Claire", state: "WI", category: "BULLDOZERS", description: "XE Series performance.", specs: [], features: [] },
  { img: 'input_file_11.png', title: "CAT D8 MS", make: "CAT", model: "D8 MS", id: "15819219", year: 2023, meter: "2403", price: "$863,205", city: "Irving", state: "TX", category: "BULLDOZERS", description: "Multi-shank ripper equipped.", specs: [], features: [] },
  { img: 'input_file_11.png', title: "CAT D8T SS3", make: "CAT", model: "D8T SS3", id: "16804029", year: 2023, meter: "3845", price: "$726,705", city: "Georgetown", state: "TX", category: "BULLDOZERS", description: "Production class dozer.", specs: [], features: [] },
  { img: 'input_file_11.png', title: "CAT D9", make: "CAT", model: "D9", id: "20152383", year: 2024, meter: "1240", price: "$1,427,055", city: "Fort Worth", state: "TX", category: "BULLDOZERS", description: "Elite mining class.", specs: [], features: [] },

  // EXCAVATORS (From PDF Page 1-2)
  { img: 'input_file_10.png', title: "CAT 300.9D", make: "CAT", model: "300.9D", id: "110329", year: 2018, meter: "605", price: "$18,000", city: "Corpus Christi", state: "TX", category: "EXCAVATORS", description: "Micro excavator.", specs: [], features: [] },
  { img: 'input_file_10.png', title: "CAT 301.7-05CR", make: "CAT", model: "301.7-05CR", id: "110347", year: 2023, meter: "192", price: "$31,500", city: "Eloy", state: "AZ", category: "EXCAVATORS", description: "Compact radius.", specs: [], features: [] },
  { img: 'input_file_10.png', title: "CAT 302 05A CR", make: "CAT", model: "302 05A CR", id: "110383", year: 2022, meter: "153", price: "CALL", city: "Surrey", state: "BC", category: "EXCAVATORS", description: "Tier 4 Final.", specs: [], features: [] },
  { img: 'input_file_10.png', title: "CAT 302-05CR", make: "CAT", model: "302-05CR", id: "110401", year: 2023, meter: "38", price: "$50,000", city: "Eloy", state: "AZ", category: "EXCAVATORS", description: "Next Gen compact.", specs: [], features: [] },
  { img: 'input_file_10.png', title: "CAT 303.5-07CR", make: "CAT", model: "303.5-07CR", id: "110563", year: 2022, meter: "119", price: "$58,000", city: "Eloy", state: "AZ", category: "EXCAVATORS", description: "Versatile midi.", specs: [], features: [] },
  { img: 'input_file_10.png', title: "CAT 330 TC", make: "CAT", model: "330 TC", id: "113533", year: 2023, meter: "3043", price: "$303,555", city: "Cleburne", state: "TX", category: "EXCAVATORS", description: "Standard reach excavator.", specs: [], features: [] },
  { img: 'input_file_10.png', title: "CAT 336 12", make: "CAT", model: "336 12", id: "114811", year: 2023, meter: "2511", price: "$356,055", city: "Cleburne", state: "TX", category: "EXCAVATORS", description: "Heavy production unit.", specs: [], features: [] },
  { img: 'input_file_10.png', title: "CAT 374", make: "CAT", model: "374", id: "119257", year: 2024, meter: "2302", price: "$1,171,799", city: "Irving", state: "TX", category: "EXCAVATORS", description: "Massive excavation power.", specs: [], features: [] },

  // WHEEL LOADERS
  { img: 'input_file_7.png', title: "CAT 906-14", make: "CAT", model: "906-14", id: "1713425", year: 2023, meter: "262", price: "$95,000", city: "Park City", state: "KS", category: "WHEEL LOADERS", description: "Standard utility wheel loader.", specs: [], features: [] },
  { img: 'input_file_7.png', title: "CAT 906 CAB", make: "CAT", model: "906 CAB", id: "1826850", year: 2023, meter: "587", price: "$131,250", city: "Aubrey", state: "TX", category: "WHEEL LOADERS", description: "Cab-equipped compact loader.", specs: [], features: [] }
];

export const PARTS_LISTINGS: PartListing[] = [
  { pn: "8N0990", desc: "Exhaust Manifold Gasket" },
  { pn: "SAA6D95LE", desc: "Complete Engine Assembly" },
  { pn: "8H6877", desc: "Hydraulic Seal Kit" },
  { pn: "CS-583D", desc: "Drum Scraper Blade" },
  { pn: "4N6638", desc: "Water Pump Pulley" },
  { pn: "W330B", desc: "Final Drive Carrier" },
  { pn: "D5B", desc: "Under Carriage Roller" },
  { pn: "7W3659", desc: "Fuel Injection Nozzle" }
];

// Identical Enterprise Category List from Source PDF - Updated with user-provided machine photos
export const EQUIPMENT_CATEGORIES = [
  { name: 'ARTICULATED TRUCKS', img: 'input_file_13.png' },
  { name: 'ASPHALT PAVERS', img: 'input_file_1.png' },
  { name: 'BACKHOES', img: 'input_file_12.png' },
  { name: 'BULLDOZERS', img: 'input_file_11.png' },
  { name: 'COLD PLANERS', img: 'input_file_14.png' },
  { name: 'COMPACTORS', img: 'input_file_9.png' },
  { name: 'EXCAVATORS', img: 'input_file_10.png' },
  { name: 'MOTOR GRADERS', img: 'input_file_8.png' },
  { name: 'OFF-HIGHWAY TRUCKS', img: 'input_file_2.png' },
  { name: 'PIPELAYERS', img: 'input_file_3.png' },
  { name: 'SCRAPERS', img: 'input_file_5.png' },
  { name: 'SKIDSTEER', img: 'input_file_6.png' },
  { name: 'TELEHANDLERS', img: 'input_file_0.png' },
  { name: 'TRACK LOADERS', img: 'input_file_4.png' },
  { name: 'WHEEL LOADERS', img: 'input_file_7.png' }
];

export const PARTS_CATEGORIES = [
  { name: 'ATTACHMENTS', icon: 'fa-link' },
  { name: 'HYDRAULICS', icon: 'fa-water' },
  { name: 'ENGINE', icon: 'fa-engine' },
  { name: 'DRIVETRAIN', icon: 'fa-gears' },
  { name: 'UNDERCARRIAGE', icon: 'fa-bars-staggered' },
  { name: 'ELECTRICAL', icon: 'fa-bolt' }
];
