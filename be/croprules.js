export const cropRules = [
  {
    crop: "Wheat",
    soil: ["Loamy", "Clay"],
    water: "Medium",
    season: "Rabi",
    avgYield: 18,
    marketDemand: "High",
    riskFactor: "Unseasonal rain at harvesting",
    intercropping: ["Mustard", "Gram"],
    proTip: "Use Late Sown varieties if planting after Dec 15 to avoid heat stress.",
    fertilizers: [
      { name: "DAP", quantity: "55 kg/acre", when: "Basal dose at sowing" },
      { name: "Urea", quantity: "40 kg/acre", when: "First irrigation (CRI stage, 21-25 DAS)" },
      { name: "Urea", quantity: "40 kg/acre", when: "Second node stage (55-60 DAS)" }
    ],
    cultivationGuide: [
      { step: "Seed Selection", details: "Choose certified seeds like HD-2967, PBW-343. Treat seeds with Carboxin + Thiram before sowing." },
      { step: "Land Preparation", details: "Plough the field 2-3 times. Ensure fine tilth. Laser land leveling is recommended." },
      { step: "Sowing", details: "Maintain a row-to-row spacing of 20-22 cm. Seed depth should be 4-5 cm." },
      { step: "Irrigation", details: "Provide 4-6 irrigations. The Crown Root Initiation (CRI) stage (21 days) is highly critical." },
      { step: "Precautions", details: "Monitor for yellow rust. Spray Propiconazole if symptoms appear." }
    ],
    shoppingLinks: [
      { type: "Seeds", name: "Premium Wheat Seeds", url: "https://www.agribazaar.com" },
      { type: "Fertilizer", name: "DAP & Urea", url: "https://www.iffcobazar.in" },
      { type: "Equipment", name: "Tractors & Implements", url: "https://www.mahindratractor.com" },
      { type: "Equipment", name: "Combine Harvester", url: "https://www.indiamart.com/proddetail/wheat-harvester.html" }
    ]
  },
  {
    crop: "Paddy",
    soil: ["Clay", "Black Soil"],
    water: "High",
    season: "Kharif",
    avgYield: 22,
    marketDemand: "Is always stable",
    riskFactor: "Water stagnation > 10 days",
    intercropping: ["Fish (Rice-Fish Farming)", "Azolla"],
    proTip: "Incorporate Green Manure (Dhaincha) 10 days before transplanting to save 20% Urea.",
    fertilizers: [
      { name: "DAP", quantity: "35 kg/acre", when: "Basal dose before transplanting" },
      { name: "Urea", quantity: "30 kg/acre", when: "Active tillering (25-30 DAT)" },
      { name: "Zinc Sulfate", quantity: "10 kg/acre", when: "Basal dose to prevent Khaira disease" },
      { name: "Urea", quantity: "30 kg/acre", when: "Panicle initiation (50-55 DAT)" }
    ],
    cultivationGuide: [
      { step: "Nursery Preparation", details: "Prepare raised beds and sow seeds 25-30 days before transplanting." },
      { step: "Land Preparation", details: "Puddle the field to reduce water percolation and control weeds." },
      { step: "Transplanting", details: "Transplant 2-3 seedlings per hill at a spacing of 20x15 cm." },
      { step: "Water Management", details: "Maintain 2-5 cm of standing water during early growth and panicle initiation." },
      { step: "Precautions", details: "Watch out for stem borer. Apply Cartap Hydrochloride if threshold is crossed." }
    ],
    shoppingLinks: [
      { type: "Seeds", name: "Hybrid Paddy Seeds", url: "https://www.agribazaar.com" },
      { type: "Fertilizer", name: "Zinc & Urea", url: "https://www.iffcobazar.in" },
      { type: "Equipment", name: "Paddy Transplanter", url: "https://www.mahindratractor.com" }
    ]
  },
  {
    crop: "Maize",
    soil: ["Sandy", "Loamy"],
    water: "Medium",
    season: "Kharif",
    avgYield: 20,
    marketDemand: "Increasing (Poultry feed)",
    riskFactor: "Water logging (Very Sensitive)",
    intercropping: ["Soybean", "Cowpea"],
    proTip: "Effective weed management in first 40 days is critical. Use Atrazine.",
    fertilizers: [
      { name: "NPK (12:32:16)", quantity: "50 kg/acre", when: "Basal dose at sowing" },
      { name: "Urea", quantity: "25 kg/acre", when: "Knee high stage (30-35 DAS)" },
      { name: "Urea", quantity: "25 kg/acre", when: "Tasseling stage (55-60 DAS)" }
    ],
    cultivationGuide: [
      { step: "Seed Selection", details: "Use high-yielding hybrids. Ensure proper seed treatment with fungicides." },
      { step: "Land Preparation", details: "Prepare field with one deep ploughing followed by 2-3 harrowing." },
      { step: "Sowing", details: "Sow on ridges to avoid waterlogging. Maintain 60x20 cm spacing." },
      { step: "Weed Control", details: "Apply pre-emergence herbicide like Atrazine within 2 days of sowing." },
      { step: "Precautions", details: "Highly sensitive to waterlogging. Ensure proper drainage in the field." }
    ],
    shoppingLinks: [
      { type: "Seeds", name: "Hybrid Maize Seeds", url: "https://www.agribazaar.com" },
      { type: "Fertilizer", name: "NPK & Urea", url: "https://www.iffcobazar.in" },
      { type: "Equipment", name: "Maize Planter", url: "https://www.indiamart.com" }
    ]
  },
  {
    crop: "Cotton",
    soil: ["Black Soil"],
    water: "Low",
    season: "Kharif",
    avgYield: 10,
    marketDemand: "High (Export potential)",
    riskFactor: "Pink Bollworm infestation",
    intercropping: ["Green Gram", "Black Gram"],
    proTip: "Install 5 Pheromone traps/acre at 45 days to monitor Pink Bollworm activity.",
    fertilizers: [
      { name: "DAP", quantity: "50 kg/acre", when: "Basal dose at sowing" },
      { name: "Urea", quantity: "45 kg/acre", when: "Square formation (45-50 DAS)" },
      { name: "MOP (Potash)", quantity: "30 kg/acre", when: "Peak flowering (70-75 DAS)" }
    ],
    cultivationGuide: [
      { step: "Seed Selection", details: "Select Bt cotton hybrids resistant to bollworms. Treat seeds with Imidacloprid." },
      { step: "Land Preparation", details: "Deep ploughing is essential for root development. Prepare ridges and furrows." },
      { step: "Sowing", details: "Maintain optimal spacing (e.g., 90x60 cm) for better aeration and light." },
      { step: "Pest Management", details: "Install pheromone traps early. Monitor closely for sucking pests." },
      { step: "Precautions", details: "Avoid moisture stress during squaring and flowering stages." }
    ],
    shoppingLinks: [
      { type: "Seeds", name: "Bt Cotton Seeds", url: "https://www.agribazaar.com" },
      { type: "Fertilizer", name: "Potash & Urea", url: "https://www.iffcobazar.in" },
      { type: "Equipment", name: "Pesticide Sprayers", url: "https://www.indiamart.com" }
    ]
  }
];
