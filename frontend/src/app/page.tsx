"use client";

import { motion } from "framer-motion";
import { 
  FileText, 
  Clock, 
  AlertCircle, 
  ArrowRight,
  ShieldCheck,
  Landmark,
  Scale,
  Gavel,
  Users,
  Activity,
  EyeOff,
  Zap,
  Database,
  Bell,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full mb-6 uppercase tracking-widest"
              >
                Government of Telangana
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl lg:text-7xl font-black text-gray-900 mb-8 leading-[1.1]"
              >
                Transparency in <span className="text-primary">Governance.</span> Empowering <span className="text-secondary">Citizens.</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
              >
                Access information from any state government department with ease. File applications, track status, and file appeals online through our unified RTI portal.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <Link href="/apply" className="px-8 py-4 bg-primary text-white rounded-2xl font-black hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 flex items-center gap-2 group">
                  File RTI Online <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/track" className="px-8 py-4 bg-white border-2 border-gray-100 text-gray-900 rounded-2xl font-black hover:bg-gray-50 transition-all flex items-center gap-2">
                  Track Application
                </Link>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 flex items-center justify-center gap-8 text-gray-400"
              >
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold">U{i}</div>
                  ))}
                </div>
                <p className="text-sm font-bold"><span className="text-gray-900">12,000+</span> citizens already registered this month</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Statistics Section */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: "RTI FILED", val: "22313", icon: FileText, color: "text-blue-600" },
              { label: "FIRST APPEAL FILED", val: "3471", icon: Scale, color: "text-amber-600" },
              { label: "PUBLIC AUTHORITIES", val: "3326", icon: Landmark, color: "text-indigo-600" },
              { label: "PIO ONBOARDED", val: "3253", icon: ShieldCheck, color: "text-emerald-600" },
              { label: "FAA ONBOARDED", val: "3270", icon: Gavel, color: "text-rose-600" },
              { label: "CITIZEN REGISTERED", val: "13326", icon: Users, color: "text-primary" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow group"
              >
                <div className={`mx-auto h-12 w-12 rounded-xl bg-gray-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="text-2xl font-black text-gray-900 mb-1">{stat.val}</div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About RTI Act Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="inline-block px-4 py-1.5 bg-blue-50 text-primary text-xs font-bold rounded-full mb-6 uppercase tracking-widest">Legal Framework</div>
              <h2 className="text-4xl font-black text-gray-900 mb-8 leading-tight">
                About the <span className="text-primary underline decoration-secondary decoration-4 underline-offset-8">RTI Act, 2005</span>
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  The Right to Information Act 2005 mandates timely response to citizen requests for government information. It is an initiative by Department of Personnel and Training, Ministry of Personnel, Public Grievances and Pensions to provide a– RTI Portal Gateway to the citizens for quick search of information.
                </p>
                <p>
                  The basic object of the Right to Information Act is to empower the citizens, promote transparency and accountability in the working of the Government, contain corruption, and make our democracy work for the people in real sense.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                  <div className="flex gap-4">
                    <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0 font-bold">01</div>
                    <p className="text-sm font-bold text-gray-700">Empowerment of Citizens to question authorities.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="h-10 w-10 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary shrink-0 font-bold">02</div>
                    <p className="text-sm font-bold text-gray-700">Transparency in decision making processes.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
              <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100 relative z-10">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-gray-900">
                  <Landmark className="h-6 w-6 text-primary" /> List of Public Authorities
                </h3>
                <div className="relative mb-6">
                  <input 
                    type="text" 
                    placeholder="Search department..." 
                    className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</div>
                </div>
                <div className="h-64 overflow-y-auto pr-4 custom-scrollbar space-y-3">
                  {[
                    "Animal Husbandry & Veterinary Department(DVH), Nalgonda",
                    "Animal Husbandry & Veterinary Department(ISDP), Nalgonda",
                    "Animal Husbandry & Veterinary Department(PVC), Chendurthi",
                    "Animal Husbandry & Veterinary Department(PVC), Hanmajipet",
                    "Animal Husbandry & Veterinary Department(PVC), Mustabad",
                    "Animal Husbandry & Veterinary Department(PVC), Vemulawada",
                    "Tahsildar Veenavanka",
                    "Agriculture & Cooperation Department",
                    "Backward Classes Welfare Department",
                    "Consumer Affairs Food & Civil Supplies",
                    "Energy Department",
                    "Environment Forests Science & Technology"
                  ].map((dept, i) => (
                    <div key={i} className="p-3 bg-white border border-gray-50 rounded-xl text-xs font-bold text-gray-600 hover:border-primary/30 hover:text-primary transition-all cursor-pointer flex items-center gap-3">
                      <span className="text-primary/50">{i + 1}.</span> {dept}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grievance Redressal Section */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full -mr-64 -mt-64 blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-black mb-8 leading-tight">
              Grievance Redressal <span className="text-secondary">Portal</span>
            </h2>
            <p className="text-lg text-blue-100 mb-12 leading-relaxed">
              Facing issues with your RTI application or not satisfied with the response? Our dedicated grievance redressal cell ensures your concerns are addressed by senior administrative officers.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="p-8 bg-white/10 rounded-3xl border border-white/10 backdrop-blur-sm group hover:bg-white/20 transition-all">
                <div className="h-12 w-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Clock className="h-6 w-6 text-secondary" />
                </div>
                <h4 className="font-bold mb-2">Track Status</h4>
                <p className="text-xs text-blue-200 uppercase font-bold tracking-widest">24/7 Monitoring</p>
              </div>
              <div className="p-8 bg-white/10 rounded-3xl border border-white/10 backdrop-blur-sm group hover:bg-white/20 transition-all">
                <div className="h-12 w-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Scale className="h-6 w-6 text-secondary" />
                </div>
                <h4 className="font-bold mb-2">Legal Aid</h4>
                <p className="text-xs text-blue-200 uppercase font-bold tracking-widest">Expert Guidance</p>
              </div>
              <div className="p-8 bg-white/10 rounded-3xl border border-white/10 backdrop-blur-sm group hover:bg-white/20 transition-all">
                <div className="h-12 w-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <AlertCircle className="h-6 w-6 text-secondary" />
                </div>
                <h4 className="font-bold mb-2">Lodge Complaint</h4>
                <p className="text-xs text-blue-200 uppercase font-bold tracking-widest">Direct Escalation</p>
              </div>
            </div>
            <Link href="/grievance" className="px-10 py-5 bg-secondary text-primary font-black rounded-2xl hover:bg-secondary-light transition-all shadow-xl shadow-secondary/20 flex items-center gap-3 mx-auto w-fit">
              Open Grievance Portal <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Next-Gen Features Section */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-full mb-4 uppercase tracking-widest">Innovation Spotlight</div>
            <h2 className="text-4xl font-black text-gray-900 mb-6">Next-Gen <span className="text-primary">Transparency</span> Engine</h2>
            <p className="text-gray-500 font-medium">Leveraging AI and modern data architecture to build India's most advanced Right to Information portal.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Public Request Archive", 
                desc: "Explore a searchable database of all past RTI requests and official responses to find info instantly.",
                icon: FileText,
                color: "text-blue-600",
                bg: "bg-blue-50"
              },
              { 
                title: "AI Document Processing", 
                desc: "Intelligent auto-redaction of sensitive personal info using LLMs before officer review.",
                icon: ShieldCheck,
                color: "text-purple-600",
                bg: "bg-purple-50"
              },
              { 
                title: "Real-time Dashboard", 
                desc: "Live visibility into department backlogs, average response times, and disposal rates.",
                icon: Activity,
                color: "text-amber-600",
                bg: "bg-amber-50"
              },
              { 
                title: "Anonymous Submissions", 
                desc: "Privacy-first filing mode allowing citizens to request info without exposing identity to departments.",
                icon: EyeOff,
                color: "text-gray-600",
                bg: "bg-gray-100"
              },
              { 
                title: "Single-window Routing", 
                desc: "Smart NLP engine that auto-routes your request to the correct department and PIO based on content.",
                icon: Zap,
                color: "text-yellow-600",
                bg: "bg-yellow-50"
              },
              { 
                title: "Open Data Delivery", 
                desc: "Download responses in machine-readable JSON/CSV formats for research and data journalism.",
                icon: Database,
                color: "text-emerald-600",
                bg: "bg-emerald-50"
              },
              { 
                title: "Crowdsourcing Tools", 
                desc: "Collaborate on batch requests for complex investigations involving multiple public authorities.",
                icon: Users,
                color: "text-indigo-600",
                bg: "bg-indigo-50"
              },
              { 
                title: "Automated Deadline Alerts", 
                desc: "Smart notifications for PIOs and citizens when a response is nearing the 30-day statutory limit.",
                icon: Bell,
                color: "text-rose-600",
                bg: "bg-rose-50"
              },
              { 
                title: "Proactive Disclosure", 
                desc: "Auto-publishing of frequently requested datasets without waiting for individual RTI filings.",
                icon: CheckCircle2,
                color: "text-cyan-600",
                bg: "bg-cyan-50"
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
              >
                <div className={`h-14 w-14 ${feature.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`h-7 w-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* News & Updates */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-2">News & Updates</h2>
              <p className="text-gray-500">Stay informed about the latest developments in RTI Telangana.</p>
            </div>
            <button className="text-sm font-bold text-primary flex items-center gap-2 hover:gap-3 transition-all">
              View All News <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex gap-6 items-start group cursor-pointer">
              <div className="h-24 w-24 bg-gray-100 rounded-lg shrink-0 overflow-hidden">
                <div className="w-full h-full bg-blue-900/10 flex items-center justify-center text-primary/40 font-bold">News</div>
              </div>
              <div>
                <span className="text-xs font-bold text-secondary uppercase">15 May 2026</span>
                <h4 className="text-lg font-bold group-hover:text-primary transition-colors mt-1 mb-2">New PIO Handbook Released for 2026</h4>
                <p className="text-sm text-gray-600 line-clamp-2">The Information Commission has released an updated handbook for Public Information Officers to ensure faster processing of requests.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start group cursor-pointer">
              <div className="h-24 w-24 bg-gray-100 rounded-lg shrink-0 overflow-hidden">
                <div className="w-full h-full bg-blue-900/10 flex items-center justify-center text-primary/40 font-bold">News</div>
              </div>
              <div>
                <span className="text-xs font-bold text-secondary uppercase">10 May 2026</span>
                <h4 className="text-lg font-bold group-hover:text-primary transition-colors mt-1 mb-2">Shri Chandrasekhar Reddy sworn in as CIC</h4>
                <p className="text-sm text-gray-600 line-clamp-2">His Excellency the Governor of Telangana administered the oath of office to the new Chief Information Commissioner.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
