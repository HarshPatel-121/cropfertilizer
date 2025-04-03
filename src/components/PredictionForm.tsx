
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calculator, FileInput } from "lucide-react";
import { crops, type SoilType } from "@/utils/cropData";
import ResultDisplay from "./ResultDisplay";
import { toast } from "@/hooks/use-toast";

const PredictionForm: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState("");
  const [soilType, setSoilType] = useState<SoilType>("loamy");
  const [soilPh, setSoilPh] = useState<string>("6.5");
  const [nitrogenLevel, setNitrogenLevel] = useState<string>("40");
  const [phosphorusLevel, setPhosphorusLevel] = useState<string>("30");
  const [potassiumLevel, setPotassiumLevel] = useState<string>("30");
  const [showResults, setShowResults] = useState(false);
  
  const handlePredict = () => {
    if (!selectedCrop) {
      toast({
        title: "No crop selected",
        description: "Please select a crop first to get fertilizer recommendations.",
        variant: "destructive"
      });
      return;
    }
    
    setShowResults(true);
    
    toast({
      title: "Recommendation generated",
      description: `Fertilizer recommendation for ${crops.find(c => c.id === selectedCrop)?.name} has been calculated.`,
    });
  };
  
  const selectedCropName = crops.find(c => c.id === selectedCrop)?.name || "";
  
  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card className="w-full bg-[#222] border-gray-700">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <FileInput className="h-5 w-5 mr-2" />
                  <h2 className="text-xl font-semibold">Input Your Data</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="cropType" className="text-gray-300">Crop Type *</Label>
                    <Select 
                      value={selectedCrop} 
                      onValueChange={setSelectedCrop}
                    >
                      <SelectTrigger id="cropType" className="bg-[#1A1F2C] border-gray-700">
                        <SelectValue placeholder="Select Crop" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#222] border-gray-700">
                        {crops.map(crop => (
                          <SelectItem key={crop.id} value={crop.id}>{crop.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="soilType" className="text-gray-300">Soil Type *</Label>
                    <Select 
                      value={soilType} 
                      onValueChange={(value) => setSoilType(value as SoilType)}
                    >
                      <SelectTrigger id="soilType" className="bg-[#1A1F2C] border-gray-700">
                        <SelectValue placeholder="Select Soil Type" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#222] border-gray-700">
                        <SelectItem value="clay">Clay Soil</SelectItem>
                        <SelectItem value="sandy">Sandy Soil</SelectItem>
                        <SelectItem value="loamy">Loamy Soil</SelectItem>
                        <SelectItem value="silty">Silty Soil</SelectItem>
                        <SelectItem value="peaty">Peaty Soil</SelectItem>
                        <SelectItem value="chalky">Chalky Soil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <h3 className="text-md font-medium">Soil Properties</h3>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <Label htmlFor="soilPh" className="text-gray-300">pH Level (0-14)</Label>
                    </div>
                    <Input
                      id="soilPh"
                      type="number"
                      className="bg-[#1A1F2C] border-gray-700"
                      value={soilPh}
                      onChange={(e) => setSoilPh(e.target.value)}
                      min="0"
                      max="14"
                      step="0.1"
                    />
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <Label htmlFor="nitrogen" className="text-gray-300">Nitrogen (mg/kg)</Label>
                    </div>
                    <Input
                      id="nitrogen"
                      type="number"
                      className="bg-[#1A1F2C] border-gray-700"
                      value={nitrogenLevel}
                      onChange={(e) => setNitrogenLevel(e.target.value)}
                      min="0"
                      step="1"
                    />
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <Label htmlFor="phosphorus" className="text-gray-300">Phosphorus (mg/kg)</Label>
                    </div>
                    <Input
                      id="phosphorus"
                      type="number"
                      className="bg-[#1A1F2C] border-gray-700"
                      value={phosphorusLevel}
                      onChange={(e) => setPhosphorusLevel(e.target.value)}
                      min="0"
                      step="1"
                    />
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between">
                      <Label htmlFor="potassium" className="text-gray-300">Potassium (mg/kg)</Label>
                    </div>
                    <Input
                      id="potassium"
                      type="number"
                      className="bg-[#1A1F2C] border-gray-700"
                      value={potassiumLevel}
                      onChange={(e) => setPotassiumLevel(e.target.value)}
                      min="0"
                      step="1"
                    />
                  </div>
                  
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={!selectedCrop}
                    onClick={handlePredict}
                  >
                    Generate Fertilizer Recommendation
                  </Button>
                </div>
              </div>
            </div>
            
            <div>
              {!showResults ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Calculator className="h-16 w-16 text-gray-500 mb-4" />
                  <h3 className="text-xl font-medium mb-2">Awaiting Your Input</h3>
                  <p className="text-gray-400">
                    Fill out the form with your crop and soil data to get personalized 
                    fertilizer recommendations.
                  </p>
                </div>
              ) : (
                <ResultDisplay 
                  result={{
                    nitrogen: 120 - parseInt(nitrogenLevel), 
                    phosphorus: 80 - parseInt(phosphorusLevel), 
                    potassium: 100 - parseInt(potassiumLevel),
                    lime: parseFloat(soilPh) < 6.0,
                    sulfur: parseFloat(soilPh) > 7.5,
                    message: `Based on your crop (${selectedCropName}) and soil conditions, we recommend the following:`
                  }} 
                  cropName={selectedCropName} 
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictionForm;
