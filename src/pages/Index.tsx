
import React from 'react';
import { Leaf } from "lucide-react";
import PredictionForm from '@/components/PredictionForm';

const Index = () => {
  return (
    <div className="min-h-screen leaf-pattern">
      <header className="bg-forest text-white py-6 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8" />
              <h1 className="text-2xl md:text-3xl font-bold">HarvestHelper</h1>
            </div>
            <div className="text-sm md:text-base">Precision Fertilizer Predictor</div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-forest">Optimize Your Crop Yields</h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-700">
            Get precise fertilizer recommendations based on your crop type, soil conditions, and environmental factors.
            Our advanced algorithm helps you maximize yields while minimizing waste and environmental impact.
          </p>
        </section>

        <section className="mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-forest-light/10 rounded-lg p-4 flex flex-col items-center text-center">
                <div className="bg-forest text-white rounded-full p-3 mb-4">1</div>
                <h3 className="font-semibold text-lg mb-2">Select Your Crop</h3>
                <p className="text-gray-600">Choose from our database of common crops with specific nutrient requirements.</p>
              </div>
              
              <div className="bg-forest-light/10 rounded-lg p-4 flex flex-col items-center text-center">
                <div className="bg-forest text-white rounded-full p-3 mb-4">2</div>
                <h3 className="font-semibold text-lg mb-2">Enter Soil Data</h3>
                <p className="text-gray-600">Provide details about your soil type, pH level, and organic matter content.</p>
              </div>
              
              <div className="bg-forest-light/10 rounded-lg p-4 flex flex-col items-center text-center">
                <div className="bg-forest text-white rounded-full p-3 mb-4">3</div>
                <h3 className="font-semibold text-lg mb-2">Get Recommendations</h3>
                <p className="text-gray-600">Receive customized NPK fertilizer recommendations for optimal growth.</p>
              </div>
            </div>
          </div>
          
          <PredictionForm />
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-center text-forest">Why Use Precision Fertilizer Predictions?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-xl mb-3 text-forest">Maximize Crop Yields</h3>
              <p className="text-gray-700">
                Applying the right fertilizer in the right amounts ensures your crops get exactly what they need 
                for optimal growth. This precision approach can significantly increase your yields.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-xl mb-3 text-forest">Reduce Environmental Impact</h3>
              <p className="text-gray-700">
                Over-fertilization can lead to nutrient runoff, polluting waterways and causing environmental damage. 
                Our precise recommendations help minimize waste and environmental harm.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-xl mb-3 text-forest">Lower Costs</h3>
              <p className="text-gray-700">
                By applying only the nutrients your crops need, you avoid wasting money on excess fertilizer. 
                This precision approach optimizes your investment and improves profitability.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-xl mb-3 text-forest">Sustainable Farming</h3>
              <p className="text-gray-700">
                Precision fertilization is a key component of sustainable agriculture. It helps maintain soil health 
                and fertility over the long term while reducing dependency on chemical inputs.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Leaf className="h-6 w-6" />
              <h2 className="text-xl font-bold">HarvestHelper</h2>
            </div>
            <div className="text-gray-300 text-sm">
              © {new Date().getFullYear()} HarvestHelper. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
