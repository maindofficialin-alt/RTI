"use client";

import { motion } from "framer-motion";
import { Info } from "lucide-react";

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center bg-white p-12 rounded-3xl shadow-sm border border-gray-100"
      >
        <div className="h-20 w-20 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-8">
          <Info className="h-10 w-10" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-600 mb-8">
          This section is currently under development as part of the Telangana RTI Portal upgrade. Please check back soon for the full feature.
        </p>
        <button 
          onClick={() => window.history.back()}
          className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-light transition-all shadow-lg shadow-primary/20"
        >
          Go Back
        </button>
      </motion.div>
    </div>
  );
}
