"use client";

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface RepairOrderForm2Props {
  onBack: () => void;
  onSubmit?: (data: {
    workNumber: string;
    vehicleInfo: string;
    problemDescription: string;
  }) => void;
}

export default function RepairOrderForm2({
  onBack,
  onSubmit,
}: RepairOrderForm2Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialWorkNumber = searchParams.get("workNumber") || "";
  const initialVehicleInfo = searchParams.get("vehicleInfo") || "";
  const initialProblem = searchParams.get("problem") || "";

  const [workNumber, setWorkNumber] = useState(initialWorkNumber);
  const [vehicleInfo, setVehicleInfo] = useState(initialVehicleInfo);
  const [problemDescription, setProblemDescription] = useState(initialProblem);

  useEffect(() => {
    // update state if query params change
    setWorkNumber(initialWorkNumber);
    setVehicleInfo(initialVehicleInfo);
    setProblemDescription(initialProblem);
  }, [initialWorkNumber, initialVehicleInfo, initialProblem]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      workNumber,
      vehicleInfo,
      problemDescription,
    };

    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.log(formData);
      alert("Repair order submitted successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-600 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="relative mb-12">
          <button
            onClick={() => router.replace("/")}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-semibold text-white text-center">
            Repair Order
          </h1>
        </div>

        <div className="bg-slate-800/40 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Work Number*
              </label>
              <input
                type="text"
                value={workNumber}
                onChange={(e) => setWorkNumber(e.target.value)}
                placeholder="2024-1543"
                required
                className="w-full px-5 py-4 bg-slate-700/50 border border-slate-600 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Vehicle Information*
              </label>
              <input
                type="text"
                value={vehicleInfo}
                onChange={(e) => setVehicleInfo(e.target.value)}
                placeholder="2019 Honda Civic"
                required
                className="w-full px-5 py-4 bg-slate-700/50 border border-slate-600 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Problem Description*
              </label>
              <textarea
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                placeholder="Customer reports unusual grinding noise when braking and steering wheel vibration at high speeds"
                required
                rows={4}
                className="w-full px-5 py-4 bg-slate-700/50 border border-slate-600 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold rounded-full hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              Submit Repair Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
