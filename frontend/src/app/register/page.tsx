"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  UserPlus, 
  RotateCcw, 
  Shield, 
  RefreshCw, 
  ChevronRight,
  LogOut
} from "lucide-react";
import Link from "next/link";
import { apiRequest } from "@/lib/api";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    country: "India",
    state: "",
    pin: "",
    mobileNumber: "",
    securityCode: ""
  });
  const [isAccepted, setIsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      name: "",
      surname: "",
      gender: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      country: "India",
      state: "",
      pin: "",
      mobileNumber: "",
      securityCode: ""
    });
    setIsAccepted(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAccepted) {
      alert("Please accept the terms and conditions.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    
    setIsLoading(true);
    try {
      await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: `${formData.name} ${formData.surname}`,
          email: formData.email,
          password: formData.password
        }),
      });
      alert("Registration successful! Please login.");
      router.push("/login");
    } catch (err: any) {
      alert(err.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-100">
            <h1 className="text-xl font-bold text-[#1e293b]">Registration Form</h1>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Top Row: Name, Surname, Gender */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <label className="block text-[15px] font-medium text-[#475569] mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 placeholder:text-gray-300 transition-all"
                  required
                />
                <p className="mt-1.5 text-[13px] text-gray-400">Please enter your name</p>
              </div>
              <div>
                <label className="block text-[15px] font-medium text-[#475569] mb-2">Surname</label>
                <input
                  type="text"
                  name="surname"
                  placeholder="Surname"
                  value={formData.surname}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 placeholder:text-gray-300 transition-all"
                  required
                />
                <p className="mt-1.5 text-[13px] text-gray-400">Please enter your surname</p>
              </div>
              <div>
                <label className="block text-[15px] font-medium text-[#475569] mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_1rem_center] bg-no-repeat transition-all"
                  required
                >
                  <option value="" disabled>Select a Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <p className="mt-1.5 text-[13px] text-gray-400">Select your gender</p>
              </div>
            </div>

            {/* Second Row: Email, Password, Confirm Password */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 border-t border-dashed border-gray-100">
              <div>
                <label className="block text-[15px] font-medium text-[#475569] mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 placeholder:text-gray-300 transition-all"
                  required
                />
                <p className="mt-1.5 text-[13px] text-gray-400">Please enter your email</p>
              </div>
              <div>
                <label className="block text-[15px] font-medium text-[#475569] mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 placeholder:text-gray-300 transition-all"
                  required
                />
                <p className="mt-2 text-[12px] text-red-500 leading-relaxed font-medium">
                  Password must be 8-20 characters long and include uppercase letters, lowercase letters, numbers, and special characters.
                </p>
              </div>
              <div>
                <label className="block text-[15px] font-medium text-[#475569] mb-2">Confirm password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 placeholder:text-gray-300 transition-all"
                  required
                />
                <p className="mt-2 text-[12px] text-red-500 leading-relaxed font-medium">
                  Password must be 8-20 characters long and include uppercase letters, lowercase letters, numbers, and special characters.
                </p>
              </div>
            </div>

            {/* Address Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-4">
              <div className="md:col-span-1">
                <label className="block text-[15px] font-medium text-[#475569] mt-3">Address</label>
              </div>
              <div className="md:col-span-2">
                <textarea
                  name="address"
                  placeholder="Address Details"
                  rows={4}
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 placeholder:text-gray-300 transition-all resize-none"
                  required
                ></textarea>
                <p className="mt-1.5 text-[13px] text-gray-400">Please enter your address</p>
              </div>
            </div>

            {/* Country Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-1">
                <label className="block text-[15px] font-medium text-[#475569] mt-3">Country</label>
              </div>
              <div className="md:col-span-2">
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 transition-all"
                  readOnly
                />
                <p className="mt-1.5 text-[13px] text-gray-400">Please enter your country</p>
              </div>
            </div>

            {/* State Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-1">
                <label className="block text-[15px] font-medium text-[#475569] mt-3">State</label>
              </div>
              <div className="md:col-span-2">
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_1rem_center] bg-no-repeat transition-all"
                  required
                >
                  <option value="" disabled>Select a State</option>
                  <option value="telangana">Telangana</option>
                  <option value="andhra_pradesh">Andhra Pradesh</option>
                  <option value="karnataka">Karnataka</option>
                  <option value="maharashtra">Maharashtra</option>
                </select>
                <p className="mt-1.5 text-[13px] text-gray-400">Select your state</p>
              </div>
            </div>

            {/* Pin Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-1">
                <label className="block text-[15px] font-medium text-[#475569] mt-3">Pin</label>
              </div>
              <div className="md:col-span-2">
                <input
                  type="text"
                  name="pin"
                  placeholder="Pin Code"
                  value={formData.pin}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 placeholder:text-gray-300 transition-all"
                  required
                />
                <p className="mt-1.5 text-[13px] text-gray-400">Please enter your pincode</p>
              </div>
            </div>

            {/* MobileNumber Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-1">
                <label className="block text-[15px] font-medium text-[#475569] mt-3">MobileNumber</label>
              </div>
              <div className="md:col-span-2">
                <input
                  type="tel"
                  name="mobileNumber"
                  placeholder="Mobile Number"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 placeholder:text-gray-300 transition-all"
                  required
                />
                <p className="mt-1.5 text-[13px] text-gray-400">Please enter your mobile number</p>
              </div>
            </div>

            {/* Captcha Row */}
            <div className="pt-4 space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-[#555] px-6 py-3 rounded text-white text-3xl font-bold tracking-[0.2em] select-none shadow-inner" style={{ backgroundImage: 'linear-gradient(45deg, #444 25%, transparent 25%), linear-gradient(-45deg, #444 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #444 75%), linear-gradient(-45deg, transparent 75%, #444 75%)', backgroundColor: '#333', backgroundSize: '10px 10px' }}>
                  274026
                </div>
                <button type="button" className="text-gray-600 hover:text-primary transition-colors">
                  <RefreshCw className="h-6 w-6" />
                </button>
              </div>
              <div className="w-full md:w-1/3">
                <input
                  type="text"
                  name="securityCode"
                  placeholder="Enter Security code"
                  value={formData.securityCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 placeholder:text-gray-300 transition-all"
                  required
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="pt-6 flex gap-4 items-start">
              <input
                type="checkbox"
                checked={isAccepted}
                onChange={(e) => setIsAccepted(e.target.checked)}
                className="mt-1.5 h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary transition-all cursor-pointer"
                required
              />
              <p className="text-[14px] text-gray-700 leading-relaxed">
                By submitting this application form, I accept and understand that any personal information submitted by me, is to the best of my knowledge both true and correct, and that I understand that any false or inaccurate information or documentation submitted may render the application inadmissable and I may be subject to legal action.
              </p>
            </div>

            {/* Buttons */}
            <div className="pt-10 flex justify-center gap-4 border-t border-gray-100">
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 px-8 py-3 bg-[#0284c7] text-white font-bold rounded shadow-sm hover:bg-[#0369a1] transition-all disabled:opacity-50"
              >
                <LogOut className="h-5 w-5 transform rotate-180" />
                Register
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-2 px-8 py-3 bg-[#e2e8f0] text-[#475569] font-bold rounded shadow-sm hover:bg-[#cbd5e1] transition-all"
              >
                <RotateCcw className="h-5 w-5" />
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Help Icon Bottom Right */}
      <div className="fixed bottom-8 right-8">
        <div className="h-14 w-14 bg-[#0284c7] rounded-full flex items-center justify-center text-white shadow-xl cursor-pointer hover:bg-[#0369a1] transition-all">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
