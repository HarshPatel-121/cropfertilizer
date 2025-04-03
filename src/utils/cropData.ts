
export type Crop = {
  id: string;
  name: string;
  image: string;
  description: string;
  nitrogenNeeds: 'low' | 'medium' | 'high';
  phosphorusNeeds: 'low' | 'medium' | 'high';
  potassiumNeeds: 'low' | 'medium' | 'high';
  phPreference: {
    min: number;
    max: number;
  };
};

export type SoilType = 'clay' | 'sandy' | 'loamy' | 'silty' | 'peaty' | 'chalky';

export const crops: Crop[] = [
  {
    id: 'corn',
    name: 'Corn',
    image: '/placeholder.svg',
    description: 'A staple grain crop that requires rich, fertile soil and plenty of nutrients.',
    nitrogenNeeds: 'high',
    phosphorusNeeds: 'medium',
    potassiumNeeds: 'medium',
    phPreference: {
      min: 5.8,
      max: 7.0,
    },
  },
  {
    id: 'wheat',
    name: 'Wheat',
    image: '/placeholder.svg',
    description: 'A cereal grain that is a worldwide staple food and adapts to many soil conditions.',
    nitrogenNeeds: 'medium',
    phosphorusNeeds: 'medium',
    potassiumNeeds: 'low',
    phPreference: {
      min: 6.0,
      max: 7.5,
    },
  },
  {
    id: 'rice',
    name: 'Rice',
    image: '/placeholder.svg',
    description: 'A cereal grain most commonly grown in flooded fields and requires specific conditions.',
    nitrogenNeeds: 'high',
    phosphorusNeeds: 'medium',
    potassiumNeeds: 'medium',
    phPreference: {
      min: 5.5,
      max: 6.5,
    },
  },
  {
    id: 'tomato',
    name: 'Tomato',
    image: '/placeholder.svg',
    description: 'A fruit commonly used as a vegetable in cooking, requiring regular feeding for best production.',
    nitrogenNeeds: 'medium',
    phosphorusNeeds: 'high',
    potassiumNeeds: 'high',
    phPreference: {
      min: 6.0,
      max: 6.8,
    },
  },
  {
    id: 'potato',
    name: 'Potato',
    image: '/placeholder.svg',
    description: 'A starchy tuber that prefers loose, well-drained soil with moderate fertility.',
    nitrogenNeeds: 'medium',
    phosphorusNeeds: 'high',
    potassiumNeeds: 'high',
    phPreference: {
      min: 5.0,
      max: 6.5,
    },
  },
  {
    id: 'soybean',
    name: 'Soybean',
    image: '/placeholder.svg',
    description: 'A legume that can fix nitrogen from the air, reducing nitrogen fertilizer needs.',
    nitrogenNeeds: 'low',
    phosphorusNeeds: 'medium',
    potassiumNeeds: 'medium',
    phPreference: {
      min: 6.0,
      max: 7.0,
    },
  }
];

export const getFertilizerRecommendation = (
  cropId: string,
  soilType: SoilType,
  soilPh: number,
  organicMatter: number
) => {
  const crop = crops.find(c => c.id === cropId);
  if (!crop) {
    return {
      nitrogen: 0,
      phosphorus: 0,
      potassium: 0,
      lime: false,
      sulfur: false,
      message: "Crop not found in database."
    };
  }

  // Base values (kg/hectare)
  let nitrogen = 0;
  let phosphorus = 0;
  let potassium = 0;
  let lime = false;
  let sulfur = false;
  
  // Adjust based on crop needs
  switch (crop.nitrogenNeeds) {
    case 'low': nitrogen = 50; break;
    case 'medium': nitrogen = 100; break;
    case 'high': nitrogen = 150; break;
  }
  
  switch (crop.phosphorusNeeds) {
    case 'low': phosphorus = 30; break;
    case 'medium': phosphorus = 60; break;
    case 'high': phosphorus = 90; break;
  }
  
  switch (crop.potassiumNeeds) {
    case 'low': potassium = 40; break;
    case 'medium': potassium = 80; break;
    case 'high': potassium = 120; break;
  }
  
  // Adjust for soil type
  switch (soilType) {
    case 'sandy':
      nitrogen *= 1.2; // Sandy soils don't hold nutrients well
      phosphorus *= 1.1;
      potassium *= 1.3;
      break;
    case 'clay':
      nitrogen *= 0.9; // Clay holds nutrients better
      phosphorus *= 1.2; // But can bind phosphorus
      potassium *= 0.8;
      break;
    case 'loamy':
      // Ideal soil, no adjustments needed
      break;
    case 'silty':
      nitrogen *= 0.95;
      phosphorus *= 1.05;
      potassium *= 0.9;
      break;
    case 'peaty':
      nitrogen *= 0.7; // Peaty soils are high in organic matter
      phosphorus *= 1.3;
      potassium *= 1.2;
      break;
    case 'chalky':
      nitrogen *= 1.1;
      phosphorus *= 1.3; // Chalky soils can bind phosphorus
      potassium *= 1.1;
      sulfur = true; // Often needed in chalky soils
      break;
  }
  
  // Adjust for pH
  if (soilPh < crop.phPreference.min) {
    lime = true;
    phosphorus *= 1.2; // Phosphorus less available in acidic soils
  } else if (soilPh > crop.phPreference.max) {
    sulfur = true;
    // Micronutrients less available in alkaline soils
  }
  
  // Adjust for organic matter
  if (organicMatter > 3) {
    nitrogen *= 0.8; // High organic matter provides nitrogen
  } else if (organicMatter < 2) {
    nitrogen *= 1.2; // Low organic matter needs more nitrogen
  }
  
  // Round to whole numbers
  nitrogen = Math.round(nitrogen);
  phosphorus = Math.round(phosphorus);
  potassium = Math.round(potassium);
  
  let message = `Based on your crop (${crop.name}) and soil conditions, we recommend the following:`;
  
  return {
    nitrogen,
    phosphorus,
    potassium,
    lime,
    sulfur,
    message
  };
};
