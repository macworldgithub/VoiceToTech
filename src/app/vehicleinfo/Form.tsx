// "use client";

// import { useState, useEffect } from "react";
// import { ArrowLeft, ArrowRight, Phone } from "lucide-react";
// import { useRouter, useSearchParams } from "next/navigation";

// const PC_LOGO =
//   "https://nextgen-images.cdn.dealersolutions.com.au/modular.multisite.dealer.solutions/wp-content/uploads/sites/3044/2024/03/19140735/PC-Primary-logo2.png?format=webp&width=351";

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
//     <div className="min-h-[100dvh] bg-[#F4F6F8] flex flex-col">
//       {/* Sticky glass header — matches the capture screen */}
//       <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-black/[0.06]">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
//           {/* eslint-disable-next-line @next/next/no-img-element */}
//           <img
//             src={PC_LOGO}
//             alt="Patterson Cheney — Cars and Trucks since 1915"
//             className="h-8 sm:h-10 w-auto object-contain shrink-0"
//           />
//           <a
//             href="tel:0395905000"
//             className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-[#1a73c2] hover:text-[#0F4C81] transition-colors shrink-0"
//           >
//             <Phone className="w-3.5 h-3.5" />
//             <span className="hidden xs:inline sm:inline">03 9590 5000</span>
//           </a>
//         </div>
//       </header>

//       <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-14">
//         <div className="w-full max-w-xl">
//           <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
//             <button
//               onClick={() => router.replace("/")}
//               aria-label="Back to recording"
//               className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-full bg-white border border-black/[0.08] shadow-sm flex items-center justify-center text-[#0E1013] hover:bg-black/[0.03] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73c2]"
//             >
//               <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
//             </button>
//             <div>
//               <div className="flex items-center gap-2 mb-1">
//                 <span className="w-1.5 h-1.5 rounded-full bg-[#1a73c2] shrink-0" />
//                 <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.14em] sm:tracking-[0.18em] text-black/40">
//                   Review &amp; confirm
//                 </span>
//               </div>
//               <h1 className="text-2xl sm:text-3xl font-bold text-[#0E1013] tracking-tight">
//                 Repair Order
//               </h1>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl sm:rounded-[28px] p-5 sm:p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_40px_-16px_rgba(0,0,0,0.12)] border border-black/[0.06]">
//             <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
//               <div>
//                 <div className="flex items-baseline justify-between mb-2 gap-2">
//                   <label className="text-sm font-semibold text-[#0E1013]">
//                     Work number
//                   </label>
//                   <span className="text-[10px] font-mono text-[#1a73c2]/60 shrink-0">
//                     WORK_NO
//                   </span>
//                 </div>
//                 <input
//                   type="text"
//                   value={workNumber}
//                   onChange={(e) => setWorkNumber(e.target.value)}
//                   placeholder="2024-1543"
//                   required
//                   className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-[#F4F6F8] border border-black/[0.08] rounded-xl text-[#0E1013] placeholder-black/30 focus:outline-none focus:ring-2 focus:ring-[#1a73c2] focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <div className="flex items-baseline justify-between mb-2 gap-2">
//                   <label className="text-sm font-semibold text-[#0E1013]">
//                     Vehicle information
//                   </label>
//                   <span className="text-[10px] font-mono text-[#1a73c2]/60 shrink-0">
//                     VEHICLE
//                   </span>
//                 </div>
//                 <input
//                   type="text"
//                   value={vehicleInfo}
//                   onChange={(e) => setVehicleInfo(e.target.value)}
//                   placeholder="2019 Honda Civic"
//                   required
//                   className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-[#F4F6F8] border border-black/[0.08] rounded-xl text-[#0E1013] placeholder-black/30 focus:outline-none focus:ring-2 focus:ring-[#1a73c2] focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <div className="flex items-baseline justify-between mb-2 gap-2">
//                   <label className="text-sm font-semibold text-[#0E1013]">
//                     Problem description
//                   </label>
//                   <span className="text-[10px] font-mono text-[#1a73c2]/60 shrink-0">
//                     ISSUE
//                   </span>
//                 </div>
//                 <textarea
//                   value={problemDescription}
//                   onChange={(e) => setProblemDescription(e.target.value)}
//                   placeholder="Customer reports unusual grinding noise when braking and steering wheel vibration at high speeds"
//                   required
//                   rows={4}
//                   className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-[#F4F6F8] border border-black/[0.08] rounded-xl text-[#0E1013] placeholder-black/30 focus:outline-none focus:ring-2 focus:ring-[#1a73c2] focus:border-transparent transition-all resize-none"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full flex items-center justify-center gap-2 py-3.5 sm:py-4 bg-[#1a73c2] text-white text-sm sm:text-[15px] font-semibold rounded-2xl hover:bg-[#155a99] active:scale-[0.99] transition-all duration-200 shadow-lg shadow-[#1a73c2]/20"
//               >
//                 Submit repair order
//                 <ArrowRight className="w-4 h-4" />
//               </button>
//             </form>
//           </div>
//         </div>
//       </main>

