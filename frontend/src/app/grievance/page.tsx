"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  AlertCircle, 
  Send, 
  CheckCircle2, 
  Loader2, 
  MessageSquare,
  User,
  Mail,
  Phone,
  FileText
} from "lucide-react";
import Link from "next/link";

export default function GrievancePage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    rtiRef: "",
    subject: "",
    description: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl border border-gray-100 text-center"
        >
          <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Grievance Registered!</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Your grievance has been successfully lodged. You will receive an update via email/SMS shortly. 
            Your reference number is <span className="font-bold text-primary">GRV/2026/8842</span>.
          </p>
          <Link 
            href="/"
            className="inline-block w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
          >
            Return to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-50 text-red-600 text-xs font-bold rounded-full mb-4 uppercase tracking-widest"
          >
            <AlertCircle className="h-4 w-4" /> Grievance Redressal Cell
          </motion.div>
          <h1 className="text-4xl font-black text-gray-900 mb-4">Lodge a Grievance</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Please provide accurate details about your concern. Our officers will investigate and respond within 7 working days.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="bg-primary p-8 text-white">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-white/10 rounded-xl flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Grievance Form</h3>
                <p className="text-blue-100 text-sm">Fill in the details below to escalate your issue.</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Applicant Info */}
              <div className="space-y-6">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Personal Information</h4>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="+91 9876543210"
                    />
                  </div>
                </div>
              </div>

              {/* Grievance Info */}
              <div className="space-y-6">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Concern Details</h4>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">RTI Application No. (Optional)</label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="rtiRef"
                      value={formData.rtiRef}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="e.g. TSRTI/2026/001"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Short summary of the issue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Detailed Description</label>
                  <textarea
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    placeholder="Describe your issue in detail..."
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group px-10 py-4 bg-primary text-white font-black rounded-2xl hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 flex items-center gap-3 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    Submit Grievance <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
