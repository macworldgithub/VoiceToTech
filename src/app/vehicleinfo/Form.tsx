// "use client";

// import { useState, useEffect } from "react";
// import { ArrowLeft } from "lucide-react";
// import { useRouter, useSearchParams } from "next/navigation";

// interface RepairOrderForm2Props {
//   onSubmit?: (data: {
//     workNumber: string;
//     vehicleInfo: string;
//     problemDescription: string;
//   }) => void;
// }

// export default function Form({ onSubmit }: RepairOrderForm2Props) {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const initialWorkNumber = searchParams.get("workNumber") || "";
//   const initialVehicleInfo = searchParams.get("vehicleInfo") || "";
//   const initialProblem = searchParams.get("problem") || "";

//   const [workNumber, setWorkNumber] = useState(initialWorkNumber);
//   const [vehicleInfo, setVehicleInfo] = useState(initialVehicleInfo);
//   const [problemDescription, setProblemDescription] = useState(initialProblem);

//   useEffect(() => {
//     // update state if query params change
//     setWorkNumber(initialWorkNumber);
//     setVehicleInfo(initialVehicleInfo);
//     setProblemDescription(initialProblem);
//   }, [initialWorkNumber, initialVehicleInfo, initialProblem]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const formData = {
//       workNumber,
//       vehicleInfo,
//       problemDescription,
//     };

//     if (onSubmit) {
//       onSubmit(formData);
//     } else {
//       console.log(formData);
//       alert("Repair order submitted successfully!");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-600 via-purple-900 to-slate-900 flex items-center justify-center p-6">
//       <div className="w-full max-w-2xl">
//         <div className="relative mb-12">
//           <button
//             onClick={() => router.replace("/")}
//             className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all"
//           >
//             <ArrowLeft className="w-6 h-6" />
//           </button>
//           <h1 className="text-3xl font-semibold text-white text-center">
//             Repair Order
//           </h1>
//         </div>

//         <div className="bg-slate-800/40 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/10">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-white/80 mb-2">
//                 Work Number*
//               </label>
//               <input
//                 type="text"
//                 value={workNumber}
//                 onChange={(e) => setWorkNumber(e.target.value)}
//                 placeholder="2024-1543"
//                 required
//                 className="w-full px-5 py-4 bg-slate-700/50 border border-slate-600 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-white/80 mb-2">
//                 Vehicle Information*
//               </label>
//               <input
//                 type="text"
//                 value={vehicleInfo}
//                 onChange={(e) => setVehicleInfo(e.target.value)}
//                 placeholder="2019 Honda Civic"
//                 required
//                 className="w-full px-5 py-4 bg-slate-700/50 border border-slate-600 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-white/80 mb-2">
//                 Problem Description*
//               </label>
//               <textarea
//                 value={problemDescription}
//                 onChange={(e) => setProblemDescription(e.target.value)}
//                 placeholder="Customer reports unusual grinding noise when braking and steering wheel vibration at high speeds"
//                 required
//                 rows={4}
//                 className="w-full px-5 py-4 bg-slate-700/50 border border-slate-600 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold rounded-full hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
//             >
//               Submit Repair Order
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Phone } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface RepairOrderForm2Props {
  onSubmit?: (data: {
    workNumber: string;
    vehicleInfo: string;
    problemDescription: string;
  }) => void;
}

export default function Form({ onSubmit }: RepairOrderForm2Props) {
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
    <div className="min-h-screen bg-[#F4F6F8] flex flex-col">
      {/* Sticky glass header — matches the capture screen */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-black/[0.06]">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 ring-1 ring-black/[0.06]">
              <div className="absolute inset-0 bg-[#1a73c2]" style={{ clipPath: "polygon(0 0, 100% 0, 100% 55%, 0 55%)" }} />
              <div className="absolute inset-0 bg-[#f2b90c]" style={{ clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)" }} />
            </div>
            <div className="leading-tight">
              <div className="text-[15px] font-semibold text-[#0E1013] tracking-tight">
                Patterson Cheney
              </div>
              <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-black/40">
                Workshop Tools
              </div>
            </div>
          </div>
          <a
            href="tel:0395905000"
            className="flex items-center gap-2 text-sm font-medium text-[#1a73c2] hover:text-[#0F4C81] transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">03 9590 5000</span>
          </a>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-14">
        <div className="w-full max-w-xl">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => router.replace("/")}
              aria-label="Back to recording"
              className="w-11 h-11 shrink-0 rounded-full bg-white border border-black/[0.08] shadow-sm flex items-center justify-center text-[#0E1013] hover:bg-black/[0.03] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73c2]"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1a73c2]" />
                <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-black/40">
                  Review &amp; confirm
                </span>
              </div>
              <h1 className="text-3xl font-bold text-[#0E1013] tracking-tight">
                Repair Order
              </h1>
            </div>
          </div>

          <div className="bg-white rounded-[28px] p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_40px_-16px_rgba(0,0,0,0.12)] border border-black/[0.06]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <label className="text-sm font-semibold text-[#0E1013]">
                    Work number
                  </label>
                  <span className="text-[10px] font-mono text-[#1a73c2]/60">
                    WORK_NO
                  </span>
                </div>
                <input
                  type="text"
                  value={workNumber}
                  onChange={(e) => setWorkNumber(e.target.value)}
                  placeholder="2024-1543"
                  required
                  className="w-full px-5 py-3.5 bg-[#F4F6F8] border border-black/[0.08] rounded-xl text-[#0E1013] placeholder-black/30 focus:outline-none focus:ring-2 focus:ring-[#1a73c2] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <label className="text-sm font-semibold text-[#0E1013]">
                    Vehicle information
                  </label>
                  <span className="text-[10px] font-mono text-[#1a73c2]/60">
                    VEHICLE
                  </span>
                </div>
                <input
                  type="text"
                  value={vehicleInfo}
                  onChange={(e) => setVehicleInfo(e.target.value)}
                  placeholder="2019 Honda Civic"
                  required
                  className="w-full px-5 py-3.5 bg-[#F4F6F8] border border-black/[0.08] rounded-xl text-[#0E1013] placeholder-black/30 focus:outline-none focus:ring-2 focus:ring-[#1a73c2] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <label className="text-sm font-semibold text-[#0E1013]">
                    Problem description
                  </label>
                  <span className="text-[10px] font-mono text-[#1a73c2]/60">
                    ISSUE
                  </span>
                </div>
                <textarea
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  placeholder="Customer reports unusual grinding noise when braking and steering wheel vibration at high speeds"
                  required
                  rows={4}
                  className="w-full px-5 py-3.5 bg-[#F4F6F8] border border-black/[0.08] rounded-xl text-[#0E1013] placeholder-black/30 focus:outline-none focus:ring-2 focus:ring-[#1a73c2] focus:border-transparent transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 bg-[#1a73c2] text-white text-[15px] font-semibold rounded-2xl hover:bg-[#155a99] active:scale-[0.99] transition-all duration-200 shadow-lg shadow-[#1a73c2]/20"
              >
                Submit repair order
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </main>

      <footer className="border-t border-black/[0.06] py-5">
        <div className="max-w-4xl mx-auto px-6 text-center text-[11px] font-mono uppercase tracking-[0.14em] text-black/30">
          Patterson Cheney Group — Internal Workshop Tool
        </div>
      </footer>
    </div>
  );
}
