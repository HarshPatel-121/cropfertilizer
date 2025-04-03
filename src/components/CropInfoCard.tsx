
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type Crop } from "@/utils/cropData";

interface CropInfoCardProps {
  crop: Crop;
  onClick: () => void;
  isSelected: boolean;
}

const CropInfoCard: React.FC<CropInfoCardProps> = ({ crop, onClick, isSelected }) => {
  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'border-2 border-forest shadow-md' : ''
      }`}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{crop.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <img 
            src={crop.image} 
            alt={crop.name} 
            className="w-full h-32 object-cover rounded-md" 
          />
          <CardDescription className="text-sm line-clamp-2 mt-2">
            {crop.description}
          </CardDescription>
          <div className="grid grid-cols-3 gap-1 text-xs mt-1">
            <div className="flex flex-col items-center">
              <span className="font-medium">Nitrogen</span>
              <span className={`
                ${crop.nitrogenNeeds === 'low' ? 'bg-green-100 text-green-800' : ''}
                ${crop.nitrogenNeeds === 'medium' ? 'bg-amber-100 text-amber-800' : ''}
                ${crop.nitrogenNeeds === 'high' ? 'bg-red-100 text-red-800' : ''}
                px-2 py-0.5 rounded-full capitalize
              `}>
                {crop.nitrogenNeeds}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-medium">Phosphorus</span>
              <span className={`
                ${crop.phosphorusNeeds === 'low' ? 'bg-green-100 text-green-800' : ''}
                ${crop.phosphorusNeeds === 'medium' ? 'bg-amber-100 text-amber-800' : ''}
                ${crop.phosphorusNeeds === 'high' ? 'bg-red-100 text-red-800' : ''}
                px-2 py-0.5 rounded-full capitalize
              `}>
                {crop.phosphorusNeeds}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-medium">Potassium</span>
              <span className={`
                ${crop.potassiumNeeds === 'low' ? 'bg-green-100 text-green-800' : ''}
                ${crop.potassiumNeeds === 'medium' ? 'bg-amber-100 text-amber-800' : ''}
                ${crop.potassiumNeeds === 'high' ? 'bg-red-100 text-red-800' : ''}
                px-2 py-0.5 rounded-full capitalize
              `}>
                {crop.potassiumNeeds}
              </span>
            </div>
          </div>
          <div className="text-xs mt-1">
            <span className="font-medium">pH preference:</span> {crop.phPreference.min} - {crop.phPreference.max}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CropInfoCard;
