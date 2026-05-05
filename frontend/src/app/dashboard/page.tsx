"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  X,
  GraduationCap,
  TrendingUp,
  Users,
  Activity,
  Award,
  ShieldAlert,
  Fingerprint,
  EyeOff,
  Coins,
  Handshake,
  ArrowRight,
  Info,
  Zap,
  Bell,
  Database
} from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { apiRequest, getUser, isLoggedIn, logout } from "@/lib/api";

export default function Dashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isAdmin = searchParams.get("role") === "admin";
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [showSecurity, setShowSecurity] = useState(false);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
      return;
    }
    
    const u = getUser();
    setUser(u);

    const fetchData = async () => {
      try {
        const data = await apiRequest(isAdmin ? "/rti/all" : "/rti/my-applications");
        setApplications(data);
      } catch (err) {
        console.error("Failed to fetch applications", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAdmin, router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const adminStats = [
    { label: "Total RTI Applied", value: "1,24,500", color: "text-primary", trend: "+12%", icon: TrendingUp },
    { label: "RTI Responded", value: "1,18,200", color: "text-emerald-600", trend: "95% rate", icon: Activity },
    { label: "Pending/Delayed", value: "6,300", color: "text-rose-600", trend: "-5% delay", icon: Clock },
    { label: "Avg. Disposal Time", value: "14 Days", color: "text-amber-600", trend: "Target: 15", icon: Users },
  ];

  const deptMetrics = [
    { name: "Higher Education", applied: 15400, responded: 14800, delayed: 600, rate: 96, history: [30, 45, 60, 40, 70, 90, 85], satisfaction: 4.8, avgStaffLoad: 12, appealRate: "1.2%" },
    { name: "Health & Family Welfare", applied: 22100, responded: 19500, delayed: 2600, rate: 88, history: [20, 30, 25, 45, 35, 50, 40], satisfaction: 3.9, avgStaffLoad: 28, appealRate: "4.5%" },
    { name: "Revenue Department", applied: 35000, responded: 34200, delayed: 800, rate: 98, history: [50, 60, 70, 80, 85, 95, 92], satisfaction: 4.9, avgStaffLoad: 15, appealRate: "0.8%" },
    { name: "Home Affairs", applied: 18000, responded: 16500, delayed: 1500, rate: 91, history: [40, 35, 45, 55, 50, 60, 58], satisfaction: 4.2, avgStaffLoad: 22, appealRate: "2.1%" },
  ];

  const mockSensitiveCases = [
    { id: "SEC-RTI/2026/001", department: "Home Affairs", topic: "Deployment Details of Strategic Force", concern: "Internal Security", flaggedBy: "AI Pattern Match", riskLevel: "Critical", date: "2 mins ago" },
    { id: "SEC-RTI/2026/009", department: "Police Department", topic: "Undercover Officer Identity Records", concern: "Personnel Safety", flaggedBy: "PIO Manual Flag", riskLevel: "High", date: "1 hour ago" }
  ];

  const selectedDeptData = useMemo(() => deptMetrics.find(d => d.name === selectedDept), [selectedDept]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Dashboard Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-md bg-white/80">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-5">
              <div className={`h-14 w-14 ${isAdmin ? 'bg-secondary' : 'bg-primary'} rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg transition-transform hover:scale-105 uppercase`}>
                {user.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-xl font-black text-gray-900 tracking-tight">
                  {showSecurity ? "Strategic Security Vault" : (selectedDept ? `Analytics: ${selectedDept}` : `Namaste, ${user.name}`)}
                </h1>
                <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5 font-bold text-secondary uppercase tracking-widest">
                    {showSecurity ? "Critical Risk Monitoring" : (selectedDept ? "Detailed Performance View" : (isAdmin ? "Admin Control Center" : user.location || "Hyderabad, Telangana"))}
                  </span>
                  {(selectedDept || showSecurity) && (
                    <button onClick={() => { setSelectedDept(null); setShowSecurity(false); }} className="text-primary font-bold hover:underline flex items-center gap-1 transition-all hover:gap-2">
                      <ArrowRight className="h-3 w-3 rotate-180" /> Back to Overview
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={handleLogout} className="px-5 py-2.5 bg-gray-50 text-gray-600 rounded-xl font-bold hover:bg-gray-100 transition-all text-xs">Logout</button>
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              {/* Admin KPI Header */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {adminStats.map((stat, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="h-10 w-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                        <stat.icon className="h-5 w-5" />
                      </div>
                      <span className={`text-[10px] font-black px-2 py-1 rounded-md ${stat.trend.includes('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                        {stat.trend}
                      </span>
                    </div>
                    <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">{stat.label}</div>
                    <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
                  </motion.div>
                ))}
              </div>

              {/* Next-Gen Admin Toolkit */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-10">
                      <div>
                        <h2 className="text-xl font-black text-gray-900">AI Redaction Engine</h2>
                        <p className="text-sm text-gray-500">Auto-identifying and masking sensitive data across departments.</p>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">
                        <ShieldAlert className="h-4 w-4" /> System Active
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { file: "Financial_Audit_2025.pdf", dept: "Revenue", redactCount: 42, status: "Review Required" },
                        { file: "Staff_Address_List.csv", dept: "Education", redactCount: 128, status: "Auto-Masked" },
                        { file: "Bridge_Plan_Draft.jpg", dept: "PWD", redactCount: 0, status: "Clean" },
                      ].map((item, i) => (
                        <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between group hover:border-primary/30 transition-all">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-gray-400 group-hover:text-primary transition-colors">
                              <FileText className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-gray-900">{item.file}</div>
                              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.dept} Department</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <div className="text-xs font-black text-primary">{item.redactCount}</div>
                              <div className="text-[8px] font-bold text-gray-400 uppercase">Flags</div>
                            </div>
                            <button className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                              item.status === 'Clean' ? 'bg-emerald-100 text-emerald-700' : 'bg-primary text-white'
                            }`}>
                              {item.status}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-black text-gray-900 mb-8">Single-window Routing Insights</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-6">
                          <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                             <div className="text-2xl font-black text-indigo-600 mb-1">94.2%</div>
                             <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Auto-Routing Accuracy</div>
                             <p className="text-xs text-indigo-600/70 mt-4 leading-relaxed">AI correctly identified target departments for 1.2M requests this month.</p>
                          </div>
                          <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
                             <div className="text-2xl font-black text-amber-600 mb-1">2.4 Hours</div>
                             <div className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Avg. Initial Assignment</div>
                             <p className="text-xs text-amber-600/70 mt-4 leading-relaxed">Down from 72 hours since implementing NLP-based triage.</p>
                          </div>
                       </div>
                       <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                          <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Common Triage Conflict</h4>
                          <div className="space-y-4">
                             {[
                               { label: "Revenue vs MAUD", val: 45, color: "bg-blue-500" },
                               { label: "Home vs Law", val: 25, color: "bg-indigo-500" },
                               { label: "Education vs BCW", val: 30, color: "bg-emerald-500" },
                             ].map((risk, i) => (
                               <div key={i} className="space-y-1.5">
                                 <div className="flex justify-between text-[8px] font-black uppercase text-gray-500">
                                   <span>{risk.label}</span>
                                   <span>{risk.val}%</span>
                                 </div>
                                 <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                                   <div className={`h-full ${risk.color}`} style={{ width: `${risk.val}%` }} />
                                 </div>
                               </div>
                             ))}
                          </div>
                          <button className="w-full mt-6 py-3 bg-white text-primary border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all">Refine NLP Model</button>
                       </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="bg-rose-50 p-8 rounded-3xl border border-rose-100 shadow-sm">
                    <h2 className="text-lg font-black text-rose-600 mb-8 flex items-center gap-2">
                      <Clock className="h-5 w-5" /> Deadline Alerts
                    </h2>
                    <div className="space-y-6">
                       {[
                         { id: "TSRTI/2026/044", time: "Expired 2 days ago", dept: "Municipal Admin", level: "Critical" },
                         { id: "TSRTI/2026/128", time: "Due in 18 hours", dept: "Health & FW", level: "High" },
                         { id: "TSRTI/2026/089", time: "Due in 3 days", dept: "Police Dept", level: "Warning" },
                       ].map((alert, i) => (
                         <div key={i} className="flex gap-4">
                            <div className={`h-2 w-2 rounded-full mt-2 shrink-0 ${
                              alert.level === 'Critical' ? 'bg-rose-600 animate-pulse' : (alert.level === 'High' ? 'bg-amber-500' : 'bg-blue-500')
                            }`} />
                            <div>
                               <div className="text-[10px] font-black text-rose-600/60 uppercase">{alert.time}</div>
                               <div className="font-bold text-gray-900 text-sm">{alert.id}</div>
                               <div className="text-[10px] font-bold text-gray-400 uppercase">{alert.dept}</div>
                            </div>
                         </div>
                       ))}
                       <button className="w-full mt-4 py-4 bg-rose-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-700 transition-all shadow-lg shadow-rose-200">Send Escalation Notices</button>
                    </div>
                  </div>

                  <div className="bg-indigo-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
                    <Fingerprint className="absolute -bottom-4 -right-4 h-32 w-32 text-white/5" />
                    <h3 className="text-xl font-black mb-4 relative z-10">Proactive Disclosure Control</h3>
                    <p className="text-xs text-indigo-200 mb-8 leading-relaxed relative z-10">Configuring automatic publication of 128 "High Demand" datasets to the Public Archive.</p>
                    <div className="space-y-4 relative z-10">
                       <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
                          <span className="text-[10px] font-bold uppercase tracking-widest">Tender Archive</span>
                          <div className="h-4 w-8 bg-emerald-500 rounded-full relative"><div className="absolute right-1 top-1 h-2 w-2 bg-white rounded-full" /></div>
                       </div>
                       <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
                          <span className="text-[10px] font-bold uppercase tracking-widest">Budget Live-sync</span>
                          <div className="h-4 w-8 bg-emerald-500 rounded-full relative"><div className="absolute right-1 top-1 h-2 w-2 bg-white rounded-full" /></div>
                       </div>
                    </div>
                    <button className="w-full mt-8 py-4 bg-white text-primary rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all relative z-10">Manage Disclosure Rules</button>
                  </div>
                </div>
              </div>

              {/* Public Request Archive Monitoring */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                  <div>
                    <h2 className="text-lg font-black text-gray-900">Public Archive Live Feed</h2>
                    <p className="text-xs text-gray-500">Auto-published responses in machine-readable JSON/CSV formats.</p>
                  </div>
                  <button className="px-6 py-3 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20">Open Public Portal</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <tr>
                        <th className="px-8 py-5">Topic</th>
                        <th className="px-8 py-5">Dept</th>
                        <th className="px-8 py-5">Published</th>
                        <th className="px-8 py-5">Format</th>
                        <th className="px-8 py-5 text-right">Views</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {[
                        { topic: "State Infrastructure Budget FY 25", dept: "Finance", date: "Today, 09:00", format: "JSON/CSV" },
                        { topic: "Primary School Staff List - Nalgonda", dept: "Education", date: "Today, 08:30", format: "CSV" },
                        { topic: "Pollution Control Board Reports", dept: "Environment", date: "Yesterday", format: "JSON" },
                      ].map((pub, i) => (
                        <tr key={i} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="px-8 py-5 font-bold text-gray-700">{pub.topic}</td>
                          <td className="px-8 py-5 text-gray-500 font-medium">{pub.dept}</td>
                          <td className="px-8 py-5 text-gray-500 font-medium">{pub.date}</td>
                          <td className="px-8 py-5">
                            <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[8px] font-black rounded-md uppercase">{pub.format}</span>
                          </td>
                          <td className="px-8 py-5 text-right font-black text-primary">{(i+1)*1240}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="citizen-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                  <h2 className="text-xl font-black text-gray-900 mb-8">Application Velocity</h2>
                  <div className="flex items-end gap-4 h-48 mb-6">
                    {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                      <div key={i} className="flex-grow group relative">
                        <div className={`w-full rounded-t-xl transition-all cursor-pointer ${i === 3 ? 'bg-primary' : 'bg-primary/10 hover:bg-primary/30'}`} style={{ height: `${h}%` }} />
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

                {loading ? (
                   <div className="space-y-4">
                     {[1, 2].map(i => <div key={i} className="h-40 w-full bg-white border border-gray-100 rounded-3xl animate-pulse" />)}
                   </div>
                ) : applications.length === 0 ? (
                  <div className="p-12 bg-white rounded-3xl border border-dashed text-center text-gray-400">No applications found.</div>
                ) : (
                  applications.map((app, i) => (
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} key={app.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                            <GraduationCap className="h-6 w-6" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{app.registrationNumber}</span>
                            </div>
                            <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{app.subject}</h3>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          app.status.toLowerCase() === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {app.status}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 text-sm">
                        <div>
                          <div className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Department</div>
                          <div className="font-bold text-gray-700">{app.departmentName}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Applied On</div>
                          <div className="font-bold text-gray-700">{app.createdAt.split('T')[0]}</div>
                        </div>
                      </div>
                      <div className="flex gap-3 pt-6 border-t border-gray-50">
                        <button onClick={() => setSelectedApp(app)} className="text-xs font-black text-primary px-5 py-2.5 bg-primary/5 rounded-xl hover:bg-primary/10 transition-all flex items-center gap-2">
                          <Info className="h-4 w-4" /> View Response
                        </button>
                        {app.status.toLowerCase() === 'completed' && (
                          <button className="text-xs font-black text-emerald-600 px-5 py-2.5 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-all flex items-center gap-2">
                            <Download className="h-4 w-4" /> Download PDF
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
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
                        <div className={`absolute left-0 top-1 h-8 w-8 rounded-full border-4 border-white shadow-sm flex items-center justify-center text-[10px] font-black ${step.active ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
                          {i+1}
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-gray-400 uppercase">{step.time}</div>
                          <div className={`text-sm font-bold mt-0.5 ${step.active ? 'text-gray-900' : 'text-gray-500'}`}>{step.event}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-[#003366] p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                  <h3 className="text-xl font-black mb-4 relative z-10">Need Help?</h3>
                  <button className="w-full py-4 bg-white text-primary rounded-2xl text-xs font-black hover:bg-blue-50 transition-all relative z-10 shadow-lg">View Templates</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Response Detail Modal */}
      <AnimatePresence>
        {selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedApp(null)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-8 bg-primary text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-black text-blue-200 uppercase tracking-widest">{selectedApp.registrationNumber}</span>
                    <h2 className="text-2xl font-black mt-1 leading-tight">{selectedApp.subject}</h2>
                  </div>
                  <button onClick={() => setSelectedApp(null)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
                 <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                    <div className="flex items-center gap-2 mb-4">
                       <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-white">
                          <CheckCircle2 className="h-5 w-5" />
                       </div>
                       <h3 className="font-black text-primary">Official Response from Department</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed font-medium italic">
                       "{selectedApp.response?.text || "The department is currently processing your request. Detailed information will be provided once the verification is complete."}"
                    </p>
                    <div className="mt-6 flex justify-between items-end border-t border-blue-100 pt-4">
                       <div className="text-[10px] font-bold text-gray-500 uppercase">
                          Replied By: <span className="text-primary">{selectedApp.response?.repliedBy || "PIO Officer"}</span>
                       </div>
                       <div className="text-[10px] font-bold text-gray-500 uppercase">
                          Date: <span className="text-primary">{selectedApp.response?.repliedOn || selectedApp.updatedAt.split('T')[0]}</span>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Provided Documents</h4>
                    {selectedApp.documents && selectedApp.documents.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedApp.documents.map((doc: any, i: number) => (
                           <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between group hover:border-primary/30 transition-all">
                              <div className="flex items-center gap-3">
                                 <FileText className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
                                 <span className="text-xs font-bold text-gray-600 truncate max-w-[120px]">{doc.name}</span>
                              </div>
                              <button className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-colors">
                                 <Download className="h-4 w-4" />
                              </button>
                           </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400 italic">No documents attached to this response.</p>
                    )}
                 </div>

                 <div className="space-y-4">
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Your Request Description</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{selectedApp.description}</p>
                 </div>
              </div>
              <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                <button onClick={() => setSelectedApp(null)} className="px-6 py-3 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors">Close</button>
                <button className="px-8 py-3 bg-secondary text-primary font-black rounded-xl hover:bg-secondary-light shadow-lg shadow-secondary/10 transition-all">File First Appeal</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

