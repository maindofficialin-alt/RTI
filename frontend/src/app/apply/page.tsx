"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FileText, Send, CheckCircle2, Loader2, Upload, X, Zap, ShieldCheck, EyeOff } from "lucide-react";

interface Department { id: string; name: string; }
interface PIO { id: string; name: string; designation: string; }

const API_BASE = "http://localhost:5000/api";

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [regNumber, setRegNumber] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Data
  const [departments, setDepartments] = useState<Department[]>([]);
  const [pios, setPios] = useState<PIO[]>([]);
  const [loadingDepts, setLoadingDepts] = useState(true);
  const [loadingPios, setLoadingPios] = useState(false);

  // Form fields
  const [selectedDeptId, setSelectedDeptId] = useState("");
  const [selectedPioId, setSelectedPioId] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [routingSuggestion, setRoutingSuggestion] = useState<string | null>(null);

  // Fetch departments
  useEffect(() => {
    fetch(`${API_BASE}/departments`).then(r => r.json()).then(setDepartments)
      .catch(() => setDepartments([]))
      .finally(() => setLoadingDepts(false));
  }, []);

  // Smart Routing Logic (Mock NLP)
  useEffect(() => {
    if (description.length > 20 && !selectedDeptId) {
      const desc = description.toLowerCase();
      if (desc.includes("teacher") || desc.includes("school") || desc.includes("university") || desc.includes("exam")) {
        const dept = departments.find(d => d.name.toLowerCase().includes("education"));
        if (dept) setRoutingSuggestion(dept.id);
      } else if (desc.includes("land") || desc.includes("patta") || desc.includes("survey")) {
        const dept = departments.find(d => d.name.toLowerCase().includes("revenue"));
        if (dept) setRoutingSuggestion(dept.id);
      } else if (desc.includes("road") || desc.includes("bridge") || desc.includes("construction")) {
        const dept = departments.find(d => d.name.toLowerCase().includes("pwd") || d.name.toLowerCase().includes("infrastructure"));
        if (dept) setRoutingSuggestion(dept.id);
      }
    } else {
      setRoutingSuggestion(null);
    }
  }, [description, departments, selectedDeptId]);

  // Fetch PIOs when department changes
  useEffect(() => {
    if (!selectedDeptId) { setPios([]); return; }
    setLoadingPios(true);
    fetch(`${API_BASE}/pios/${selectedDeptId}`).then(r => r.json()).then(setPios)
      .catch(() => setPios([]))
      .finally(() => setLoadingPios(false));
  }, [selectedDeptId]);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles].slice(0, 5));
    }
  };

  const removeFile = (idx: number) => setFiles(prev => prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const deptName = departments.find(d => d.id === selectedDeptId)?.name || "";
      const pioName = pios.find(p => p.id === selectedPioId)?.name || "";

      const formData = new FormData();
      formData.append("applicantName", isAnonymous ? "Anonymous Citizen" : fullName);
      formData.append("email", isAnonymous ? "anonymous@rti.gov.in" : email);
      formData.append("phone", isAnonymous ? "0000000000" : phone);
      formData.append("address", isAnonymous ? "Protected Identity" : address);
      formData.append("departmentId", selectedDeptId);
      formData.append("departmentName", deptName);
      formData.append("pioId", selectedPioId);
      formData.append("pioName", pioName);
      formData.append("subject", subject);
      formData.append("description", description);
      formData.append("isAnonymous", String(isAnonymous));
      files.forEach(f => formData.append("documents", f));

      const token = localStorage.getItem("rti_token");
      const res = await fetch(`${API_BASE}/rti/submit`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setRegNumber(data.registrationNumber);
      setSubmitted(true);
    } catch (err: any) {
      alert(err.message || "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const guidedTips = {
    1: [
      "Not sure about the department? Start typing your request in Step 3, and our AI will suggest the best fit.",
      "Every department has a designated PIO. Selecting the correct one ensures faster processing."
    ],
    2: [
      "Concerned about your privacy? Use 'Anonymous Mode' to hide your identity from the department.",
      "Valid contact info is needed for SMS/Email alerts, even in anonymous mode (masked by system)."
    ],
    3: [
      "Be specific. Instead of 'Give info about roads', use 'Give copies of tenders for NH-44 construction in 2025'.",
      "Attach clear photos or scans of supporting documents to strengthen your request."
    ]
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-md">
          <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h2 className="text-2xl font-bold text-primary mb-4">Application Submitted!</h2>
          <p className="text-gray-600 mb-8">
            Your RTI application has been successfully submitted. Your registration number is <span className="font-bold text-primary">{regNumber}</span>.
          </p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => window.location.href = `/track`} className="px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary-light transition-all">
              Track Status
            </button>
            <button onClick={() => window.location.href = "/"} className="px-8 py-3 bg-gray-100 text-gray-700 rounded-full font-bold hover:bg-gray-200 transition-all">
              Go Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-8 flex items-center justify-between">
              <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                <FileText className="h-6 w-6" /> File Online RTI
              </h1>
              <div className="flex gap-2">
                {[1, 2, 3].map(s => (
                  <div key={s} className={`h-2 w-12 rounded-full transition-all ${s <= step ? 'bg-secondary' : 'bg-gray-200'}`} />
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h2 className="text-xl font-bold mb-6">Step 1: Department Details</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Select Department *</label>
                      <div className="relative">
                        <select value={selectedDeptId} onChange={(e) => { setSelectedDeptId(e.target.value); setSelectedPioId(""); }}
                          className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none appearance-none disabled:opacity-50 text-gray-900"
                          disabled={loadingDepts}>
                          <option value="">{loadingDepts ? "Loading departments..." : "Select a department"}</option>
                          {departments.map(dept => (<option key={dept.id} value={dept.id}>{dept.name}</option>))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          {loadingDepts ? <Loader2 className="h-5 w-5 animate-spin text-gray-400" /> :
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>}
                        </div>
                      </div>
                      {routingSuggestion && (
                         <div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-100 flex items-center justify-between">
                            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest flex items-center gap-2">
                               <Zap className="h-3 w-3" /> Smart Suggestion: {departments.find(d => d.id === routingSuggestion)?.name}
                            </span>
                            <button type="button" onClick={() => setSelectedDeptId(routingSuggestion)} className="text-[10px] font-black text-amber-900 hover:underline">Apply</button>
                         </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Select PIO (Public Information Officer) *</label>
                      <div className="relative">
                        <select value={selectedPioId} onChange={(e) => setSelectedPioId(e.target.value)}
                          className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none appearance-none disabled:opacity-50 disabled:bg-gray-100 text-gray-900"
                          disabled={!selectedDeptId || loadingPios}>
                          <option value="">{!selectedDeptId ? "Select a department first" : loadingPios ? "Loading PIOs..." : pios.length === 0 ? "No PIOs found" : "Select PIO"}</option>
                          {pios.map(pio => (<option key={pio.id} value={pio.id}>{pio.name} ({pio.designation})</option>))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          {loadingPios ? <Loader2 className="h-5 w-5 animate-spin text-gray-400" /> :
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 flex justify-end">
                    <button type="button" disabled={!selectedDeptId || !selectedPioId} onClick={nextStep}
                      className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-light transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                      Next Step
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Step 2: Applicant Details</h2>
                    <button type="button" onClick={() => setIsAnonymous(!isAnonymous)} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                      isAnonymous ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-gray-100 text-gray-400'
                    }`}>
                      <EyeOff className="h-4 w-4" /> Anonymous Mode
                    </button>
                  </div>

                  {isAnonymous ? (
                    <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100 text-center space-y-4">
                       <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center mx-auto text-primary shadow-sm">
                          <ShieldCheck className="h-8 w-8" />
                       </div>
                       <h3 className="font-bold text-primary text-lg">Identity Protection Active</h3>
                       <p className="text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
                         Your personal details will be hidden from the department and PIO. All communications will be routed through the secure RTI vault.
                       </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                        <input type="text" required value={fullName} onChange={e => setFullName(e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                        <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number *</label>
                        <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Address *</label>
                        <textarea rows={3} required value={address} onChange={e => setAddress(e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20"></textarea>
                      </div>
                    </div>
                  )}
                  <div className="mt-10 flex justify-between">
                    <button type="button" onClick={prevStep} className="text-gray-500 font-bold hover:text-primary transition-all">Back</button>
                    <button type="button" onClick={nextStep} className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-light transition-all">Next Step</button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h2 className="text-xl font-bold mb-6">Step 3: RTI Request</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Subject *</label>
                      <input type="text" required value={subject} onChange={e => setSubject(e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20" placeholder="Brief subject of your request" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Text of RTI Request (Max 3000 chars) *</label>
                      <textarea rows={6} required maxLength={3000} value={description} onChange={e => setDescription(e.target.value)}
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20" placeholder="Specify the information required..."></textarea>
                      <p className="text-xs text-gray-400 mt-1">{description.length}/3000 characters</p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Supporting Documents (Optional, PDF/Images, max 5MB each)</label>
                      <div onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-gray-200 rounded-3xl p-8 text-center hover:border-primary/50 transition-all cursor-pointer bg-gray-50">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm font-medium">Click or drag files to upload (max 5 files)</p>
                      </div>
                      <input ref={fileInputRef} type="file" multiple accept=".pdf,.png,.jpg,.jpeg" onChange={handleFileSelect} className="hidden" />
                      {files.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {files.map((f, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                              <span className="text-sm text-gray-700 truncate font-medium">{f.name} ({(f.size / 1024).toFixed(1)} KB)</span>
                              <button type="button" onClick={() => removeFile(i)} className="text-red-400 hover:text-red-600"><X className="h-4 w-4" /></button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-blue-50 text-blue-800 rounded-2xl text-sm font-medium">
                      <CheckCircle2 className="h-5 w-5 shrink-0" />
                      <p>By submitting this application, I confirm that the information provided is true to the best of my knowledge.</p>
                    </div>
                  </div>
                  <div className="mt-10 flex justify-between">
                    <button type="button" onClick={prevStep} className="text-gray-500 font-bold hover:text-primary transition-all">Back</button>
                    <button type="submit" disabled={submitting}
                      className="px-8 py-3 bg-secondary text-white rounded-xl font-bold hover:bg-secondary-light transition-all flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-secondary/20">
                      {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</> : <>Submit Application <Send className="h-4 w-4" /></>}
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          </div>

          <div className="space-y-8">
             <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
                   <Zap className="h-5 w-5 text-amber-500" /> Guided Mode
                </h3>
                <div className="space-y-6">
                   {(guidedTips as any)[step].map((tip: string, i: number) => (
                      <div key={i} className="flex gap-4">
                         <div className="h-6 w-6 bg-primary/5 rounded-lg flex items-center justify-center text-[10px] font-black text-primary shrink-0">
                            {i + 1}
                         </div>
                         <p className="text-xs text-gray-500 leading-relaxed font-medium">
                            {tip}
                         </p>
                      </div>
                   ))}
                </div>
             </div>

             <div className="bg-[#003366] p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                <div className="relative z-10">
                   <h3 className="text-xl font-black mb-4">Privacy Promise</h3>
                   <p className="text-xs text-blue-200 mb-6 leading-relaxed">
                      Telangana RTI portal uses military-grade encryption to protect your data. Anonymous submissions are never revealed to department staff.
                   </p>
                   <div className="flex items-center gap-2 text-emerald-400">
                      <ShieldCheck className="h-4 w-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">End-to-End Encrypted</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

}
