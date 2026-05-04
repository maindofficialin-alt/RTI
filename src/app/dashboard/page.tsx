"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Share2, 
  MoreVertical,
  GraduationCap,
  MapPin,
  Calendar,
  ArrowRight,
  TrendingUp,
  Users,
  Activity,
  Award,
  ShieldAlert,
  Fingerprint,
  EyeOff,
  Search,
  Coins,
  Handshake,
  Landmark,
  Scale,
  Gavel
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const mockApplications = [
  {
    id: "TSRTI/2026/0842",
    title: "Inquiry on Infrastructure Funds for Government Degree Colleges",
    department: "Higher Education Department",
    appliedDate: "April 15, 2026",
    status: "Processing"
  },
  {
    id: "TSRTI/2026/0521",
    title: "Faculty Vacancy Report - Osmania University Affiliated Colleges",
    department: "Higher Education Department",
    appliedDate: "March 22, 2026",
    status: "Completed"
  }
];

const mockSensitiveCases = [
  {
    id: "SEC-RTI/2026/001",
    department: "Home Affairs",
    topic: "Deployment Details of Strategic Force",
    concern: "Internal Security",
    flaggedBy: "AI Pattern Match",
    riskLevel: "Critical",
    date: "2 mins ago"
  },
  {
    id: "SEC-RTI/2026/009",
    department: "Police Department",
    topic: "Undercover Officer Identity Records",
    concern: "Personnel Safety",
    flaggedBy: "PIO Manual Flag",
    riskLevel: "High",
    date: "1 hour ago"
  }
];