//       <footer className="border-t border-black/[0.06] py-4 sm:py-5">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.1em] sm:tracking-[0.14em] text-black/30">
//           Patterson Cheney Group — Internal Workshop Tool
//         </div>
//       </footer>
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect, useMemo } from "react";
// import { ArrowLeft, ArrowRight, Phone, Film, ImageOff } from "lucide-react";
// import { useRouter, useSearchParams } from "next/navigation";

// const PC_LOGO =
//   "https://nextgen-images.cdn.dealersolutions.com.au/modular.multisite.dealer.solutions/wp-content/uploads/sites/3044/2024/03/19140735/PC-Primary-logo2.png?format=webp&width=351";

// interface RepairOrderForm2Props {
//   onSubmit?: (data: {
//     workNumber: string;
//     vehicleInfo: string;
//     problemDescription: string;
//     media: string[];
//   }) => void;
// }

// // Very small heuristic to decide how to render an attachment URL.
// const isVideoUrl = (url: string) =>
//   /\.(mp4|mov|webm|m4v|avi)(\?.*)?$/i.test(url);

// export default function Form({ onSubmit }: RepairOrderForm2Props) {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const initialWorkNumber = searchParams.get("workNumber") || "";
//   const initialVehicleInfo = searchParams.get("vehicleInfo") || "";
//   const initialProblem = searchParams.get("problem") || "";
//   const initialMediaRaw = searchParams.get("media") || "[]";

//   const initialMedia = useMemo<string[]>(() => {
//     try {
//       const parsed = JSON.parse(initialMediaRaw);
//       return Array.isArray(parsed) ? parsed.filter((u) => typeof u === "string") : [];
//     } catch {
//       return [];
//     }
//   }, [initialMediaRaw]);

//   const [workNumber, setWorkNumber] = useState(initialWorkNumber);
//   const [vehicleInfo, setVehicleInfo] = useState(initialVehicleInfo);
//   const [problemDescription, setProblemDescription] = useState(initialProblem);
//   const [media, setMedia] = useState<string[]>(initialMedia);

//   useEffect(() => {
//     // update state if query params change
//     setWorkNumber(initialWorkNumber);
//     setVehicleInfo(initialVehicleInfo);
//     setProblemDescription(initialProblem);
//     setMedia(initialMedia);
//   }, [initialWorkNumber, initialVehicleInfo, initialProblem, initialMedia]);

//   const removeMedia = (url: string) => {
//     setMedia((prev) => prev.filter((m) => m !== url));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const formData = {
//       workNumber,
//       vehicleInfo,
//       problemDescription,
//       media,
//     };

//     if (onSubmit) {
//       onSubmit(formData);
//     } else {
//       console.log(formData);
//       alert("Repair order submitted successfully!");
//     }
//   };

//   return (
//     <div className="min-h-[100dvh] bg-[#F4F6F8] flex flex-col">
//       {/* Sticky glass header — matches the capture screen */}
//       <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-black/[0.06]">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
//           {/* eslint-disable-next-line @next/next/no-img-element */}
//           <img
//             src={PC_LOGO}
//             alt="Patterson Cheney — Cars and Trucks since 1915"
//             className="h-8 sm:h-10 w-auto object-contain shrink-0"
//           />
//           <a
//             href="tel:0395905000"
//             className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-[#1a73c2] hover:text-[#0F4C81] transition-colors shrink-0"
//           >
//             <Phone className="w-3.5 h-3.5" />
//             <span className="hidden xs:inline sm:inline">03 9590 5000</span>
//           </a>
//         </div>
//       </header>

