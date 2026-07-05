// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { Mic, Square, Phone, ArrowRight } from "lucide-react";
// import Soundwave from "../../components/Soundwave";
// import { useRouter } from "next/navigation";
// import Loader from "../../components/Loader";

// const PC_LOGO =
//   "https://nextgen-images.cdn.dealersolutions.com.au/modular.multisite.dealer.solutions/wp-content/uploads/sites/3044/2024/03/19140735/PC-Primary-logo2.png?format=webp&width=351";

// function App() {
//   const [isRecording, setIsRecording] = useState(false);
//   const [recordingTime, setRecordingTime] = useState(0);
//   const [showSubmit, setShowSubmit] = useState(false);
//   const [audioURL, setAudioURL] = useState<string | null>(null);

//   const [loader, setLoader] = useState<boolean>(false);

//   const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//   const chunks = useRef<Blob[]>([]);
//   const timerRef = useRef<number | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     return () => {
//       if (timerRef.current) clearInterval(timerRef.current);
//       if (audioURL) URL.revokeObjectURL(audioURL);
//     };
//   }, [audioURL]);

//   const recordingMeta = useRef<{
//     blob: Blob;
//     mimeType: string;
//     extension: string;
//   } | null>(null);

//   const startRecording = async () => {
//     try {
//       if (audioURL) {
//         URL.revokeObjectURL(audioURL);
//         setAudioURL(null);
//       }

//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

//       // Pick supported MIME type + extension
//       let mimeType = "audio/webm";
//       let extension = "webm";

//       if (MediaRecorder.isTypeSupported("audio/webm")) {
//         mimeType = "audio/webm"; // Chrome/Android/Desktop
//         extension = "webm";
//       } else if (MediaRecorder.isTypeSupported("audio/mp4")) {
//         mimeType = "audio/mp4"; // iOS Safari
//         extension = "mp4";
//       } else if (MediaRecorder.isTypeSupported("audio/mpeg")) {
//         mimeType = "audio/mpeg"; // fallback for some browsers
//         extension = "mp3";
//       } else if (MediaRecorder.isTypeSupported("audio/mp4;codecs=aac")) {
//         mimeType = "audio/mp4;codecs=aac";
//         extension = "mp4";
//       }

//       const mediaRecorder = new MediaRecorder(stream, { mimeType });
//       mediaRecorderRef.current = mediaRecorder;
//       chunks.current = [];

//       setShowSubmit(false);
//       setRecordingTime(0);

//       mediaRecorder.ondataavailable = (e) => {
//         if (e.data.size > 0) chunks.current.push(e.data);
//       };

//       mediaRecorder.onstop = () => {
//         const blob = new Blob(chunks.current, { type: mimeType });
//         const url = URL.createObjectURL(blob);
//         setAudioURL(url);

//         // Save extension + mimeType so submitRecording knows how to send file
//         recordingMeta.current = { blob, mimeType, extension };

//         setShowSubmit(true);
//       };

//       mediaRecorder.start();
//       setIsRecording(true);