export default function Dashboard() {
  const searchParams = useSearchParams();
  const isAdmin = searchParams.get("role") === "admin";
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [showSecurity, setShowSecurity] = useState(false);

  const user = {
    name: isAdmin ? "Administrator" : "Srinivas",
    location: "Hyderabad, Telangana",
    email: isAdmin ? "admin@gmail.com" : "srinivas@example.com",
    avatar: isAdmin ? "A" : "S"
  };

  const adminStats = [
    { label: "Total RTI Applied", value: "1,24,500", color: "text-primary", trend: "+12%", icon: TrendingUp },
    { label: "RTI Responded", value: "1,18,200", color: "text-emerald-600", trend: "95% rate", icon: Activity },
    { label: "Pending/Delayed", value: "6,300", color: "text-rose-600", trend: "-5% delay", icon: Clock },
    { label: "Avg. Disposal Time", value: "14 Days", color: "text-amber-600", trend: "Target: 15", icon: Users },
  ];

  const deptMetrics = [
    { 
      name: "Higher Education", 
      applied: 15400, responded: 14800, delayed: 600, rate: 96,
      history: [30, 45, 60, 40, 70, 90, 85],
      satisfaction: 4.8,
      avgStaffLoad: 12,
      appealRate: "1.2%"
    },
    { 
      name: "Health & Family Welfare", 
      applied: 22100, responded: 19500, delayed: 2600, rate: 88,
      history: [20, 30, 25, 45, 35, 50, 40],
      satisfaction: 3.9,
      avgStaffLoad: 28,
      appealRate: "4.5%"
    },
    { 
      name: "Revenue Department", 
      applied: 35000, responded: 34200, delayed: 800, rate: 98,
      history: [50, 60, 70, 80, 85, 95, 92],
      satisfaction: 4.9,
      avgStaffLoad: 15,
      appealRate: "0.8%"
    },
    { 
      name: "Home Affairs", 
      applied: 18000, responded: 16500, delayed: 1500, rate: 91,
      history: [40, 35, 45, 55, 50, 60, 58],
      satisfaction: 4.2,
      avgStaffLoad: 22,
      appealRate: "2.1%"
    },
  ];

  const selectedDeptData = useMemo(() => 
    deptMetrics.find(d => d.name === selectedDept), 
    [selectedDept]
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Dashboard Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-md bg-white/80">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-5">
              <div className={`h-14 w-14 ${isAdmin ? 'bg-secondary' : 'bg-primary'} rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg transition-transform hover:scale-105`}>
                {showSecurity ? <ShieldAlert className="h-7 w-7 text-primary" /> : user.avatar}
              </div>
              <div>
                <h1 className="text-xl font-black text-gray-900 tracking-tight">
                  {showSecurity ? "Strategic Security Vault" : (selectedDept ? `Analytics: ${selectedDept}` : `Namaste, ${user.name}`)}
                </h1>
                <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5 font-bold text-secondary uppercase tracking-widest">
                    {showSecurity ? "Critical Risk Monitoring" : (selectedDept ? "Detailed Performance View" : (isAdmin ? "Admin Control Center" : user.location))}
                  </span>
                  {(selectedDept || showSecurity) && (
                    <button 
                      onClick={() => { setSelectedDept(null); setShowSecurity(false); }}
                      className="text-primary font-bold hover:underline flex items-center gap-1 transition-all hover:gap-2"
                    >
                      <ArrowRight className="h-3 w-3 rotate-180" /> Back to Overview
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              {isAdmin && !showSecurity && (
                <button 
                  onClick={() => setShowSecurity(true)}
                  className="relative px-5 py-2.5 bg-rose-50 text-rose-600 rounded-xl font-bold hover:bg-rose-100 transition-all text-xs flex items-center gap-2"
                >
                  <ShieldAlert className="h-4 w-4" /> Security Alerts
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-rose-600 text-white text-[8px] flex items-center justify-center rounded-full animate-bounce">2</span>
                </button>
              )}
              <button className="px-5 py-2.5 bg-gray-50 text-gray-600 rounded-xl font-bold hover:bg-gray-100 transition-all text-xs">Settings</button>
              <button className={`px-5 py-2.5 ${isAdmin ? 'bg-secondary' : 'bg-primary'} text-white rounded-xl font-black transition-all text-xs shadow-lg hover:-translate-y-0.5`}>
                {isAdmin ? (showSecurity ? "Invoke Protocol 8(1)" : "Export Full Audit") : "New Application"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {isAdmin ? (
            <motion.div 
              key={showSecurity ? "security" : (selectedDept ? "dept" : "overview")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {showSecurity ? (
                <div className="space-y-8">
                  {/* Security Vault View */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                      <div className="bg-white p-8 rounded-3xl border-2 border-rose-100 shadow-sm">
                        <div className="flex justify-between items-start mb-8">
                          <div>
                            <h2 className="text-2xl font-black text-rose-600 flex items-center gap-3">
                              <EyeOff className="h-7 w-7" /> Flagged Sensitive Requests
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">Applications requiring Section 8(1) exemption review due to security concerns.</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {mockSensitiveCases.map((c, i) => (
                            <motion.div 
                              key={i}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: i * 0.1 }}
                              className="p-6 bg-rose-50/30 rounded-2xl border border-rose-100 flex flex-col md:flex-row justify-between gap-6 hover:bg-rose-50 transition-colors"
                            >
                              <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                  <span className="px-2 py-1 bg-rose-600 text-white text-[10px] font-black rounded-md">{c.riskLevel}</span>
                                  <span className="text-xs font-black text-gray-400">{c.id}</span>
                                </div>
                                <h3 className="font-bold text-gray-900">{c.topic}</h3>
                                <div className="flex gap-4 text-[10px] font-bold text-gray-500 uppercase">
                                  <span>Dept: {c.department}</span>
                                  <span>Concern: {c.concern}</span>
                                </div>
                              </div>
                              <div className="flex flex-col justify-between items-end">
                                <div className="text-[10px] font-bold text-rose-500 bg-rose-100 px-2 py-1 rounded-md mb-2">
                                  Flagged: {c.flaggedBy}
                                </div>
                                <div className="flex gap-2">
                                  <button className="px-4 py-2 bg-white text-gray-700 text-[10px] font-black rounded-lg border border-gray-200 hover:bg-gray-50 transition-all">Review Info</button>
                                  <button className="px-4 py-2 bg-rose-600 text-white text-[10px] font-black rounded-lg hover:bg-rose-700 transition-all">Invoke Secrecy</button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-gray-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
                        <Fingerprint className="absolute -bottom-4 -right-4 h-32 w-32 text-white/5" />
                        <h3 className="text-xl font-black mb-4">Risk Distribution</h3>
                        <div className="space-y-4">
                          {[
                            { label: "Internal Security", val: 42, color: "bg-rose-500" },
                            { label: "Personnel Safety", val: 28, color: "bg-amber-500" },
                            { label: "Strategic Assets", val: 15, color: "bg-blue-500" },
                            { label: "Foreign Relations", val: 15, color: "bg-emerald-500" }
                          ].map((risk, i) => (
                            <div key={i} className="space-y-1.5">
                              <div className="flex justify-between text-[10px] font-black uppercase text-gray-400">
                                <span>{risk.label}</span>
                                <span>{risk.val}%</span>
                              </div>
                              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                <div className={`h-full ${risk.color}`} style={{ width: `${risk.val}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <h4 className="font-black text-gray-900 mb-4">Security Protocol Status</h4>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl">
                            <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
                            <span className="text-[10px] font-black text-emerald-700 uppercase">AI Guardrails: Active</span>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                            <div className="h-2 w-2 bg-blue-500 rounded-full" />
                            <span className="text-[10px] font-black text-blue-700 uppercase">Encryption: AES-256</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                !selectedDept ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      {adminStats.map((stat, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group cursor-default"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div className="h-10 w-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                              <stat.icon className="h-5 w-5" />
                            </div>
                            <span className={`text-[10px] font-black px-2 py-1 rounded-md ${stat.trend.includes('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                              {stat.trend}
                            </span>
                          </div>
                          <div className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">{stat.label}</div>
                          <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-10">
                          <div>
                            <h2 className="text-xl font-black text-gray-900">Efficiency Distribution</h2>
                            <p className="text-sm text-gray-500">Cross-departmental performance mapping.</p>
                          </div>
                        </div>
                        
                        <div className="relative h-[300px] flex items-center justify-center">
                          <svg viewBox="0 0 400 300" className="w-full h-full">
                            {[1, 2, 3, 4, 5].map(i => (
                              <line key={i} x1="0" y1={300 - (i * 50)} x2="400" y2={300 - (i * 50)} stroke="#F8FAFC" strokeWidth="1" />
                            ))}
                            <path 
                              d="M0,250 Q100,50 200,150 T400,50" 
                              fill="none" 
                              stroke="url(#gradient)" 
                              strokeWidth="4" 
                              strokeLinecap="round"
                              className="opacity-20"
                            />
                            <defs>
                              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#003366" />
                                <stop offset="100%" stopColor="#FFC107" />
                              </linearGradient>
                            </defs>

                            {deptMetrics.map((dept, i) => {
                              const x = 50 + (i * 100);
                              const y = 250 - (dept.rate - 80) * 10;
                              return (
                                <g key={i} className="cursor-pointer group" onClick={() => setSelectedDept(dept.name)}>
                                  <motion.circle 
                                    initial={{ r: 0 }}
                                    animate={{ r: 15 }}
                                    cx={x} cy={y} fill={i === 2 ? "#003366" : "#FFC107"} fillOpacity="0.1" 
                                  />
                                  <circle cx={x} cy={y} r="5" fill={i === 2 ? "#003366" : "#FFC107"} />
                                  <text x={x} y={y - 20} textAnchor="middle" className="text-[10px] font-black fill-gray-900 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {dept.rate}%
                                  </text>
                                  <text x={x} y={280} textAnchor="middle" className="text-[8px] font-bold fill-gray-400 uppercase tracking-tighter">
                                    {dept.name.split(' ')[0]}
                                  </text>
                                </g>
                              );
                            })}
                          </svg>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-primary to-blue-900 p-8 rounded-3xl text-white shadow-xl shadow-primary/10">
                        <h3 className="text-lg font-black mb-6">Top Honors</h3>
                        <div className="space-y-6">
                          {deptMetrics.sort((a,b) => b.rate - a.rate).slice(0, 3).map((dept, i) => (
                            <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                              <div className="h-10 w-10 bg-secondary rounded-xl flex items-center justify-center text-primary">
                                <Award className="h-5 w-5" />
                              </div>
                              <div>
                                <div className="text-xs font-bold text-blue-200 uppercase">Rank #{i+1}</div>
                                <div className="text-sm font-black">{dept.name}</div>
                              </div>
                              <div className="ml-auto text-lg font-black text-secondary">{dept.rate}%</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                      <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                        <h2 className="text-lg font-black text-gray-900">Operational Breakdown</h2>
                        <div className="flex gap-2">
                          <button className="text-xs font-bold text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">Last 30 Days</button>
                          <button className="text-xs font-bold text-primary bg-primary/5 px-4 py-2 rounded-lg">Filters</button>
                        </div>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left">
                          <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            <tr>
                              <th className="px-6 py-5">Public Authority</th>
                              <th className="px-6 py-5 text-center">Applied</th>
                              <th className="px-6 py-5 text-center">Responded</th>
                              <th className="px-6 py-5 text-center">Delayed</th>
                              <th className="px-6 py-5 text-right">Analytics</th>
                            </tr>
                          </thead>
                          <tbody className="text-sm">
                            {deptMetrics.map((dept, i) => (
                              <tr 
                                key={i} 
                                onClick={() => setSelectedDept(dept.name)}
                                className="border-t border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer group"
                              >
                                <td className="px-6 py-5">
                                  <span className="font-bold text-gray-700 group-hover:text-primary transition-colors">{dept.name}</span>
                                </td>
                                <td className="px-6 py-5 text-center font-medium">{dept.applied.toLocaleString()}</td>
                                <td className="px-6 py-5 text-center font-medium text-emerald-600">{dept.responded.toLocaleString()}</td>
                                <td className="px-6 py-5 text-center font-medium text-rose-600">{dept.delayed.toLocaleString()}</td>
                                <td className="px-6 py-5 text-right">
                                  <div className="flex items-center justify-end gap-3">
                                    <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                      <div className="h-full bg-primary" style={{ width: `${dept.rate}%` }} />
                                    </div>
                                    <span className="text-xs font-black text-gray-900">{dept.rate}%</span>
                                    <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-primary transition-all group-hover:translate-x-1" />
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                ) : (
                  <motion.div 
                    key="dept-detail"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                          <div className="flex items-center justify-between mb-12">
                            <div>
                              <h2 className="text-2xl font-black text-gray-900">Submission Velocity</h2>
                              <p className="text-sm text-gray-500">Volume tracking for {selectedDept}.</p>
                            </div>
                            <div className="flex gap-4">
                              <div className="text-center px-4 py-2 bg-emerald-50 rounded-2xl">
                                <div className="text-xl font-black text-emerald-600">{selectedDeptData?.satisfaction}</div>
                                <div className="text-[8px] font-bold text-emerald-600 uppercase">CSAT Score</div>
                              </div>
                              <div className="text-center px-4 py-2 bg-blue-50 rounded-2xl">
                                <div className="text-xl font-black text-blue-600">{selectedDeptData?.avgStaffLoad}</div>
                                <div className="text-[8px] font-bold text-blue-600 uppercase">Case/Staff</div>
                              </div>
                            </div>
                          </div>
                          <div className="h-64 flex items-end gap-4 px-2">
                            {selectedDeptData?.history.map((val, i) => (
                              <div key={i} className="flex-grow flex flex-col items-center gap-4 group">
                                <div className="relative w-full flex items-end justify-center">
                                  <motion.div 
                                    initial={{ height: 0 }}
                                    animate={{ height: `${val}%` }}
                                    className={`w-4 rounded-full transition-all ${i === 6 ? 'bg-secondary' : 'bg-primary/20 group-hover:bg-primary/40'}`}
                                  />
                                  <div className="absolute -top-6 text-[10px] font-black opacity-0 group-hover:opacity-100 transition-opacity">
                                    {val}
                                  </div>
                                </div>
                                <span className="text-[8px] font-bold text-gray-400 uppercase">Week {i+1}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {[
                            { label: "Appeal Rate", val: selectedDeptData?.appealRate, color: "text-rose-600", bg: "bg-rose-50" },
                            { label: "First Pass Yield", val: "92.4%", color: "text-emerald-600", bg: "bg-emerald-50" },
                            { label: "PIO Accuracy", val: "99.1%", color: "text-blue-600", bg: "bg-blue-50" }
                          ].map((m, i) => (
                            <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
                              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{m.label}</div>
                              <div className={`text-2xl font-black ${m.color}`}>{m.val}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-8">
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                          <h3 className="text-lg font-black text-gray-900 mb-8">Disposal Funnel</h3>
                          <div className="space-y-8 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-gray-50">
                            {[
                              { label: "Application Received", val: "100%", time: "Day 0" },
                              { label: "Document Verification", val: "94%", time: "Day 2" },
                              { label: "PIO Processing", val: "82%", time: "Day 5" },
                              { label: "Final Resolution", val: `${selectedDeptData?.rate}%`, time: "Day 12" }
                            ].map((step, i) => (
                              <div key={i} className="relative pl-10">
                                <div className={`absolute left-0 top-1 h-8 w-8 rounded-full border-4 border-white shadow-sm flex items-center justify-center text-[10px] font-black ${i === 3 ? 'bg-secondary text-primary' : 'bg-primary text-white'}`}>
                                  {i+1}
                                </div>
                                <div>
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-bold text-gray-700">{step.label}</span>
                                    <span className="text-xs font-black text-primary">{step.val}</span>
                                  </div>
                                  <div className="text-[10px] text-gray-400 font-bold uppercase">{step.time} average</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              )}

              <div className="pt-10">
                <div className="mb-8">
                  <h2 className="text-2xl font-black text-primary tracking-tight">Proactive Disclosure Control</h2>
                  <p className="text-sm text-gray-500">Managing real-time public metrics for the transparency portal.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { title: "Budgets & Expenditure", icon: Coins, color: "text-amber-600", metric: "₹ 1,240 Cr Spend", desc: "FY 2025-26 tracking" },
                    { title: "Public Contracts", icon: FileText, color: "text-blue-600", metric: "842 Tenders", desc: "Live contract monitoring" },
                    { title: "Employee Salaries", icon: Users, color: "text-indigo-600", metric: "4.5L Staff", desc: "Payroll transparency" },
                    { title: "Welfare Schemes", icon: Handshake, color: "text-emerald-600", metric: "128 Active", desc: "Direct benefit monitoring" }
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ y: -5 }}
                      className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
                    >
                      <div className="h-12 w-12 bg-gray-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <item.icon className={`h-6 w-6 ${item.color}`} />
                      </div>
                      <h3 className="font-bold text-primary mb-1">{item.title}</h3>
                      <div className="text-lg font-black text-secondary mb-2">{item.metric}</div>
                      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="citizen-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                  <h2 className="text-xl font-black text-gray-900 mb-8">Application Velocity</h2>
                  <div className="flex items-end gap-4 h-48 mb-6">
                    {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                      <div key={i} className="flex-grow group relative">
                        <div 
                          className={`w-full rounded-t-xl transition-all cursor-pointer ${i === 3 ? 'bg-primary' : 'bg-primary/10 hover:bg-primary/30'}`} 
                          style={{ height: `${h}%` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-black text-gray-900">Track Applications</h2>
                  <div className="flex items-center gap-1.5 text-[10px] font-black text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase tracking-widest">
                    <span className="h-1.5 w-1.5 bg-green-600 rounded-full animate-pulse" /> SMS Alerts Active
                  </div>
                </div>

                {mockApplications.map((app, i) => (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={app.id}
                    className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                          <GraduationCap className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{app.id}</span>
                          </div>
                          <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{app.title}</h3>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        app.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {app.status}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 text-sm">
                      <div>
                        <div className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Department</div>
                        <div className="font-bold text-gray-700">{app.department}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Applied On</div>
                        <div className="font-bold text-gray-700">{app.appliedDate}</div>
                      </div>
                    </div>
                    <div className="flex gap-3 pt-6 border-t border-gray-50">
                      <button className="text-xs font-black text-primary px-5 py-2.5 bg-primary/5 rounded-xl hover:bg-primary/10 transition-all">View Details</button>
                      {app.status === 'Completed' && (
                        <button className="text-xs font-black text-emerald-600 px-5 py-2.5 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-all flex items-center gap-2">
                          <Download className="h-4 w-4" /> Download PDF
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-8">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                  <h2 className="text-lg font-black text-gray-900 mb-8 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" /> Tracking History
                  </h2>
                  <div className="space-y-8 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-gray-50">
                    {[
                      { time: "Today, 10:30 AM", event: "Final Response Uploaded", active: true },
                      { time: "Yesterday", event: "Payment verified", active: false },
                      { time: "April 15, 2026", event: "RTI Submitted", active: false },
                    ].map((step, i) => (
                      <div key={i} className="relative pl-10">
                        <div className={`absolute left-0 top-1 h-8 w-8 rounded-full border-4 border-white shadow-sm flex items-center justify-center text-[10px] font-black ${
                          step.active ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
                        }`}>
                          {i+1}
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-gray-400 uppercase">{step.time}</div>
                          <div className={`text-sm font-bold mt-0.5 ${step.active ? 'text-gray-900' : 'text-gray-500'}`}>
                            {step.event}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-[#003366] p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                  <h3 className="text-xl font-black mb-4 relative z-10">Need Help?</h3>
                  <button className="w-full py-4 bg-white text-primary rounded-2xl text-xs font-black hover:bg-blue-50 transition-all relative z-10 shadow-lg">
                    View Templates
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