//       <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-14">
//         <div className="w-full max-w-xl">
//           <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
//             <button
//               onClick={() => router.replace("/")}
//               aria-label="Back to recording"
//               className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-full bg-white border border-black/[0.08] shadow-sm flex items-center justify-center text-[#0E1013] hover:bg-black/[0.03] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73c2]"
//             >
//               <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
//             </button>
//             <div>
//               <div className="flex items-center gap-2 mb-1">
//                 <span className="w-1.5 h-1.5 rounded-full bg-[#1a73c2] shrink-0" />
//                 <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.14em] sm:tracking-[0.18em] text-black/40">
//                   Review &amp; confirm
//                 </span>
//               </div>
//               <h1 className="text-2xl sm:text-3xl font-bold text-[#0E1013] tracking-tight">
//                 Repair Order
//               </h1>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl sm:rounded-[28px] p-5 sm:p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_40px_-16px_rgba(0,0,0,0.12)] border border-black/[0.06]">
//             <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
//               <div>
//                 <div className="flex items-baseline justify-between mb-2 gap-2">
//                   <label className="text-sm font-semibold text-[#0E1013]">
//                     Work number
//                   </label>
//                   <span className="text-[10px] font-mono text-[#1a73c2]/60 shrink-0">
//                     WORK_NO
//                   </span>
//                 </div>
//                 <input
//                   type="text"
//                   value={workNumber}
//                   onChange={(e) => setWorkNumber(e.target.value)}
//                   placeholder="2024-1543"
//                   required
//                   className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-[#F4F6F8] border border-black/[0.08] rounded-xl text-[#0E1013] placeholder-black/30 focus:outline-none focus:ring-2 focus:ring-[#1a73c2] focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <div className="flex items-baseline justify-between mb-2 gap-2">
//                   <label className="text-sm font-semibold text-[#0E1013]">
//                     Vehicle information
//                   </label>
//                   <span className="text-[10px] font-mono text-[#1a73c2]/60 shrink-0">
//                     VEHICLE
//                   </span>
//                 </div>
//                 <input
//                   type="text"
//                   value={vehicleInfo}
//                   onChange={(e) => setVehicleInfo(e.target.value)}
//                   placeholder="2019 Honda Civic"
//                   required
//                   className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-[#F4F6F8] border border-black/[0.08] rounded-xl text-[#0E1013] placeholder-black/30 focus:outline-none focus:ring-2 focus:ring-[#1a73c2] focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <div className="flex items-baseline justify-between mb-2 gap-2">
//                   <label className="text-sm font-semibold text-[#0E1013]">
//                     Problem description
//                   </label>
//                   <span className="text-[10px] font-mono text-[#1a73c2]/60 shrink-0">
//                     ISSUE
//                   </span>
//                 </div>
//                 <textarea
//                   value={problemDescription}
//                   onChange={(e) => setProblemDescription(e.target.value)}
//                   placeholder="Customer reports unusual grinding noise when braking and steering wheel vibration at high speeds"
//                   required
//                   rows={4}
//                   className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-[#F4F6F8] border border-black/[0.08] rounded-xl text-[#0E1013] placeholder-black/30 focus:outline-none focus:ring-2 focus:ring-[#1a73c2] focus:border-transparent transition-all resize-none"
//                 />
//               </div>

//               {/* Attached photos / video */}
//               <div>
//                 <div className="flex items-baseline justify-between mb-2 gap-2">
//                   <label className="text-sm font-semibold text-[#0E1013]">
//                     Attachments
//                   </label>
//                   <span className="text-[10px] font-mono text-[#1a73c2]/60 shrink-0">
//                     MEDIA
//                   </span>
//                 </div>

//                 {media.length === 0 ? (
//                   <div className="flex items-center gap-2 text-sm text-black/35 bg-[#F4F6F8] border border-black/[0.08] rounded-xl px-4 sm:px-5 py-3 sm:py-3.5">
//                     <ImageOff className="w-4 h-4 shrink-0" />
//                     No photos or video attached
//                   </div>
//                 ) : (
//                   <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-2.5">
//                     {media.map((url) => (
//                       <div
//                         key={url}
//                         className="relative aspect-square rounded-xl overflow-hidden bg-[#F4F6F8] border border-black/[0.08] group"
//                       >
//                         {isVideoUrl(url) ? (
//                           <video
//                             src={url}
//                             className="w-full h-full object-cover"
//                             muted
//                             playsInline
//                             controls
//                           />
//                         ) : (
//                           // eslint-disable-next-line @next/next/no-img-element
//                           <img
//                             src={url}
//                             alt="Repair order attachment"
//                             className="w-full h-full object-cover"
//                           />
//                         )}
//                         {isVideoUrl(url) && (
//                           <div className="absolute bottom-1 left-1 bg-black/60 rounded px-1 py-0.5 pointer-events-none">
//                             <Film className="w-3 h-3 text-white" />
//                           </div>
//                         )}
//                         <button
//                           type="button"
//                           onClick={() => removeMedia(url)}
//                           className="absolute top-1 right-1 text-[10px] font-mono uppercase bg-black/70 text-white rounded px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <button
//                 type="submit"
//                 className="w-full flex items-center justify-center gap-2 py-3.5 sm:py-4 bg-[#1a73c2] text-white text-sm sm:text-[15px] font-semibold rounded-2xl hover:bg-[#155a99] active:scale-[0.99] transition-all duration-200 shadow-lg shadow-[#1a73c2]/20"
//               >
//                 Submit repair order
//                 <ArrowRight className="w-4 h-4" />
//               </button>
//             </form>
//           </div>
//         </div>
//       </main>

