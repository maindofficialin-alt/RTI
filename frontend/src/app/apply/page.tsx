"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Send, CheckCircle2, Loader2 } from "lucide-react";

interface Department {
  id: string;
  name: string;
}

interface PIO {
  id: string;
  name: string;
  designation: string;
}

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  
  // Data State
  const [departments, setDepartments] = useState<Department[]>([]);
  const [pios, setPios] = useState<PIO[]>([]);
  
  // Selected State
  const [selectedDeptId, setSelectedDeptId] = useState("");
  const [selectedPioId, setSelectedPioId] = useState("");
  
  // Loading State
  const [loadingDepts, setLoadingDepts] = useState(true);
  const [loadingPios, setLoadingPios] = useState(false);

  const API_BASE = "http://localhost:5000/api";

  // Mock Fallback Data
  const MOCK_DEPARTMENTS: Department[] = [
    { "id": "dept-1", "name": "Agriculture & Cooperation" },
    { "id": "dept-2", "name": "Animal Husbandry, Dairy Development & Fisheries" },
    { "id": "dept-3", "name": "Backward Classes Welfare" },
    { "id": "dept-4", "name": "Consumer Affairs, Food & Civil Supplies" },
    { "id": "dept-5", "name": "Energy" },
    { "id": "dept-6", "name": "Environment, Forests, Science & Technology" },
    { "id": "dept-7", "name": "Finance" },
    { "id": "dept-8", "name": "General Administration" },
    { "id": "dept-9", "name": "Health, Medical & Family Welfare" },
    { "id": "dept-10", "name": "Higher Education" },
    { "id": "dept-11", "name": "Home" },
    { "id": "dept-12", "name": "Housing" },
    { "id": "dept-13", "name": "Industries & Commerce" },
    { "id": "dept-14", "name": "Information Technology, Electronics & Communications" },
    { "id": "dept-15", "name": "Labour, Employment, Training & Factories" },
    { "id": "dept-16", "name": "Law" },
    { "id": "dept-17", "name": "Municipal Administration & Urban Development" },
    { "id": "dept-18", "name": "Minorities Welfare" },
    { "id": "dept-19", "name": "Panchayat Raj & Rural Development" },
    { "id": "dept-20", "name": "Planning" },
    { "id": "dept-21", "name": "Revenue" },
    { "id": "dept-22", "name": "Roads & Buildings" },
    { "id": "dept-23", "name": "School Education" },
    { "id": "dept-24", "name": "Scheduled Castes Development" },
    { "id": "dept-25", "name": "Social Welfare" },
    { "id": "dept-26", "name": "Transport" },
    { "id": "dept-27", "name": "Tribal Welfare" },
    { "id": "dept-28", "name": "Water Resources (Irrigation & CAD)" },
    { "id": "dept-29", "name": "Women, Children, Disabled & Senior Citizens" },
    { "id": "dept-30", "name": "Youth Advancement, Tourism & Culture" },
    { "id": "dept-31", "name": "Endowments" },
    { "id": "dept-32", "name": "Prohibition & Excise" },
    { "id": "dept-33", "name": "Registration & Stamps" }
  ];

  const MOCK_PIOS: Record<string, PIO[]> = {
    'dept-1': [
      { id: 'pio-1', name: 'Shri. A. Rajender', designation: 'Public Information Officer' },
      { id: 'pio-2', name: 'Smt. K. Sridevi', designation: 'Asst. Public Information Officer' },
    ],
    'dept-2': [
      { id: 'pio-3', name: 'Shri. B. Srinivas', designation: 'Public Information Officer' },
      { id: 'pio-4', name: 'Smt. M. Anitha', designation: 'Asst. Public Information Officer' },
    ],
    'dept-3': [
      { id: 'pio-5', name: 'Shri. C. Mahesh', designation: 'Public Information Officer' },
      { id: 'pio-6', name: 'Smt. P. Priyanka', designation: 'Asst. Public Information Officer' },
    ],
    'dept-4': [
      { id: 'pio-7', name: 'Shri. D. Venkatesh', designation: 'Public Information Officer' },
      { id: 'pio-8', name: 'Smt. S. Swathi', designation: 'Asst. Public Information Officer' },
    ],
    'dept-5': [
      { id: 'pio-9', name: 'Shri. E. Prabhakar', designation: 'Public Information Officer' },
      { id: 'pio-10', name: 'Smt. T. Lavanya', designation: 'Asst. Public Information Officer' },
    ],
    'dept-6': [
      { id: 'pio-11', name: 'Shri. G. Satyanarayana', designation: 'Public Information Officer' },
      { id: 'pio-12', name: 'Smt. V. Radhika', designation: 'Asst. Public Information Officer' },
    ],
    'dept-7': [
      { id: 'pio-13', name: 'Shri. K. Ramesh', designation: 'Public Information Officer' },
      { id: 'pio-14', name: 'Smt. G. Madhavi', designation: 'Asst. Public Information Officer' },
    ],
    'dept-8': [
      { id: 'pio-15', name: 'Shri. M. Suresh', designation: 'Public Information Officer' },
      { id: 'pio-16', name: 'Smt. L. Sunitha', designation: 'Asst. Public Information Officer' },
    ],
    'dept-9': [
      { id: 'pio-17', name: 'Shri. P. Anil', designation: 'Public Information Officer' },
      { id: 'pio-18', name: 'Smt. N. Laxmi', designation: 'Asst. Public Information Officer' },
    ],
    'dept-10': [
      { id: 'pio-19', name: 'Shri. S. Kumar', designation: 'Public Information Officer' },
      { id: 'pio-20', name: 'Smt. R. Deepika', designation: 'Asst. Public Information Officer' },
    ],
    // Default fallback for other departments
  };

  // Fetch all departments on mount
  useEffect(() => {
    const fetchDepts = async () => {
      try {
        const res = await fetch(`${API_BASE}/departments`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setDepartments(data);
      } catch (error) {
        console.warn("Using fallback departments data");
        setDepartments(MOCK_DEPARTMENTS);
      } finally {
        setLoadingDepts(false);
      }
    };
    fetchDepts();
  }, []);

  // Fetch PIOs when department changes
  useEffect(() => {
    if (!selectedDeptId) {
      setPios([]);
      return;
    }

    const fetchPios = async () => {
      setLoadingPios(true);
      try {
        const res = await fetch(`${API_BASE}/pios/${selectedDeptId}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setPios(data);
      } catch (error) {
        console.warn("Using fallback PIOs data");
        setPios(MOCK_PIOS[selectedDeptId] || [
          { id: 'pio-default', name: 'Public Information Officer', designation: 'General Division' }
        ]);
      } finally {
        setLoadingPios(false);
      }
    };
    fetchPios();
  }, [selectedDeptId]);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md"
        >
          <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h2 className="text-2xl font-bold text-primary mb-4">Application Submitted!</h2>
          <p className="text-gray-600 mb-8">
            Your RTI application has been successfully submitted. Your registration number is <span className="font-bold text-primary">TSRTI/2026/003</span>.
          </p>
          <button 
            onClick={() => window.location.href = "/"}
            className="px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary-light transition-all"
          >
            Go to Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <FileText className="h-6 w-6" /> File Online RTI
          </h1>
          <div className="flex gap-2">
            {[1, 2, 3].map(s => (
              <div 
                key={s} 
                className={`h-2 w-12 rounded-full transition-all ${s <= step ? 'bg-secondary' : 'bg-gray-200'}`} 
              />
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-xl font-bold mb-6">Step 1: Department Details</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Select Department *</label>
                  <div className="relative">
                    <select 
                      value={selectedDeptId}
                      onChange={(e) => {
                        setSelectedDeptId(e.target.value);
                        setSelectedPioId(""); // Reset PIO selection
                      }}
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none appearance-none disabled:opacity-50 text-gray-900"
                      disabled={loadingDepts}
                    >
                      <option value="" className="text-gray-500">{loadingDepts ? "Loading departments..." : "Select a department"}</option>
                      {departments.map(dept => (
                        <option key={dept.id} value={dept.id} className="text-gray-900">{dept.name}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-2">
                      {loadingDepts ? (
                        <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                      ) : (
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Select PIO (Public Information Officer) *</label>
                  <div className="relative">
                    <select 
                      value={selectedPioId}
                      onChange={(e) => setSelectedPioId(e.target.value)}
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none appearance-none disabled:opacity-50 disabled:bg-gray-100 text-gray-900"
                      disabled={!selectedDeptId || loadingPios}
                    >
                      <option value="" className="text-gray-500">
                        {!selectedDeptId ? "Select a department first" : loadingPios ? "Loading PIOs..." : pios.length === 0 ? "No PIOs found for this department" : "Select PIO"}
                      </option>
                      {pios.map(pio => (
                        <option key={pio.id} value={pio.id} className="text-gray-900">{pio.name} ({pio.designation})</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-2">
                      {loadingPios ? (
                        <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                      ) : (
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10 flex justify-end">
                <button 
                  type="button" 
                  disabled={!selectedDeptId || !selectedPioId}
                  onClick={nextStep}
                  className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-light transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next Step
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-xl font-bold mb-6">Step 2: Applicant Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input type="text" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                  <input type="email" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number *</label>
                  <input type="tel" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Address *</label>
                  <textarea rows={3} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20"></textarea>
                </div>
              </div>
              <div className="mt-10 flex justify-between">
                <button type="button" onClick={prevStep} className="text-gray-500 font-bold hover:text-primary transition-all">Back</button>
                <button 
                  type="button" 
                  onClick={nextStep}
                  className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-light transition-all"
                >
                  Next Step
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-xl font-bold mb-6">Step 3: RTI Request</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Text of RTI Request (Max 3000 chars) *</label>
                  <textarea rows={6} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20" placeholder="Specify the information required..."></textarea>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Supporting Document (Optional, PDF max 2MB)</label>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-primary/50 transition-all cursor-pointer bg-gray-50">
                    <p className="text-gray-500 text-sm">Click or drag file to upload</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-blue-50 text-blue-800 rounded-xl text-sm">
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                  <p>By submitting this application, I confirm that the information provided is true to the best of my knowledge.</p>
                </div>
              </div>
              <div className="mt-10 flex justify-between">
                <button type="button" onClick={prevStep} className="text-gray-500 font-bold hover:text-primary transition-all">Back</button>
                <button 
                  type="submit" 
                  className="px-8 py-3 bg-secondary text-white rounded-xl font-bold hover:bg-secondary-light transition-all flex items-center gap-2"
                >
                  Submit Application <Send className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}
        </form>
      </div>
    </div>
  );
}