//       timerRef.current = window.setInterval(() => {
//         setRecordingTime((prev) => prev + 1);
//       }, 1000);
//     } catch (error) {
//       console.error("Error accessing microphone:", error);
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current && isRecording) {
//       mediaRecorderRef.current.stop();
//       mediaRecorderRef.current.stream
//         .getTracks()
//         .forEach((track) => track.stop());
//       setIsRecording(false);

//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//         timerRef.current = null;
//       }
//     }
//   };

//   const toggleRecording = () => {
//     if (isRecording) {
//       stopRecording();
//     } else {
//       startRecording();
//     }
//   };

//   const submitRecording = async () => {
//     if (!recordingMeta.current) return;

//     const { blob, mimeType, extension } = recordingMeta.current;

//     const file = new File([blob], `speech.${extension}`, { type: mimeType });
//     const formData = new FormData();
//     formData.append("audio", file);

//     setLoader(true);

//     try {
//       const response = await fetch(
//         // "https://www.apivtt.omnisuiteai.com/transcribe",
//         "https://vttbackend.omnisuiteai.com/transcribe",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Server error: ${response.status}`);
//       }

//       const result = await response.json();

//       setShowSubmit(false);
//       setRecordingTime(0);
//       setAudioURL(null);
//       recordingMeta.current = null;

//       router.push(
//         `/vehicleinfo?workNumber=${encodeURIComponent(
//           result["Work Number"] || ""
//         )}&vehicleInfo=${encodeURIComponent(
//           result["Vehicle Information"] || ""
//         )}&problem=${encodeURIComponent(result["Problem Description"] || "")}`
//       );
//     } catch (err) {
//       console.error("Upload error:", err);
//       alert("Failed to submit recording. Please try again.");
//     } finally {
//       setLoader(false);
//     }
//   };

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, "0")}:${secs
//       .toString()
//       .padStart(2, "0")}`;
//   };

//   const fields = [
//     { tag: "WORK_NO", label: "Work number" },
//     { tag: "VEHICLE", label: "Vehicle information" },
//     { tag: "ISSUE", label: "Problem description" },
//   ];

//   return (
//     <div className="min-h-[100dvh] bg-[#F4F6F8] flex flex-col">
//       {/* Sticky glass header */}
//       <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-black/[0.06]">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
//           {/* eslint-disable-next-line @next/next/no-img-element */}
//           <img
//             src={PC_LOGO}
//             alt="Patterson Cheney — Cars and Trucks since 1915"
//             className="h-8 sm:h-10 w-auto object-contain shrink-0"
//           />
//           <a
//             href="tel:+61395905000"
//             className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-[#1a73c2] hover:text-[#0F4C81] transition-colors shrink-0"
//           >
//             <Phone className="w-3.5 h-3.5" />
//             <span className="hidden xs:inline sm:inline">03 9590 5000</span>
//           </a>
//         </div>
//       </header>

//       <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-14">
//         <div className="w-full max-w-2xl">
//           {/* Hero */}
//           <div className="mb-6 sm:mb-10">
//             <div className="flex items-center gap-2 mb-3 sm:mb-4">
//               <span className="w-1.5 h-1.5 rounded-full bg-[#1a73c2] shrink-0" />
//               <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.14em] sm:tracking-[0.18em] text-black/40">
//                 Voice capture · Repair intake
//               </span>
//             </div>
//             <h1 className="text-[clamp(2rem,7vw,3rem)] font-bold text-[#0E1013] tracking-tight leading-[1.05]">
//               Voice to Tech
//             </h1>
//             <p className="mt-3 text-sm sm:text-base text-black/50 max-w-md">
//               Speak the work number, vehicle, and the problem. We&apos;ll turn it
//               into a repair order automatically.
//             </p>
//           </div>

//           {/* Diagnostic console panel — signature element */}
//           <div className="relative rounded-3xl sm:rounded-[28px] bg-[#0E1013] p-5 sm:p-7 md:p-8 overflow-hidden">
//             {/* faint blueprint grid */}
//             <div
//               className="absolute inset-0 opacity-[0.07] pointer-events-none"
//               style={{
//                 backgroundImage:
//                   "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
//                 backgroundSize: "24px 24px",
//               }}
//             />

//             {/* corner brackets */}
//             {[
//               "top-3 left-3 sm:top-4 sm:left-4 border-t border-l",
//               "top-3 right-3 sm:top-4 sm:right-4 border-t border-r",
//               "bottom-3 left-3 sm:bottom-4 sm:left-4 border-b border-l",
//               "bottom-3 right-3 sm:bottom-4 sm:right-4 border-b border-r",
//             ].map((pos, i) => (
//               <div
//                 key={i}
//                 className={`absolute w-3 h-3 sm:w-4 sm:h-4 ${pos} border-[#1a73c2]/50`}
//               />
//             ))}

//             <div className="relative">
//               <div className="flex items-center justify-between mb-5 sm:mb-6 gap-2">
//                 <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.12em] sm:tracking-[0.18em] text-white/35">
//                   Fields captured by voice
//                 </span>
//                 <span
//                   className={`text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.12em] sm:tracking-[0.18em] flex items-center gap-1.5 shrink-0 ${
//                     isRecording ? "text-[#4EA1E5]" : "text-white/25"
//                   }`}
//                 >
//                   <span
//                     className={`w-1.5 h-1.5 rounded-full ${
//                       isRecording ? "bg-[#4EA1E5] animate-pulse" : "bg-white/25"
//                     }`}
//                   />
//                   {isRecording ? "Listening" : "Standby"}
//                 </span>
//               </div>

//               <div className="space-y-2 mb-6 sm:mb-8">
//                 {fields.map((f) => (
//                   <div
//                     key={f.tag}
//                     className="flex items-center gap-3 sm:gap-4 rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 sm:px-5 py-3 sm:py-3.5"
//                   >
//                     <span className="text-[9px] sm:text-[10px] font-mono text-[#4EA1E5]/70 shrink-0 w-14 sm:w-16">
//                       {f.tag}
//                     </span>
//                     <span className="text-sm text-white/50">{f.label}</span>
//                   </div>
//                 ))}
//               </div>

//               {loader && <Loader />}

//               {/* Waveform + record control */}
//               <div className="flex flex-col items-center pt-2">
//                 <div className="relative w-full h-20 sm:h-24 mb-2">
//                   <Soundwave isActive={isRecording} />
//                 </div>

//                 {isRecording && (
//                   <div className="text-xl sm:text-2xl font-mono text-[#4EA1E5] mb-4 sm:mb-6 tabular-nums">
//                     {formatTime(recordingTime)}
//                   </div>
//                 )}
//                 {!isRecording && !showSubmit && (
//                   <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.14em] sm:tracking-[0.18em] text-white/25 mb-4 sm:mb-6 text-center px-4">
//                     Tap to start recording
//                   </div>
//                 )}

//                 <button
//                   onClick={toggleRecording}
//                   aria-label={isRecording ? "Stop recording" : "Start recording"}
//                   className={`relative group transition-transform duration-300 ${
//                     isRecording ? "scale-105" : "hover:scale-105"
//                   } focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4EA1E5] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0E1013] rounded-full`}
//                 >
//                   {isRecording && (
//                     <>
//                       <span className="absolute inset-0 rounded-full bg-[#1a73c2]/30 animate-ping" />
//                       <span className="absolute -inset-3 rounded-full border border-[#1a73c2]/30" />
//                     </>
//                   )}
//                   <div
//                     className={`relative rounded-full p-5 sm:p-6 transition-colors duration-300 ${
//                       isRecording
//                         ? "bg-gradient-to-br from-[#e14b4b] to-[#b52d2d]"
//                         : "bg-gradient-to-br from-[#2688DB] to-[#0F4C81] group-hover:from-[#3796EA] group-hover:to-[#12579A]"
//                     } shadow-lg`}
//                   >
//                     {isRecording ? (
//                       <Square className="w-7 h-7 sm:w-9 sm:h-9 text-white fill-white" />
//                     ) : (
//                       <Mic className="w-7 h-7 sm:w-9 sm:h-9 text-white" />
//                     )}
//                   </div>
//                 </button>
//               </div>

//               {/* Preview shows only after stop */}
//               {audioURL && !isRecording && (
//                 <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/[0.08] text-center">
//                   <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.14em] sm:tracking-[0.18em] text-white/35 mb-3">
//                     Preview
//                   </p>
//                   <audio
//                     controls
//                     playsInline
//                     src={audioURL}
//                     className="w-full max-w-sm mx-auto"
//                   ></audio>
//                 </div>
//               )}
//             </div>
//           </div>

//           {showSubmit && !isRecording && (
//             <button
//               onClick={submitRecording}
//               className="mt-5 sm:mt-6 w-full flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#1a73c2] text-white text-sm sm:text-[15px] font-semibold rounded-2xl hover:bg-[#155a99] active:scale-[0.99] transition-all duration-200 shadow-lg shadow-[#1a73c2]/20"
//             >
//               Submit recording
//               <ArrowRight className="w-4 h-4" />
//             </button>
//           )}
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

// export default App;

"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Mic,
  Square,
  Phone,
  ArrowRight,
  Camera,
  Video,
  X,
  ImagePlus,
} from "lucide-react";
import Soundwave from "../../components/Soundwave";
import { useRouter } from "next/navigation";
import Loader from "../../components/Loader";