//       <footer className="border-t border-black/[0.06] py-4 sm:py-5">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.1em] sm:tracking-[0.14em] text-black/30">
//           Patterson Cheney Group — Internal Workshop Tool
//         </div>
//       </footer>
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useMemo } from "react";
import { ArrowLeft, ArrowRight, Phone, Film, ImageOff, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const PC_LOGO =
  "https://nextgen-images.cdn.dealersolutions.com.au/modular.multisite.dealer.solutions/wp-content/uploads/sites/3044/2024/03/19140735/PC-Primary-logo2.png?format=webp&width=351";

const API_BASE_URL = "https://vttbackend.omnisuiteai.com";

interface MediaEntry {
  url: string;
  type: "image" | "video";
}

interface RepairOrderForm2Props {
  onSubmit?: (data: {
    workNumber: string;
    vehicleInfo: string;
    problemDescription: string;
    media: MediaEntry[];
  }) => void;
}

export default function Form({ onSubmit }: RepairOrderForm2Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderId = searchParams.get("id") || "";
  const initialWorkNumber = searchParams.get("workNumber") || "";
  const initialVehicleInfo = searchParams.get("vehicleInfo") || "";
  const initialProblem = searchParams.get("problem") || "";
  const initialMediaRaw = searchParams.get("media") || "[]";

  const initialMedia = useMemo<MediaEntry[]>(() => {
    try {
      const parsed = JSON.parse(initialMediaRaw);
      if (!Array.isArray(parsed)) return [];
      return parsed
        .filter((m) => m && typeof m.url === "string")
        .map((m) => ({
          url: m.url,
          type: m.type === "video" ? "video" : "image",
        }));
    } catch {
      return [];
    }
  }, [initialMediaRaw]);

  const [workNumber, setWorkNumber] = useState(initialWorkNumber);
  const [vehicleInfo, setVehicleInfo] = useState(initialVehicleInfo);
  const [problemDescription, setProblemDescription] = useState(initialProblem);
  const [media, setMedia] = useState<MediaEntry[]>(initialMedia);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // update state if query params change
    setWorkNumber(initialWorkNumber);
    setVehicleInfo(initialVehicleInfo);
    setProblemDescription(initialProblem);
    setMedia(initialMedia);
  }, [initialWorkNumber, initialVehicleInfo, initialProblem, initialMedia]);

  const removeMedia = (url: string) => {
    setMedia((prev) => prev.filter((m) => m.url !== url));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      workNumber,
      vehicleInfo,
      problemDescription,
      media,
    };

    if (onSubmit) {
      onSubmit(formData);
      return;
    }

    // Default behaviour: save the final, tech-reviewed version back to
    // MongoDB via the backend, updating the draft record created at
    // /transcribe time.
    if (!orderId) {
      console.log(formData);
      alert("Repair order submitted successfully! (No order id was found, so nothing was saved to the database — this only happens if the page was opened without going through the recording step.)");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/repair-orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workNumber,
          vehicleInfo,
          problemDescription,
          media,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      alert("Repair order submitted successfully!");
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to submit repair order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#F4F6F8] flex flex-col">
      {/* Sticky glass header — matches the capture screen */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-black/[0.06]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PC_LOGO}
            alt="Patterson Cheney — Cars and Trucks since 1915"
            className="h-8 sm:h-10 w-auto object-contain shrink-0"
          />
          <a
            href="tel:0395905000"
            className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-[#1a73c2] hover:text-[#0F4C81] transition-colors shrink-0"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden xs:inline sm:inline">03 9590 5000</span>
          </a>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-14">
        <div className="w-full max-w-xl">
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <button
              onClick={() => router.replace("/")}
              aria-label="Back to recording"
              className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-full bg-white border border-black/[0.08] shadow-sm flex items-center justify-center text-[#0E1013] hover:bg-black/[0.03] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73c2]"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1a73c2] shrink-0" />
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.14em] sm:tracking-[0.18em] text-black/40">
                  Review &amp; confirm
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0E1013] tracking-tight">
                Repair Order
              </h1>
            </div>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-[28px] p-5 sm:p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_40px_-16px_rgba(0,0,0,0.12)] border border-black/[0.06]">
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div>
                <div className="flex items-baseline justify-between mb-2 gap-2">
                  <label className="text-sm font-semibold text-[#0E1013]">
                    Work number
                  </label>
                  <span className="text-[10px] font-mono text-[#1a73c2]/60 shrink-0">
                    WORK_NO
                  </span>
                </div>
                <input
                  type="text"
                  value={workNumber}
                  onChange={(e) => setWorkNumber(e.target.value)}
                  placeholder="2024-1543"
                  required
                  className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-[#F4F6F8] border border-black/[0.08] rounded-xl text-[#0E1013] placeholder-black/30 focus:outline-none focus:ring-2 focus:ring-[#1a73c2] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <div className="flex items-baseline justify-between mb-2 gap-2">
                  <label className="text-sm font-semibold text-[#0E1013]">
                    Vehicle information
                  </label>
                  <span className="text-[10px] font-mono text-[#1a73c2]/60 shrink-0">
                    VEHICLE
                  </span>
                </div>
                <input
                  type="text"
                  value={vehicleInfo}
                  onChange={(e) => setVehicleInfo(e.target.value)}
                  placeholder="2019 Honda Civic"
                  required
                  className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-[#F4F6F8] border border-black/[0.08] rounded-xl text-[#0E1013] placeholder-black/30 focus:outline-none focus:ring-2 focus:ring-[#1a73c2] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <div className="flex items-baseline justify-between mb-2 gap-2">
                  <label className="text-sm font-semibold text-[#0E1013]">
                    Problem description
                  </label>
                  <span className="text-[10px] font-mono text-[#1a73c2]/60 shrink-0">
                    ISSUE
                  </span>
                </div>
                <textarea
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  placeholder="Customer reports unusual grinding noise when braking and steering wheel vibration at high speeds"
                  required
                  rows={4}
                  className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-[#F4F6F8] border border-black/[0.08] rounded-xl text-[#0E1013] placeholder-black/30 focus:outline-none focus:ring-2 focus:ring-[#1a73c2] focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Attached photos / video — rendered by explicit type, not
                  guessed from file extension, so any format (including
                  iPhone HEIC/MOV) displays correctly */}
              <div>
                <div className="flex items-baseline justify-between mb-2 gap-2">
                  <label className="text-sm font-semibold text-[#0E1013]">
                    Attachments
                  </label>
                  <span className="text-[10px] font-mono text-[#1a73c2]/60 shrink-0">
                    MEDIA
                  </span>
                </div>

                {media.length === 0 ? (
                  <div className="flex items-center gap-2 text-sm text-black/35 bg-[#F4F6F8] border border-black/[0.08] rounded-xl px-4 sm:px-5 py-3 sm:py-3.5">
                    <ImageOff className="w-4 h-4 shrink-0" />
                    No photos or video attached
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-2.5">
                    {media.map((item) => (
                      <div
                        key={item.url}
                        className="relative aspect-square rounded-xl overflow-hidden bg-[#F4F6F8] border border-black/[0.08] group"
                      >
                        {item.type === "video" ? (
                          <video
                            src={item.url}
                            className="w-full h-full object-cover"
                            muted
                            playsInline
                            controls
                          />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.url}
                            alt="Repair order attachment"
                            className="w-full h-full object-cover"
                          />
                        )}
                        {item.type === "video" && (
                          <div className="absolute bottom-1 left-1 bg-black/60 rounded px-1 py-0.5 pointer-events-none">
                            <Film className="w-3 h-3 text-white" />
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => removeMedia(item.url)}
                          className="absolute top-1 right-1 text-[10px] font-mono uppercase bg-black/70 text-white rounded px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 sm:py-4 bg-[#1a73c2] text-white text-sm sm:text-[15px] font-semibold rounded-2xl hover:bg-[#155a99] active:scale-[0.99] transition-all duration-200 shadow-lg shadow-[#1a73c2]/20 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit repair order
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      <footer className="border-t border-black/[0.06] py-4 sm:py-5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.1em] sm:tracking-[0.14em] text-black/30">
          Patterson Cheney Group — Internal Workshop Tool
        </div>
      </footer>
    </div>
  );
}
