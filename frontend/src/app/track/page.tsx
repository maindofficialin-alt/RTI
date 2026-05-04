"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, FileCheck, AlertCircle } from "lucide-react";

export default function TrackPage() {
  const [searchId, setSearchId] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (searchId === "TSRTI/2026/001") {
        setResult({
          id: "TSRTI/2026/001",
          status: "PENDING",
          applicant: "John Doe",
          department: "Education",
          submittedAt: "2026-04-15",
          updates: [
            { date: "2026-04-16", msg: "Application received and assigned to PIO." },
            { date: "2026-04-15", msg: "Application submitted online." }
          ]
        });
      } else {
        setResult("NOT_FOUND");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-primary mb-8">Track Your RTI Status</h1>
        
        <form onSubmit={handleSearch} className="mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input 
              type="text" 
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Enter Registration Number (e.g. TSRTI/2026/001)"
              className="w-full pl-12 pr-32 py-5 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-lg"
            />
            <button 
              type="submit"
              disabled={loading}
              className="absolute right-2 top-2 bottom-2 px-6 bg-primary text-white rounded-xl font-bold hover:bg-primary-light transition-all disabled:bg-gray-400"
            >
              {loading ? "Searching..." : "Track"}
            </button>
          </div>
        </form>

        <AnimatePresence mode="wait">
          {result === "NOT_FOUND" && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="p-8 bg-red-50 border border-red-100 rounded-2xl text-red-700 flex flex-col items-center"
            >
              <AlertCircle className="h-10 w-10 mb-2" />
              <p className="font-bold">Registration Number Not Found</p>
              <p className="text-sm">Please check the number and try again.</p>
            </motion.div>
          )}

          {result && result !== "NOT_FOUND" && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-left"
            >
              <div className="flex justify-between items-start mb-8 border-b pb-6">
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">REGISTRATION NO</span>
                  <h3 className="text-xl font-bold text-primary">{result.id}</h3>
                </div>
                <div className={`px-4 py-1.5 rounded-full text-xs font-bold ${result.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                  {result.status}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase">Applicant</span>
                  <p className="font-medium">{result.applicant}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase">Department</span>
                  <p className="font-medium">{result.department}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase">Submitted On</span>
                  <p className="font-medium">{result.submittedAt}</p>
                </div>
              </div>

              <h4 className="font-bold mb-4 text-sm uppercase text-gray-500">Timeline</h4>
              <div className="space-y-6">
                {result.updates.map((update: any, i: number) => (
                  <div key={i} className="flex gap-4 relative">
                    {i !== result.updates.length - 1 && (
                      <div className="absolute left-2.5 top-6 bottom-0 w-0.5 bg-gray-100" />
                    )}
                    <div className={`h-5 w-5 rounded-full shrink-0 flex items-center justify-center z-10 ${i === 0 ? 'bg-primary' : 'bg-gray-200'}`}>
                      <div className="h-2 w-2 bg-white rounded-full" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{update.msg}</p>
                      <p className="text-xs text-gray-500">{update.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
