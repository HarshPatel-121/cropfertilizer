
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { crops, getFertilizerRecommendation, type SoilType } from "@/utils/cropData";
import CropInfoCard from "./CropInfoCard";
import ResultDisplay from "./ResultDisplay";

const PredictionForm: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState("");
  const [soilType, setSoilType] = useState<SoilType>("loamy");
  const [soilPh, setSoilPh] = useState(7.0);
  const [organicMatter, setOrganicMatter] = useState(2.5);
  const [result, setResult] = useState<ReturnType<typeof getFertilizerRecommendation> | null>(null);
  
  const handlePredict = () => {
    if (!selectedCrop) return;
    
    const prediction = getFertilizerRecommendation(
      selectedCrop,
      soilType,
      soilPh,
      organicMatter
    );
    
    setResult(prediction);
  };
  
  const selectedCropName = crops.find(c => c.id === selectedCrop)?.name || "";
  
  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div>
                <h2 className="text-xl font-semibold mb-4">Select Your Crop</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {crops.map(crop => (
                    <CropInfoCard
                      key={crop.id}
                      crop={crop}
                      onClick={() => setSelectedCrop(crop.id)}
                      isSelected={selectedCrop === crop.id}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Soil Parameters</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="soilType">Soil Type</Label>
                  <Select 
                    value={soilType} 
                    onValueChange={(value) => setSoilType(value as SoilType)}
                  >
                    <SelectTrigger id="soilType">
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clay">Clay Soil</SelectItem>
                      <SelectItem value="sandy">Sandy Soil</SelectItem>
                      <SelectItem value="loamy">Loamy Soil</SelectItem>
                      <SelectItem value="silty">Silty Soil</SelectItem>
                      <SelectItem value="peaty">Peaty Soil</SelectItem>
                      <SelectItem value="chalky">Chalky Soil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="soilPh">Soil pH</Label>
                    <span className="text-sm font-medium">{soilPh.toFixed(1)}</span>
                  </div>
                  <Slider
                    id="soilPh"
                    min={4.0}
                    max={9.0}
                    step={0.1}
                    value={[soilPh]}
                    onValueChange={(value) => setSoilPh(value[0])}
                    className="my-4"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Acidic (4.0)</span>
                    <span>Neutral (7.0)</span>
                    <span>Alkaline (9.0)</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="organicMatter">Organic Matter (%)</Label>
                    <span className="text-sm font-medium">{organicMatter.toFixed(1)}%</span>
                  </div>
                  <Slider
                    id="organicMatter"
                    min={0.5}
                    max={10.0}
                    step={0.1}
                    value={[organicMatter]}
                    onValueChange={(value) => setOrganicMatter(value[0])}
                    className="my-4"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Low (0.5%)</span>
                    <span>Medium (5%)</span>
                    <span>High (10%)</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-forest hover:bg-forest-dark"
                  disabled={!selectedCrop}
                  onClick={handlePredict}
                >
                  Generate Fertilizer Recommendation
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {result && (
        <ResultDisplay result={result} cropName={selectedCropName} />
      )}
    </div>
  );
};

export default PredictionForm;
