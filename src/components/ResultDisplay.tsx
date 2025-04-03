
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
  
  const maxValue = Math.max(result.nitrogen, result.phosphorus, result.potassium);
  
  // Calculate NPK ratio (simplified to whole numbers where possible)
  const gcd = (a: number, b: number): number => b ? gcd(b, a % b) : a;
  const findGCD = (nums: number[]): number => {
    let result = nums[0];
    for (let i = 1; i < nums.length; i++) {
      result = gcd(result, nums[i]);
    }
    return result;
  };
  
  const npkValues = [result.nitrogen, result.phosphorus, result.potassium];
  const divisor = findGCD(npkValues);
  const npkRatio = npkValues.map(val => val / divisor);
  
  // Generate application schedule based on crop needs
  const getApplicationSchedule = () => {
    const highNitrogen = result.nitrogen > 100;
    const highPhosphorus = result.phosphorus > 80;
    const highPotassium = result.potassium > 100;
    
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
    <Card className="w-full mt-6">
      <CardHeader className="bg-forest text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center">
            <Leaf className="mr-2 h-5 w-5" />
            Fertilizer Recommendation for {cropName}
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
              <p className="mt-2 text-sm text-gray-600">
                Essential for leaf and stem growth. Deficiency causes yellowing of older leaves.
              </p>
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
              <p className="mt-2 text-sm text-gray-600">
                Vital for root development and flowering. Deficiency causes stunted growth.
              </p>
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
              <p className="mt-2 text-sm text-gray-600">
                Improves crop quality and disease resistance. Deficiency appears as scorched leaf edges.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <Info className="h-5 w-5 text-forest mr-2" />
              <h3 className="font-medium text-forest">NPK Ratio Information</h3>
            </div>
            <p className="mt-2 text-gray-700">
              For {cropName}, we recommend a fertilizer with an N-P-K ratio of approximately {npkRatio.map(n => n.toFixed(1)).join(':')}. 
              Commercial fertilizers closest to this ratio would be suitable for your crop.
            </p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-md shadow-sm">
                <h4 className="font-medium text-sm text-forest">Total Application</h4>
                <p className="text-sm text-gray-600">
                  Total NPK needed: {result.nitrogen + result.phosphorus + result.potassium} kg/ha
                </p>
              </div>
              <div className="bg-white p-3 rounded-md shadow-sm">
                <h4 className="font-medium text-sm text-forest">Fertilizer Efficiency</h4>
                <p className="text-sm text-gray-600">
                  Consider using slow-release fertilizers for better nutrient utilization.
                </p>
              </div>
            </div>
          </div>
          
          {(result.lime || result.sulfur) && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-medium text-yellow-800 mb-2">Additional Recommendations:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {result.lime && (
                  <li className="text-gray-700">
                    Add lime to increase soil pH for optimal nutrient availability. Apply 2-3 tons/ha of agricultural lime.
                  </li>
                )}
                {result.sulfur && (
                  <li className="text-gray-700">
                    Apply sulfur to decrease soil pH and improve micronutrient availability. Use 500-1000 kg/ha of elemental sulfur.
                  </li>
                )}
              </ul>
            </div>
          )}
          
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-forest mr-2" />
              <h3 className="font-medium text-forest">Application Schedule</h3>
            </div>
            <p className="mt-2 text-gray-700">
              {getApplicationSchedule()}
            </p>
          </div>
          
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <ChartBar className="h-5 w-5 text-forest mr-2" />
              <h3 className="font-medium text-forest">Best Practices</h3>
            </div>
            <div className="mt-2 space-y-2">
              <p className="text-gray-700">
                • Always perform soil testing before the growing season for accurate fertilizer planning.
              </p>
              <p className="text-gray-700">
                • Apply fertilizers when soil moisture is adequate for better uptake.
              </p>
              <p className="text-gray-700">
                • Incorporate fertilizers into the soil to prevent runoff and volatilization.
              </p>
              <p className="text-gray-700">
                • Consider using organic supplements like compost or manure alongside chemical fertilizers.
              </p>
              <p className="text-gray-700">
                • Avoid fertilizer application before heavy rainfall to prevent nutrient leaching.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultDisplay;