const PC_LOGO =
  "https://nextgen-images.cdn.dealersolutions.com.au/modular.multisite.dealer.solutions/wp-content/uploads/sites/3044/2024/03/19140735/PC-Primary-logo2.png?format=webp&width=351";

// Backend endpoint that transcribes audio, extracts fields, and stores any
// attached photos/videos.
const TRANSCRIBE_URL = "https://vttbackend.omnisuiteai.com/transcribe";

type MediaKind = "image" | "video";

interface MediaItem {
  file: File;
  url: string; // local object URL for preview
  kind: MediaKind;
}

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showSubmit, setShowSubmit] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);

  const [media, setMedia] = useState<MediaItem[]>([]);

  const [loader, setLoader] = useState<boolean>(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const router = useRouter();

  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioURL) URL.revokeObjectURL(audioURL);
      media.forEach((m) => URL.revokeObjectURL(m.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (audioURL) {
      return () => URL.revokeObjectURL(audioURL);
    }
  }, [audioURL]);

  const recordingMeta = useRef<{
    blob: Blob;
    mimeType: string;
    extension: string;
  } | null>(null);

  const startRecording = async () => {
    try {
      if (audioURL) {
        URL.revokeObjectURL(audioURL);
        setAudioURL(null);
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Pick supported MIME type + extension
      let mimeType = "audio/webm";
      let extension = "webm";

      if (MediaRecorder.isTypeSupported("audio/webm")) {
        mimeType = "audio/webm"; // Chrome/Android/Desktop
        extension = "webm";
      } else if (MediaRecorder.isTypeSupported("audio/mp4")) {
        mimeType = "audio/mp4"; // iOS Safari
        extension = "mp4";
      } else if (MediaRecorder.isTypeSupported("audio/mpeg")) {
        mimeType = "audio/mpeg"; // fallback for some browsers
        extension = "mp3";
      } else if (MediaRecorder.isTypeSupported("audio/mp4;codecs=aac")) {
        mimeType = "audio/mp4;codecs=aac";
        extension = "mp4";
      }

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;
      chunks.current = [];

      setShowSubmit(false);
      setRecordingTime(0);

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks.current, { type: mimeType });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);

        // Save extension + mimeType so submitRecording knows how to send file
        recordingMeta.current = { blob, mimeType, extension };

        setShowSubmit(true);
      };

      mediaRecorder.start();
      setIsRecording(true);

      timerRef.current = window.setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      setIsRecording(false);

      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // ---- Photo / video capture -------------------------------------------

  const handleAddPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newItems: MediaItem[] = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
      kind: "image",
    }));

    setMedia((prev) => [...prev, ...newItems]);
    e.target.value = ""; // allow re-selecting the same file again later
  };

  const handleAddVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newItems: MediaItem[] = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
      kind: "video",
    }));

    setMedia((prev) => [...prev, ...newItems]);
    e.target.value = "";
  };

  const removeMedia = (index: number) => {
    setMedia((prev) => {
      const item = prev[index];
      if (item) URL.revokeObjectURL(item.url);
      return prev.filter((_, i) => i !== index);
    });
  };

  // ---- Submit -------------------------------------------------------------

  const submitRecording = async () => {
    if (!recordingMeta.current) return;

    const { blob, mimeType, extension } = recordingMeta.current;

    const file = new File([blob], `speech.${extension}`, { type: mimeType });
    const formData = new FormData();
    formData.append("audio", file);

    // Attach any captured photos/videos
    media.forEach((item) => {
      formData.append("media", item.file, item.file.name);
    });

    setLoader(true);

    try {
      const response = await fetch(TRANSCRIBE_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();

      setShowSubmit(false);
      setRecordingTime(0);
      setAudioURL(null);
      recordingMeta.current = null;

      // Clean up local media previews and clear state
      media.forEach((item) => URL.revokeObjectURL(item.url));
      setMedia([]);

      const mediaUrls: string[] = Array.isArray(result["Media"])
        ? result["Media"]
        : [];

      router.push(
        `/vehicleinfo?workNumber=${encodeURIComponent(
          result["Work Number"] || ""
        )}&vehicleInfo=${encodeURIComponent(
          result["Vehicle Information"] || ""
        )}&problem=${encodeURIComponent(
          result["Problem Description"] || ""
        )}&media=${encodeURIComponent(JSON.stringify(mediaUrls))}`
      );
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to submit recording. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const fields = [
    { tag: "WORK_NO", label: "Work number" },
    { tag: "VEHICLE", label: "Vehicle information" },
    { tag: "ISSUE", label: "Problem description" },
  ];

  return (
    <div className="min-h-[100dvh] bg-[#F4F6F8] flex flex-col">
      {/* Sticky glass header */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-black/[0.06]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PC_LOGO}
            alt="Patterson Cheney — Cars and Trucks since 1915"
            className="h-8 sm:h-10 w-auto object-contain shrink-0"
          />
          <a
            href="tel:+61395905000"
            className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-[#1a73c2] hover:text-[#0F4C81] transition-colors shrink-0"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden xs:inline sm:inline">03 9590 5000</span>
          </a>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-14">
        <div className="w-full max-w-2xl">
          {/* Hero */}
          <div className="mb-6 sm:mb-10">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1a73c2] shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.14em] sm:tracking-[0.18em] text-black/40">
                Voice capture · Repair intake
              </span>
            </div>
            <h1 className="text-[clamp(2rem,7vw,3rem)] font-bold text-[#0E1013] tracking-tight leading-[1.05]">
              Voice to Tech
            </h1>
            <p className="mt-3 text-sm sm:text-base text-black/50 max-w-md">
              Speak the work number, vehicle, and the problem. We&apos;ll turn it
              into a repair order automatically.
            </p>
          </div>

          {/* Diagnostic console panel — signature element */}
          <div className="relative rounded-3xl sm:rounded-[28px] bg-[#0E1013] p-5 sm:p-7 md:p-8 overflow-hidden">
            {/* faint blueprint grid */}
            <div
              className="absolute inset-0 opacity-[0.07] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            {/* corner brackets */}
            {[
              "top-3 left-3 sm:top-4 sm:left-4 border-t border-l",
              "top-3 right-3 sm:top-4 sm:right-4 border-t border-r",
              "bottom-3 left-3 sm:bottom-4 sm:left-4 border-b border-l",
              "bottom-3 right-3 sm:bottom-4 sm:right-4 border-b border-r",
            ].map((pos, i) => (
              <div
                key={i}
                className={`absolute w-3 h-3 sm:w-4 sm:h-4 ${pos} border-[#1a73c2]/50`}
              />
            ))}

            <div className="relative">
              <div className="flex items-center justify-between mb-5 sm:mb-6 gap-2">
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.12em] sm:tracking-[0.18em] text-white/35">
                  Fields captured by voice
                </span>
                <span
                  className={`text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.12em] sm:tracking-[0.18em] flex items-center gap-1.5 shrink-0 ${
                    isRecording ? "text-[#4EA1E5]" : "text-white/25"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isRecording ? "bg-[#4EA1E5] animate-pulse" : "bg-white/25"
                    }`}
                  />
                  {isRecording ? "Listening" : "Standby"}
                </span>
              </div>

              <div className="space-y-2 mb-6 sm:mb-8">
                {fields.map((f) => (
                  <div
                    key={f.tag}
                    className="flex items-center gap-3 sm:gap-4 rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 sm:px-5 py-3 sm:py-3.5"
                  >
                    <span className="text-[9px] sm:text-[10px] font-mono text-[#4EA1E5]/70 shrink-0 w-14 sm:w-16">
                      {f.tag}
                    </span>
                    <span className="text-sm text-white/50">{f.label}</span>
                  </div>
                ))}
              </div>

              {loader && <Loader />}

              {/* Waveform + record control */}
              <div className="flex flex-col items-center pt-2">
                <div className="relative w-full h-20 sm:h-24 mb-2">
                  <Soundwave isActive={isRecording} />
                </div>

                {isRecording && (
                  <div className="text-xl sm:text-2xl font-mono text-[#4EA1E5] mb-4 sm:mb-6 tabular-nums">
                    {formatTime(recordingTime)}
                  </div>
                )}
                {!isRecording && !showSubmit && (
                  <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.14em] sm:tracking-[0.18em] text-white/25 mb-4 sm:mb-6 text-center px-4">
                    Tap to start recording
                  </div>
                )}

                <button
                  onClick={toggleRecording}
                  aria-label={isRecording ? "Stop recording" : "Start recording"}
                  className={`relative group transition-transform duration-300 ${
                    isRecording ? "scale-105" : "hover:scale-105"
                  } focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4EA1E5] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0E1013] rounded-full`}
                >
                  {isRecording && (
                    <>
                      <span className="absolute inset-0 rounded-full bg-[#1a73c2]/30 animate-ping" />
                      <span className="absolute -inset-3 rounded-full border border-[#1a73c2]/30" />
                    </>
                  )}
                  <div
                    className={`relative rounded-full p-5 sm:p-6 transition-colors duration-300 ${
                      isRecording
                        ? "bg-gradient-to-br from-[#e14b4b] to-[#b52d2d]"
                        : "bg-gradient-to-br from-[#2688DB] to-[#0F4C81] group-hover:from-[#3796EA] group-hover:to-[#12579A]"
                    } shadow-lg`}
                  >
                    {isRecording ? (
                      <Square className="w-7 h-7 sm:w-9 sm:h-9 text-white fill-white" />
                    ) : (
                      <Mic className="w-7 h-7 sm:w-9 sm:h-9 text-white" />
                    )}
                  </div>
                </button>
              </div>

              {/* Preview shows only after stop */}
              {audioURL && !isRecording && (
                <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/[0.08] text-center">
                  <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.14em] sm:tracking-[0.18em] text-white/35 mb-3">
                    Preview
                  </p>
                  <audio
                    controls
                    playsInline
                    src={audioURL}
                    className="w-full max-w-sm mx-auto"
                  ></audio>
                </div>
              )}

              {/* Photo / video capture */}
              {!isRecording && (
                <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/[0.08]">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.14em] sm:tracking-[0.18em] text-white/35">
                      Attach photos / video
                    </p>
                    {media.length > 0 && (
                      <span className="text-[10px] sm:text-[11px] font-mono text-white/35">
                        {media.length} attached
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2.5 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => photoInputRef.current?.click()}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white/70 text-xs sm:text-sm font-medium hover:bg-white/[0.1] hover:text-white transition-colors"
                    >
                      <Camera className="w-4 h-4" />
                      Photo
                    </button>
                    <button
                      type="button"
                      onClick={() => videoInputRef.current?.click()}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white/70 text-xs sm:text-sm font-medium hover:bg-white/[0.1] hover:text-white transition-colors"
                    >
                      <Video className="w-4 h-4" />
                      Video
                    </button>
                  </div>

                  {/* Hidden native inputs — capture opens the device camera on mobile */}
                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    multiple
                    className="hidden"
                    onChange={handleAddPhotos}
                  />
                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/*"
                    capture="environment"
                    className="hidden"
                    onChange={handleAddVideo}
                  />

                  {media.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-2.5 mt-3 sm:mt-4">
                      {media.map((item, index) => (
                        <div
                          key={item.url}
                          className="relative aspect-square rounded-lg overflow-hidden bg-white/[0.06] border border-white/[0.1] group"
                        >
                          {item.kind === "image" ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={item.url}
                              alt={`Attachment ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <video
                              src={item.url}
                              className="w-full h-full object-cover"
                              muted
                              playsInline
                            />
                          )}
                          {item.kind === "video" && (
                            <div className="absolute bottom-1 left-1 bg-black/60 rounded px-1 py-0.5">
                              <Video className="w-3 h-3 text-white" />
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => removeMedia(index)}
                            aria-label="Remove attachment"
                            className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 sm:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => photoInputRef.current?.click()}
                        className="aspect-square rounded-lg border border-dashed border-white/20 flex items-center justify-center text-white/30 hover:text-white/60 hover:border-white/40 transition-colors"
                        aria-label="Add more photos"
                      >
                        <ImagePlus className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {showSubmit && !isRecording && (
            <button
              onClick={submitRecording}
              className="mt-5 sm:mt-6 w-full flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#1a73c2] text-white text-sm sm:text-[15px] font-semibold rounded-2xl hover:bg-[#155a99] active:scale-[0.99] transition-all duration-200 shadow-lg shadow-[#1a73c2]/20"
            >
              Submit recording
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
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

export default App;
