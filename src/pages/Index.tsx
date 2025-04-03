
import React from 'react';
import { Leaf } from "lucide-react";
import PredictionForm from '@/components/PredictionForm';

const Index = () => {
  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white">
      <header className="bg-[#222] py-3 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Leaf className="h-5 w-5" />
              <h1 className="text-lg font-medium">Crop Fertilizer Predictor</h1>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-sm hover:underline">Home</a>
              <a href="#" className="text-sm hover:underline">About</a>
              <div className="text-sm">
                <span className="cursor-pointer">Language</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <Leaf className="h-8 w-8 text-green-500 mr-2" />
            <h2 className="text-3xl font-bold">Crop Fertilizer Predictor</h2>
          </div>
          <p className="text-lg max-w-3xl mx-auto text-gray-300">
            Enter your crop and soil data to get personalized fertilizer recommendations.
          </p>
        </section>

        <PredictionForm />
      </main>

      <footer className="bg-[#222] text-white py-4 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Crop Fertilizer Predictor. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
