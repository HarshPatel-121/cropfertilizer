
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartBar, Leaf, Info, Calendar } from "lucide-react";

interface ResultDisplayProps {
  result: {
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    lime: boolean;
    sulfur: boolean;
    message: string;
  } | null;
  cropName: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, cropName }) => {
  if (!result) return null;
  
  // Make sure values are positive
  const nitrogen = Math.max(0, result.nitrogen);
  const phosphorus = Math.max(0, result.phosphorus);
  const potassium = Math.max(0, result.potassium);
  
  const maxValue = Math.max(nitrogen, phosphorus, potassium);
  
  // Calculate NPK ratio (simplified to whole numbers where possible)
  const gcd = (a: number, b: number): number => b ? gcd(b, a % b) : a;
  const findGCD = (nums: number[]): number => {
    let result = nums[0];
    for (let i = 1; i < nums.length; i++) {
      result = gcd(result, nums[i]);
    }
    return result || 1; // Prevent division by zero
  };
  
  const npkValues = [nitrogen, phosphorus, potassium];
  const divisor = findGCD(npkValues);
  const npkRatio = npkValues.map(val => val / divisor);
  
  // Generate application schedule based on crop needs
  const getApplicationSchedule = () => {
    const highNitrogen = nitrogen > 100;
    const highPhosphorus = phosphorus > 80;
    const highPotassium = potassium > 100;
    
    if (highNitrogen && highPhosphorus && highPotassium) {
      return "Apply in three split applications: 40% at planting, 30% during vegetative growth, and 30% during reproductive stage.";
    } else if (highNitrogen) {
      return "Apply nitrogen in multiple small applications throughout the growing season to prevent leaching.";
    } else if (highPhosphorus) {
      return "Apply phosphorus at planting time as it's less mobile in soil and needed early for root development.";
    } else if (highPotassium) {
      return "Apply potassium in two applications: 50% at planting and 50% during the mid-growth stage.";
    } else {
      return "Apply complete fertilizer in two applications: 60% at planting and 40% during mid-season.";
    }
  };
  
  return (
    <Card className="w-full h-full bg-[#222] border-gray-700">
      <CardHeader className="bg-[#1A1F2C] text-white rounded-t-lg pt-4 pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center">
            <Leaf className="mr-2 h-4 w-4 text-green-500" />
            Fertilizer for {cropName}
          </CardTitle>
        </div>
        <CardDescription className="text-gray-300">
          {result.message}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-[#1A1F2C] p-3">
              <h3 className="font-medium text-gray-300 mb-2 text-sm">Nitrogen (N)</h3>
              <div className="flex items-end gap-2">
                <div className="relative w-full h-10 bg-gray-800 rounded-sm overflow-hidden">
                  <div 
                    className="absolute bottom-0 left-0 w-full bg-blue-600 transition-all duration-500"
                    style={{ height: `${(nitrogen / maxValue) * 100}%` }}
                  ></div>
                </div>
                <span className="text-lg font-bold">{nitrogen}</span>
                <span className="text-gray-400 text-xs">kg/ha</span>
              </div>
            </div>
            
            <div className="rounded-lg bg-[#1A1F2C] p-3">
              <h3 className="font-medium text-gray-300 mb-2 text-sm">Phosphorus (P)</h3>
              <div className="flex items-end gap-2">
                <div className="relative w-full h-10 bg-gray-800 rounded-sm overflow-hidden">
                  <div 
                    className="absolute bottom-0 left-0 w-full bg-amber-600 transition-all duration-500"
                    style={{ height: `${(phosphorus / maxValue) * 100}%` }}
                  ></div>
                </div>
                <span className="text-lg font-bold">{phosphorus}</span>
                <span className="text-gray-400 text-xs">kg/ha</span>
              </div>
            </div>
            
            <div className="rounded-lg bg-[#1A1F2C] p-3">
              <h3 className="font-medium text-gray-300 mb-2 text-sm">Potassium (K)</h3>
              <div className="flex items-end gap-2">
                <div className="relative w-full h-10 bg-gray-800 rounded-sm overflow-hidden">
                  <div 
                    className="absolute bottom-0 left-0 w-full bg-purple-600 transition-all duration-500"
                    style={{ height: `${(potassium / maxValue) * 100}%` }}
                  ></div>
                </div>
                <span className="text-lg font-bold">{potassium}</span>
                <span className="text-gray-400 text-xs">kg/ha</span>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-[#1A1F2C] border border-gray-700 rounded-lg">
            <div className="flex items-center">
              <Info className="h-4 w-4 text-green-500 mr-2" />
              <h3 className="font-medium text-gray-200 text-sm">NPK Ratio</h3>
            </div>
            <p className="mt-2 text-gray-300 text-sm">
              Recommended N-P-K ratio: {npkRatio.map(n => n.toFixed(1)).join(':')}
            </p>
            <p className="mt-1 text-gray-400 text-xs">
              Total nutrients needed: {nitrogen + phosphorus + potassium} kg/ha
            </p>
          </div>
          
          {(result.lime || result.sulfur) && (
            <div className="p-3 bg-[#1A1F2C] border border-gray-700 rounded-lg">
              <h3 className="font-medium text-yellow-500 mb-2 text-sm">Soil Amendments:</h3>
              <ul className="space-y-1 text-xs text-gray-300">
                {result.lime && (
                  <li>
                    Apply lime to increase soil pH (2-3 tons/ha)
                  </li>
                )}
                {result.sulfur && (
                  <li>
                    Apply sulfur to decrease soil pH (500-1000 kg/ha)
                  </li>
                )}
              </ul>
            </div>
          )}
          
          <div className="p-3 bg-[#1A1F2C] border border-gray-700 rounded-lg">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-green-500 mr-2" />
              <h3 className="font-medium text-gray-200 text-sm">Application Schedule</h3>
            </div>
            <p className="mt-2 text-gray-300 text-xs">
              {getApplicationSchedule()}
            </p>
          </div>
          
          <div className="p-3 bg-[#1A1F2C] border border-gray-700 rounded-lg">
            <div className="flex items-center">
              <ChartBar className="h-4 w-4 text-green-500 mr-2" />
              <h3 className="font-medium text-gray-200 text-sm">Best Practices</h3>
            </div>
            <div className="mt-2 space-y-1 text-xs text-gray-300">
              <p>• Test soil before growing season for planning</p>
              <p>• Apply when soil moisture is adequate</p>
              <p>• Incorporate into soil to prevent runoff</p>
              <p>• Consider organic supplements alongside chemicals</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultDisplay;
