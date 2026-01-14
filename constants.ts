
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

const defaultDescription = "Production-class heavy machinery, rigorously inspected and maintained. Ready for immediate deployment to demanding job sites globally. Full service history available upon request.";
const defaultFeatures = ["Verified Service History", "Export Ready", "Fleet Maintained", "Financing Available"];

export const EQUIPMENT_LISTINGS: DetailedEquipmentListing[] = [
  // ARTICULATED TRUCKS
  { id: "6564805", make: "CAT", model: "725", year: 2024, meter: "533", price: "CALL", city: "Victoria", state: "TX", category: "ARTICULATED TRUCKS", title: "2024 CAT 725", img: 'https://images.unsplash.com/photo-1590684277732-22530d9796e6?q=80&w=800', description: defaultDescription, specs: [{label: "Payload", value: "26.5 Tons"}], features: defaultFeatures },
  { id: "6678230", make: "CAT", model: "725", year: 2023, meter: "1606", price: "$416,955", city: "Longview", state: "TX", category: "ARTICULATED TRUCKS", title: "2023 CAT 725", img: 'https://images.unsplash.com/photo-1590684277732-22530d9796e6?q=80&w=800', description: defaultDescription, specs: [{label: "Payload", value: "26.5 Tons"}], features: defaultFeatures },
  { id: "8039330", make: "CAT", model: "725C", year: 2016, meter: "6652", price: "$157,500", city: "San Antonio", state: "TX", category: "ARTICULATED TRUCKS", title: "2016 CAT 725C", img: 'https://images.unsplash.com/photo-1590684277732-22530d9796e6?q=80&w=800', description: defaultDescription, specs: [{label: "Payload", value: "26.5 Tons"}], features: defaultFeatures },
  { id: "8833305", make: "CAT", model: "730", year: 2023, meter: "1652", price: "$455,805", city: "Corpus Christi", state: "TX", category: "ARTICULATED TRUCKS", title: "2023 CAT 730", img: 'https://images.unsplash.com/photo-1590684277732-22530d9796e6?q=80&w=800', description: defaultDescription, specs: [{label: "Payload", value: "31 Tons"}], features: defaultFeatures },
  { id: "10988380", make: "CAT", model: "735", year: 2022, meter: "1127", price: "$510,000", city: "Aubrey", state: "TX", category: "ARTICULATED TRUCKS", title: "2022 CAT 735", img: 'https://images.unsplash.com/photo-1590684277732-22530d9796e6?q=80&w=800', description: defaultDescription, specs: [{label: "Payload", value: "36 Tons"}], features: defaultFeatures },
  { id: "11668930", make: "CAT", model: "740GC", year: 2021, meter: "1586", price: "$561,750", city: "Corpus Christi", state: "TX", category: "ARTICULATED TRUCKS", title: "2021 CAT 740GC", img: 'https://images.unsplash.com/photo-1584433144859-1fc3ab84a9ec?q=80&w=800', description: defaultDescription, specs: [{label: "Payload", value: "40 Tons"}], features: defaultFeatures },
  { id: "12803180", make: "CAT", model: "745", year: 2023, meter: "2525", price: "$854,699", city: "Aubrey", state: "TX", category: "ARTICULATED TRUCKS", title: "2023 CAT 745", img: 'https://images.unsplash.com/photo-1584433144859-1fc3ab84a9ec?q=80&w=800', description: defaultDescription, specs: [{label: "Payload", value: "45.2 Tons"}], features: defaultFeatures },

  // DOZERS
  { id: "784453", make: "CAT", model: "D3", year: 2021, meter: "4501", price: "CALL", city: "Grand Rapids", state: "MI", category: "DOZERS", title: "2021 CAT D3", img: 'https://images.unsplash.com/photo-1579361655073-45f8f972b9a7?q=80&w=800', description: defaultDescription, specs: [{label: "Class", value: "Small"}], features: defaultFeatures },
  { id: "4920655", make: "CAT", model: "D6", year: 2024, meter: "780", price: "$567,105", city: "Aubrey", state: "TX", category: "DOZERS", title: "2024 CAT D6", img: 'https://images.unsplash.com/photo-1579361655073-45f8f972b9a7?q=80&w=800', description: defaultDescription, specs: [{label: "Class", value: "Medium"}], features: defaultFeatures },
  { id: "15819219", make: "CAT", model: "D8 MS", year: 2023, meter: "2403", price: "$863,205", city: "Irving", state: "TX", category: "DOZERS", title: "2023 CAT D8 MS", img: 'https://images.unsplash.com/photo-1586191582151-f7463238779d?q=80&w=800', description: defaultDescription, specs: [{label: "Class", value: "Large"}], features: defaultFeatures },
  { id: "20152383", make: "CAT", model: "D9", year: 2024, meter: "1240", price: "$1,427,055", city: "Fort Worth", state: "TX", category: "DOZERS", title: "2024 CAT D9", img: 'https://images.unsplash.com/photo-1586191582151-f7463238779d?q=80&w=800', description: defaultDescription, specs: [{label: "Class", value: "Large"}], features: defaultFeatures },
  { id: "21596771", make: "CAT", model: "D10T SS", year: 2021, meter: "3773", price: "$1,443,750", city: "San Antonio", state: "TX", category: "DOZERS", title: "2021 CAT D10T SS", img: 'https://images.unsplash.com/photo-1586191582151-f7463238779d?q=80&w=800', description: defaultDescription, specs: [{label: "Class", value: "Mining"}], features: defaultFeatures },

  // EXCAVATORS
  { id: "110329", make: "CAT", model: "300.9D", year: 2018, meter: "605", price: "$18,000", city: "Corpus Christi", state: "TX", category: "EXCAVATORS", title: "2018 CAT 300.9D", img: 'https://images.unsplash.com/photo-1580901368919-7738efb0f87e?q=80&w=800', description: defaultDescription, specs: [{label: "Class", value: "Micro"}], features: defaultFeatures },
  { id: "111391", make: "CAT", model: "320 TC", year: 2024, meter: "434", price: "$329,699", city: "Aubrey", state: "TX", category: "EXCAVATORS", title: "2024 CAT 320 TC", img: 'https://images.unsplash.com/photo-1580901368919-7738efb0f87e?q=80&w=800', description: defaultDescription, specs: [{label: "Class", value: "Medium"}], features: defaultFeatures },
  { id: "111877", make: "CAT", model: "323 TC", year: 2024, meter: "438", price: "$275,205", city: "Fort Worth", state: "TX", category: "EXCAVATORS", title: "2024 CAT 323 TC", img: 'https://images.unsplash.com/photo-1580901368919-7738efb0f87e?q=80&w=800', description: defaultDescription, specs: [{label: "Class", value: "Medium"}], features: defaultFeatures },
  { id: "112813", make: "CAT", model: "325 TC", year: 2023, meter: "3139", price: "$206,955", city: "Victoria", state: "TX", category: "EXCAVATORS", title: "2023 CAT 325 TC", img: 'https://images.unsplash.com/photo-1541888941295-184a621d4693?q=80&w=800', description: defaultDescription, specs: [{label: "Class", value: "Medium"}], features: defaultFeatures },
  { id: "113533", make: "CAT", model: "330 TC", year: 2023, meter: "3043", price: "$303,555", city: "Cleburne", state: "TX", category: "EXCAVATORS", title: "2023 CAT 330 TC", img: 'https://images.unsplash.com/photo-1541888941295-184a621d4693?q=80&w=800', description: defaultDescription, specs: [{label: "Class", value: "Large"}], features: defaultFeatures },
  { id: "114613", make: "CAT", model: "335 TC", year: 2024, meter: "802", price: "$470,399", city: "Waco", state: "TX", category: "EXCAVATORS", title: "2024 CAT 335 TC", img: 'https://images.unsplash.com/photo-1541888941295-184a621d4693?q=80&w=800', description: defaultDescription, specs: [{label: "Class", value: "Large"}], features: defaultFeatures },
  { id: "115945", make: "CAT", model: "340 10 TC", year: 2023, meter: "1321", price: "$530,249", city: "Austin", state: "TX", category: "EXCAVATORS", title: "2023 CAT 340 10 TC", img: 'https://images.unsplash.com/photo-1541888941295-184a621d4693?q=80&w=800', description: defaultDescription, specs: [{label: "Class", value: "Large"}], features: defaultFeatures },
  { id: "117745", make: "CAT", model: "349FL TC", year: 2018, meter: "6171", price: "$309,750", city: "Irving", state: "TX", category: "EXCAVATORS", title: "2018 CAT 349FL TC", img: 'https://images.unsplash.com/photo-1541888941295-184a621d4693?q=80&w=800', description: defaultDescription, specs: [{label: "Class", value: "Large"}], features: defaultFeatures },
  { id: "119581", make: "CAT", model: "395", year: 2023, meter: "1886", price: "$1,409,099", city: "Irving", state: "TX", category: "EXCAVATORS", title: "2023 CAT 395", img: 'https://images.unsplash.com/photo-1541888941295-184a621d4693?q=80&w=800', description: defaultDescription, specs: [{label: "Class", value: "Mass Excavation"}], features: defaultFeatures },

  // MOTOR GRADERS
  { id: "65654", make: "CAT", model: "120 JOY", year: 2023, meter: "1017", price: "$365,505", city: "Victoria", state: "TX", category: "MOTOR GRADERS", title: "2023 CAT 120 JOY", img: 'https://images.unsplash.com/photo-1578500484694-825593874051?q=80&w=800', description: defaultDescription, specs: [{label: "Blade Width", value: "12 ft"}], features: defaultFeatures },
  { id: "328270", make: "CAT", model: "120AWD JOY", year: 2019, meter: "3952", price: "$189,000", city: "Cleburne", state: "TX", category: "MOTOR GRADERS", title: "2019 CAT 120AWD JOY", img: 'https://images.unsplash.com/photo-1578500484694-825593874051?q=80&w=800', description: defaultDescription, specs: [{label: "Blade Width", value: "12 ft"}], features: defaultFeatures },
  { id: "1247426", make: "CAT", model: "140 AWD", year: 2023, meter: "1516", price: "$506,099", city: "Fort Worth", state: "TX", category: "MOTOR GRADERS", title: "2023 CAT 140 AWD", img: 'https://images.unsplash.com/photo-1578500484694-825593874051?q=80&w=800', description: defaultDescription, specs: [{label: "Blade Width", value: "14 ft"}], features: defaultFeatures },
  { id: "4267510", make: "CAT", model: "150 JOY3", year: 2024, meter: "600", price: "$469,455", city: "San Antonio", state: "TX", category: "MOTOR GRADERS", title: "2024 CAT 150 JOY3", img: 'https://images.unsplash.com/photo-1578500484694-825593874051?q=80&w=800', description: defaultDescription, specs: [{label: "Blade Width", value: "14 ft"}], features: defaultFeatures },
  { id: "5186666", make: "CAT", model: "160M3 AWD3", year: 2017, meter: "4084", price: "$367,500", city: "Corpus Christi", state: "TX", category: "MOTOR GRADERS", title: "2017 CAT 160M3 AWD3", img: 'https://images.unsplash.com/photo-1578500484694-825593874051?q=80&w=800', description: defaultDescription, specs: [{label: "Blade Width", value: "16 ft"}], features: defaultFeatures },

  // OFF-HIGHWAY TRUCKS
  { id: "10534680", make: "CAT", model: "730", year: 2019, meter: "2805", price: "$385,000", city: "Brenham", state: "TX", category: "OFF-HIGHWAY TRUCKS", title: "2019 CAT 730", img: 'https://images.unsplash.com/photo-1584433144859-1fc3ab84a9ec?q=80&w=800', description: defaultDescription, specs: [{label: "Type", value: "Rigid Frame"}], features: defaultFeatures },
  { id: "24939655", make: "CAT", model: "770G", year: 2022, meter: "1123", price: "$719,250", city: "N/A", state: "TX", category: "OFF-HIGHWAY TRUCKS", title: "2022 CAT 770G", img: 'https://images.unsplash.com/photo-1584433144859-1fc3ab84a9ec?q=80&w=800', description: defaultDescription, specs: [{label: "Payload", value: "40 Tons"}], features: defaultFeatures },
  { id: "25166505", make: "CAT", model: "772G", year: 2019, meter: "9546", price: "CALL", city: "lexington", state: "KY", category: "OFF-HIGHWAY TRUCKS", title: "2019 CAT 772G", img: 'https://images.unsplash.com/photo-1584433144859-1fc3ab84a9ec?q=80&w=800', description: defaultDescription, specs: [{label: "Payload", value: "52 Tons"}], features: defaultFeatures },
  { id: "25279930", make: "CAT", model: "775G", year: 2023, meter: "1213", price: "$1,155,000", city: "Aubrey", state: "TX", category: "OFF-HIGHWAY TRUCKS", title: "2023 CAT 775G", img: 'https://images.unsplash.com/photo-1584433144859-1fc3ab84a9ec?q=80&w=800', description: defaultDescription, specs: [{label: "Payload", value: "70 Tons"}], features: defaultFeatures },

  // SKID STEERS
  { id: "65575654", make: "CAT", model: "226D3", year: 2023, meter: "114", price: "$48,000", city: "Wichita", state: "KS", category: "SKID STEERS", title: "2023 CAT 226D3", img: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?q=80&w=800', description: defaultDescription, specs: [{label: "Type", value: "Wheeled"}], features: defaultFeatures },
  { id: "133332194", make: "CAT", model: "246D3", year: 2022, meter: "332", price: "$54,000", city: "Eloy", state: "AZ", category: "SKID STEERS", title: "2022 CAT 246D3", img: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?q=80&w=800', description: defaultDescription, specs: [{label: "Type", value: "Wheeled"}], features: defaultFeatures },
  { id: "411134008", make: "CAT", model: "262D3", year: 2022, meter: "2872", price: "CALL", city: "Monticello", state: "MN", category: "SKID STEERS", title: "2022 CAT 262D3", img: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?q=80&w=800', description: defaultDescription, specs: [{label: "Type", value: "Wheeled"}], features: defaultFeatures },
  { id: "458563586", make: "CAT", model: "272D3", year: 2022, meter: "1412", price: "$50,000", city: "Wichita", state: "KS", category: "SKID STEERS", title: "2022 CAT 272D3", img: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?q=80&w=800', description: defaultDescription, specs: [{label: "Type", value: "Wheeled"}], features: defaultFeatures },

  // TRACK LOADERS
  { id: "99453924", make: "CAT", model: "239D3", year: 2023, meter: "77", price: "$52,000", city: "Jonesboro", state: "AR", category: "TRACK LOADERS", title: "2023 CAT 239D3", img: 'https://images.unsplash.com/photo-1586191582151-f7463238779d?q=80&w=800', description: defaultDescription, specs: [{label: "Type", value: "Compact Track Loader"}], features: defaultFeatures },
  { id: "207864388", make: "CAT", model: "259D3", year: 2023, meter: "1298", price: "CALL", city: "Hope Mills", state: "NC", category: "TRACK LOADERS", title: "2023 CAT 259D3", img: 'https://images.unsplash.com/photo-1586191582151-f7463238779d?q=80&w=800', description: defaultDescription, specs: [{label: "Type", value: "Compact Track Loader"}], features: defaultFeatures },
  { id: "627954936", make: "CAT", model: "299D3", year: 2022, meter: "609", price: "$74,000", city: "Ocala", state: "FL", category: "TRACK LOADERS", title: "2022 CAT 299D3", img: 'https://images.unsplash.com/photo-1586191582151-f7463238779d?q=80&w=800', description: defaultDescription, specs: [{label: "Type", value: "Compact Track Loader"}], features: defaultFeatures },
  { id: "12829075", make: "CAT", model: "953", year: 2024, meter: "1288", price: "$414,749", city: "Aubrey", state: "TX", category: "TRACK LOADERS", title: "2024 CAT 953", img: 'https://images.unsplash.com/photo-1586191582151-f7463238779d?q=80&w=800', description: defaultDescription, specs: [{label: "Class", value: "Medium"}], features: defaultFeatures },
  { id: "18046625", make: "CAT", model: "973K", year: 2023, meter: "3592", price: "$713,999", city: "Austin", state: "TX", category: "TRACK LOADERS", title: "2023 CAT 973K", img: 'https://images.unsplash.com/photo-1586191582151-f7463238779d?q=80&w=800', description: defaultDescription, specs: [{label: "Class", value: "Large"}], features: defaultFeatures },

  // TELEHANDLERS
  { id: "677565411", make: "CAT", model: "TL1255D", year: 2018, meter: "3233", price: "$103,005", city: "Irving", state: "TX", category: "TELEHANDLERS", title: "2018 CAT TL1255D", img: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=800', description: defaultDescription, specs: [{label: "Lift Capacity", value: "12,000 lbs"}], features: defaultFeatures },
  { id: "1355130822", make: "CAT", model: "TL1055", year: 2023, meter: "951", price: "$262,500", city: "Longview", state: "TX", category: "TELEHANDLERS", title: "2023 CAT TL1055", img: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=800', description: defaultDescription, specs: [{label: "Lift Capacity", value: "10,000 lbs"}], features: defaultFeatures },
  { id: "6098088699", make: "CAT", model: "TL943", year: 2024, meter: "134", price: "$192,255", city: "Dallas", state: "TX", category: "TELEHANDLERS", title: "2024 CAT TL943", img: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=800', description: defaultDescription, specs: [{label: "Lift Capacity", value: "9,000 lbs"}], features: defaultFeatures },

  // WHEEL LOADERS
  { id: "1713425", make: "CAT", model: "906", year: 2023, meter: "262", price: "$95,000", city: "Park City", state: "KS", category: "WHEEL LOADERS", title: "2023 CAT 906", img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800', description: defaultDescription, specs: [{label: "Class", value: "Compact"}], features: defaultFeatures },
  { id: "2507400", make: "CAT", model: "926M QC", year: 2020, meter: "4886", price: "$130,725", city: "Irving", state: "TX", category: "WHEEL LOADERS", title: "2020 CAT 926M QC", img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800', description: defaultDescription, specs: [{label: "Class", value: "Small"}], features: defaultFeatures },
  { id: "4435625", make: "CAT", model: "938M", year: 2022, meter: "645", price: "$245,000", city: "Eloy", state: "AZ", category: "WHEEL LOADERS", title: "2022 CAT 938M", img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800', description: defaultDescription, specs: [{label: "Class", value: "Medium"}], features: defaultFeatures },
  { id: "8405500", make: "CAT", model: "950GC", year: 2023, meter: "1633", price: "CALL", city: "Orlando", state: "FL", category: "WHEEL LOADERS", title: "2023 CAT 950GC", img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800', description: defaultDescription, specs: [{label: "Class", value: "Medium"}], features: defaultFeatures },
  { id: "15891550", make: "CAT", model: "966", year: 2024, meter: "2574", price: "$472,605", city: "Fort Worth", state: "TX", category: "WHEEL LOADERS", title: "2024 CAT 966", img: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=800', description: defaultDescription, specs: [{label: "Class", value: "Medium"}], features: defaultFeatures },
  { id: "19861425", make: "CAT", model: "980", year: 2023, meter: "2001", price: "$671,999", city: "Sulphur Springs", state: "TX", category: "WHEEL LOADERS", title: "2023 CAT 980", img: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=800', description: defaultDescription, specs: [{label: "Class", value: "Large"}], features: defaultFeatures },
  { id: "21789650", make: "CAT", model: "982M", year: 2019, meter: "14447", price: "$189,750", city: "Pikeville", state: "KY", category: "WHEEL LOADERS", title: "2019 CAT 982M", img: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=800', description: defaultDescription, specs: [{label: "Class", value: "Large"}], features: defaultFeatures },
  { id: "24285000", make: "CAT", model: "992K", year: 2010, meter: "19800", price: "$682,500", city: "San Antonio", state: "TX", category: "WHEEL LOADERS", title: "2010 CAT 992K", img: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=800', description: defaultDescription, specs: [{label: "Class", value: "Mining"}], features: defaultFeatures },
];

export const EQUIPMENT_CATEGORIES = [
  { name: 'EXCAVATORS', icon: 'fa-trowel', img: 'https://images.unsplash.com/photo-1580901368919-7738efb0f87e?q=80&w=800', description: 'Precision earthmoving for utility, construction, and mining.' },
  { name: 'WHEEL LOADERS', icon: 'fa-truck-front', img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800', description: 'High-capacity material handling for any terrain.' },
  { name: 'DOZERS', icon: 'fa-tractor', img: 'https://images.unsplash.com/photo-1579361655073-45f8f972b9a7?q=80&w=800', description: 'Extreme pushing power for site prep and heavy grading.' },
  { name: 'ARTICULATED TRUCKS', icon: 'fa-truck-moving', img: 'https://images.unsplash.com/photo-1590684277732-22530d9796e6?q=80&w=800', description: 'Off-road haulers for extreme environments and heavy loads.' },
  { name: 'OFF-HIGHWAY TRUCKS', icon: 'fa-truck-monster', img: 'https://images.unsplash.com/photo-1584433144859-1fc3ab84a9ec?q=80&w=800', description: 'Large-scale mining and quarry haul trucks.' },
  { name: 'MOTOR GRADERS', icon: 'fa-road', img: 'https://images.unsplash.com/photo-1578500484694-825593874051?q=80&w=800', description: 'Precision grading for road construction and maintenance.' },
  { name: 'SKID STEERS', icon: 'fa-car-side', img: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?q=80&w=800', description: 'Compact wheeled loaders for versatile job site utility.' },
  { name: 'TRACK LOADERS', icon: 'fa-bars-staggered', img: 'https://images.unsplash.com/photo-1586191582151-f7463238779d?q=80&w=800', description: 'High-traction loading for soft ground and steep slopes.' },
  { name: 'BACKHOE LOADERS', icon: 'fa-person-digging', img: 'https://images.unsplash.com/photo-1627233433833-58b1f54a85a4?q=80&w=800', description: 'The ultimate versatile machine for digging and loading.' },
  { name: 'TELEHANDLERS', icon: 'fa-up-down-left-right', img: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=800', description: 'Versatile reach and lift solutions for job site logistics.' },
  { name: 'PAVERS', icon: 'fa-layer-group', img: 'https://images.unsplash.com/photo-1578991624414-276ef23a534f?q=80&w=800', description: 'Pavement laying machinery for infrastructure projects.' },
  { name: 'COMPACTORS', icon: 'fa-weight-hanging', img: 'https://images.unsplash.com/photo-1621905252507-b354bcadcabc?q=80&w=800', description: 'Soil and asphalt compaction for structural stability.' },
  { name: 'MISC / ATTACHMENTS', icon: 'fa-paperclip', img: 'https://images.unsplash.com/photo-1568249764632-413809228169?q=80&w=800', description: 'A diverse range of attachments and support equipment.' }
];

export const PARTS_CATEGORIES = [
  { name: 'HYDRAULICS', icon: 'fa-water' },
  { name: 'ENGINE', icon: 'fa-engine' },
  { name: 'DRIVETRAIN', icon: 'fa-gears' },
  { name: 'UNDERCARRIAGE', icon: 'fa-bars-staggered' },
  { name: 'ELECTRICAL', icon: 'fa-bolt' }
];
