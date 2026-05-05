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
              {/* PIO Header */}
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
                 <div>
                    <h2 className="text-2xl font-black text-gray-900">RTI Internal Dashboard</h2>
                    <p className="text-sm font-bold text-gray-500">Telangana State — PIO Workstation</p>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="text-right">
                       <div className="text-sm font-black text-gray-900">K. Ramaiah, PIO</div>
                       <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Employee ID: TS-9821</div>
                    </div>
                    <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center text-white font-black text-lg shadow-lg">KR</div>
                 </div>
              </div>

              {/* Top Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                 {[
                   { label: "Total pending", val: "84", sub: "12 due today", color: "text-gray-900", bg: "bg-white" },
                   { label: "Overdue", val: "19", sub: "Action needed", color: "text-rose-600", bg: "bg-rose-50/30 border-rose-100" },
                   { label: "Resolved (month)", val: "143", sub: "+8% vs last month", color: "text-emerald-600", bg: "bg-white" },
                   { label: "Avg response", val: "18d", sub: "Target: 30d", color: "text-amber-600", bg: "bg-white" },
                   { label: "First appeals", val: "11", sub: "3 pending reply", color: "text-rose-600", bg: "bg-white" },
                 ].map((stat, i) => (
                    <div key={i} className={`p-6 rounded-3xl border border-gray-100 shadow-sm ${stat.bg}`}>
                       <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</div>
                       <div className={`text-3xl font-black ${stat.color} mb-1`}>{stat.val}</div>
                       <div className={`text-[10px] font-bold ${stat.sub.includes('+') ? 'text-emerald-600' : (stat.sub.includes('Action') ? 'text-rose-500' : 'text-gray-400')}`}>
                          {stat.sub}
                       </div>
                    </div>
                 ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 {/* My Queue */}
                 <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                       <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">My Queue</h3>
                       <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">View All</button>
                    </div>
                    <div className="flex-grow">
                       {[
                         { id: "RTI-2026-04821", dept: "Roads & Buildings", status: "Overdue 5d", color: "rose" },
                         { id: "RTI-2026-04834", dept: "Revenue Dept", status: "Due in 2d", color: "amber" },
                         { id: "RTI-2026-04851", dept: "GHMC", status: "New — 28d left", color: "blue" },
                         { id: "RTI-2026-04799", dept: "Panchayat Raj", status: "Replied", color: "emerald" },
                         { id: "RTI-2026-04712", dept: "Health & FW", status: "Overdue 11d", color: "rose" },
                       ].map((item, i) => (
                          <div key={i} className="p-6 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-all cursor-pointer group">
                             <div className="flex justify-between items-center">
                                <div>
                                   <div className="text-sm font-black text-gray-900 group-hover:text-primary transition-colors">{item.id}</div>
                                   <div className="text-xs font-bold text-gray-400">{item.dept}</div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                   item.color === 'rose' ? 'bg-rose-50 text-rose-600' : 
                                   (item.color === 'amber' ? 'bg-amber-50 text-amber-600' : 
                                   (item.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'))
                                }`}>
                                   {item.status}
                                </span>
                             </div>
                          </div>
                       ))}
                    </div>
                    <div className="p-4 flex justify-center">
                       <div className="h-10 w-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-100 shadow-inner">
                          <ArrowRight className="h-5 w-5 rotate-90" />
                       </div>
                    </div>
                 </div>

                 {/* Alerts */}
                 <div className="bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col">
                    <div className="p-8 border-b border-gray-50">
                       <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Alerts</h3>
                    </div>
                    <div className="p-8 space-y-8 flex-grow">
                       {[
                         { title: "RTI-04821 is 5 days overdue — auto-escalation triggered to TSIC", time: "Today, 9:14 AM", color: "rose", action: true },
                         { title: "3 requests due within 48 hours — respond before deadline", time: "Today, 8:00 AM", color: "amber" },
                         { title: "First appeal RTI-04512 assigned for review by FAA", time: "Yesterday, 4:30 PM", color: "blue" },
                         { title: "Monthly compliance report auto-generated and submitted", time: "May 1, 2026", color: "emerald" },
                       ].map((alert, i) => (
                          <div key={i} className="flex gap-4">
                             <div className={`h-2.5 w-2.5 rounded-full mt-1.5 shrink-0 ${
                                alert.color === 'rose' ? 'bg-rose-600' : 
                                (alert.color === 'amber' ? 'bg-amber-500' : 
                                (alert.color === 'emerald' ? 'bg-emerald-500' : 'bg-blue-500'))
                             }`} />
                             <div className="space-y-3 flex-grow">
                                <div>
                                   <div className="text-sm font-bold text-gray-700 leading-relaxed">{alert.title}</div>
                                   <div className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">{alert.time}</div>
                                </div>
                                {alert.action && (
                                   <button className="px-5 py-2.5 border-2 border-gray-100 text-gray-600 rounded-xl text-xs font-black hover:bg-gray-50 transition-all flex items-center gap-2">
                                      Draft response <ArrowRight className="h-3 w-3" />
                                   </button>
                                )}
                                {i < 3 && <div className="w-full h-px bg-gray-50 mt-8" />}
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>

              {/* Workload & Category Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-8">Department Workload</h3>
                    <div className="space-y-6">
                       {[
                         { name: "Roads & Buildi...", val: 23, total: 30, color: "bg-rose-500" },
                         { name: "Revenue", val: 16, total: 30, color: "bg-amber-500" },
                         { name: "GHMC", val: 14, total: 30, color: "bg-amber-500" },
                         { name: "Panchayat Raj", val: 10, total: 30, color: "bg-blue-500" },
                         { name: "Health & FW", val: 8, total: 30, color: "bg-blue-500" },
                         { name: "Agriculture", val: 5, total: 30, color: "bg-emerald-500" },
                         { name: "Others", val: 8, total: 30, color: "bg-gray-400" },
                       ].map((dept, i) => (
                          <div key={i} className="flex items-center gap-6">
                             <div className="w-24 text-[11px] font-black text-gray-600 truncate">{dept.name}</div>
                             <div className="flex-grow h-2 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div 
                                   initial={{ width: 0 }}
                                   animate={{ width: `${(dept.val / dept.total) * 100}%` }}
                                   className={`h-full ${dept.color}`}
                                />
                             </div>
                             <div className="w-4 text-xs font-black text-gray-900 text-right">{dept.val}</div>
                          </div>
                       ))}
                    </div>
                 </div>

                 <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-8">Response Time by Category</h3>
                    <div className="space-y-6">
                       {[
                         { cat: "Land & property records", time: "26d avg", color: "text-rose-600" },
                         { cat: "FIR & police matters", time: "24d avg", color: "text-rose-600" },
                         { cat: "Tenders & contracts", time: "19d avg", color: "text-amber-600" },
                         { cat: "Road & civic works", time: "17d avg", color: "text-amber-600" },
                         { cat: "Welfare schemes", time: "13d avg", color: "text-emerald-600" },
                         { cat: "Education records", time: "11d avg", color: "text-emerald-600" },
                       ].map((cat, i) => (
                          <div key={i} className="flex justify-between items-center group">
                             <div className="text-sm font-bold text-gray-600 group-hover:text-gray-900 transition-colors">{cat.cat}</div>
                             <div className={`text-sm font-black ${cat.color}`}>{cat.time}</div>
                          </div>
                       ))}
                       <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
                          <div className="text-sm font-black text-gray-900">Statutory limit</div>
                          <div className="text-sm font-black text-gray-900">30 days</div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Advanced Proactive Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
                 {[
                   { label: "Citizen Satisfaction", val: "4.8/5", sub: "Based on 1.2k reviews", icon: Award, color: "text-primary" },
                   { label: "Appeal Disposal Rate", val: "92%", sub: "Legal compliance high", icon: Gavel, color: "text-secondary" },
                   { label: "Data Openness Index", val: "A+", sub: "Top performing state", icon: Database, color: "text-emerald-600" },
                 ].map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6 group hover:shadow-lg transition-all">
                       <div className="h-14 w-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                          <stat.icon className={`h-7 w-7`} />
                       </div>
                       <div>
                          <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</div>
                          <div className="text-2xl font-black text-gray-900">{stat.val}</div>
                          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.sub}</div>
                       </div>
                    </div>
                 ))}
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

