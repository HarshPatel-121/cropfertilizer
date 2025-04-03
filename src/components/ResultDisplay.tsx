
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartBar, Leaf } from "lucide-react";

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
  
  const maxValue = Math.max(result.nitrogen, result.phosphorus, result.potassium);
  
  return (
    <Card className="w-full mt-6">
      <CardHeader className="bg-forest text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center">
            <Leaf className="mr-2 h-5 w-5" />
            Fertilizer Recommendation
          </CardTitle>
        </div>
        <CardDescription className="text-gray-100">
          {result.message}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg bg-muted p-4">
              <h3 className="font-medium text-gray-900 mb-2">Nitrogen (N)</h3>
              <div className="flex items-end gap-2">
                <div className="relative w-full h-16 bg-gray-100 rounded-sm overflow-hidden">
                  <div 
                    className="absolute bottom-0 left-0 w-full bg-blue-500 transition-all duration-500"
                    style={{ height: `${(result.nitrogen / maxValue) * 100}%` }}
                  ></div>
                </div>
                <span className="text-2xl font-bold">{result.nitrogen}</span>
                <span className="text-gray-500 text-sm">kg/ha</span>
              </div>
            </div>
            
            <div className="rounded-lg bg-muted p-4">
              <h3 className="font-medium text-gray-900 mb-2">Phosphorus (P)</h3>
              <div className="flex items-end gap-2">
                <div className="relative w-full h-16 bg-gray-100 rounded-sm overflow-hidden">
                  <div 
                    className="absolute bottom-0 left-0 w-full bg-amber-500 transition-all duration-500"
                    style={{ height: `${(result.phosphorus / maxValue) * 100}%` }}
                  ></div>
                </div>
                <span className="text-2xl font-bold">{result.phosphorus}</span>
                <span className="text-gray-500 text-sm">kg/ha</span>
              </div>
            </div>
            
            <div className="rounded-lg bg-muted p-4">
              <h3 className="font-medium text-gray-900 mb-2">Potassium (K)</h3>
              <div className="flex items-end gap-2">
                <div className="relative w-full h-16 bg-gray-100 rounded-sm overflow-hidden">
                  <div 
                    className="absolute bottom-0 left-0 w-full bg-purple-500 transition-all duration-500"
                    style={{ height: `${(result.potassium / maxValue) * 100}%` }}
                  ></div>
                </div>
                <span className="text-2xl font-bold">{result.potassium}</span>
                <span className="text-gray-500 text-sm">kg/ha</span>
              </div>
            </div>
          </div>
          
          {(result.lime || result.sulfur) && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-medium text-yellow-800 mb-2">Additional Recommendations:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {result.lime && (
                  <li className="text-gray-700">
                    Add lime to increase soil pH for optimal nutrient availability.
                  </li>
                )}
                {result.sulfur && (
                  <li className="text-gray-700">
                    Apply sulfur to decrease soil pH and improve micronutrient availability.
                  </li>
                )}
              </ul>
            </div>
          )}
          
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <ChartBar className="h-5 w-5 text-forest mr-2" />
              <h3 className="font-medium text-forest">Application Guidelines</h3>
            </div>
            <p className="mt-2 text-gray-700">
              For {cropName}, apply NPK fertilizer in the ratio of {result.nitrogen}:{result.phosphorus}:{result.potassium}.
              This recommendation is based on your soil conditions and crop requirements. For best results, split fertilizer
              application throughout the growing season.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultDisplay;
