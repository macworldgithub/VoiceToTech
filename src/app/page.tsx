// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { Mic, Square } from "lucide-react";
// import Soundwave from "../../components/Soundwave";
// import { useRouter } from "next/navigation";
// import Loader from "../../components/Loader";

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
//         "http://localhost:4000/transcribe",
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

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-600 via-purple-900 to-slate-900 flex items-center justify-center p-6">
//       <div className="w-full max-w-4xl">
//         <div className="text-center mb-12">
//           <h1 className="text-5xl font-bold text-white mb-4">Voice to Tech</h1>
//           <p className="text-xl text-white/80">
//             Workshop Repair Order Assistant
//           </p>
//         </div>

//         <div className="space-y-4 mb-16">
//           <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-4 text-white/70">
//             What is your work number?
//           </div>
//           <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-4 text-white/70">
//             What is your Vehicle Information?
//           </div>
//           <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-4 text-white/70">
//             What is your problem?
//           </div>
//         </div>

//         {loader && <Loader />}

//         <div className="flex flex-col items-center">
//           <div className="relative w-full h-32 mb-8">
//             <Soundwave isActive={isRecording} />
//           </div>

//           {isRecording && (
//             <div className="text-3xl font-mono text-pink-400 mb-6">
//               {formatTime(recordingTime)}
//             </div>
//           )}

//           <button
//             onClick={toggleRecording}
//             className={`relative group transition-all duration-300 ${
//               isRecording ? "scale-110" : "hover:scale-105"
//             }`}
//           >
//             <div
//               className={`absolute inset-0 rounded-full blur-2xl transition-all duration-300 ${
//                 isRecording
//                   ? "bg-red-500/50 animate-pulse"
//                   : "bg-pink-500/30 group-hover:bg-pink-500/40"
//               }`}
//             />
//             <div
//               className={`relative rounded-full p-8 transition-all duration-300 ${
//                 isRecording
//                   ? "bg-gradient-to-br from-red-500 to-red-600"
//                   : "bg-gradient-to-br from-pink-500/20 to-purple-500/20 group-hover:from-pink-500/30 group-hover:to-purple-500/30"
//               } backdrop-blur-sm border-2 ${
//                 isRecording ? "border-red-400" : "border-white/20"
//               }`}
//             >
//               {isRecording ? (
//                 <Square className="w-12 h-12 text-white fill-white" />
//               ) : (
//                 <Mic className="w-12 h-12 text-white" />
//               )}
//             </div>
//           </button>

//           {/* Preview shows only after stop */}
//           {audioURL && !isRecording && (
//             <div className="mt-8 w-full max-w-md text-center">
//               <p className="text-white/70 mb-2">Preview your recording:</p>
//               <audio controls playsInline src={audioURL}></audio>
//             </div>
//           )}

//           {showSubmit && !isRecording && (
//             <button
//               onClick={submitRecording}
//               className="mt-8 px-12 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xl font-semibold rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
//             >
//               Submit
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

"use client";

import React, { useState, useRef, useEffect } from "react";
import { Mic, Square, Phone } from "lucide-react";
import Soundwave from "../../components/Soundwave";
import { useRouter } from "next/navigation";
import Loader from "../../components/Loader";

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showSubmit, setShowSubmit] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);

  const [loader, setLoader] = useState<boolean>(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioURL) URL.revokeObjectURL(audioURL);
    };
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

  const submitRecording = async () => {
    if (!recordingMeta.current) return;

    const { blob, mimeType, extension } = recordingMeta.current;

    const file = new File([blob], `speech.${extension}`, { type: mimeType });
    const formData = new FormData();
    formData.append("audio", file);

    setLoader(true);

    try {
      const response = await fetch(
        // "https://www.apivtt.omnisuiteai.com/transcribe",
        "http://localhost:4000/transcribe",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();

      setShowSubmit(false);
      setRecordingTime(0);
      setAudioURL(null);
      recordingMeta.current = null;

      router.push(
        `/vehicleinfo?workNumber=${encodeURIComponent(
          result["Work Number"] || ""
        )}&vehicleInfo=${encodeURIComponent(
          result["Vehicle Information"] || ""
        )}&problem=${encodeURIComponent(result["Problem Description"] || "")}`
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

  return (
    <div className="min-h-screen bg-[#eef1f4] flex flex-col">
      {/* Top bar — mirrors pattersoncheney.com.au header */}
      <header className="bg-white border-b border-black/10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Two-tone circular badge echoing the PC logo mark */}
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-black/10 shrink-0">
              <div className="absolute inset-0 bg-[#1a73c2]" style={{ clipPath: "polygon(0 0, 100% 0, 100% 55%, 0 55%)" }} />
              <div className="absolute inset-0 bg-[#f2b90c]" style={{ clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)" }} />
            </div>
            <div className="leading-tight">
              <div className="text-xl font-bold text-[#151515] tracking-tight">
                Patterson Cheney
              </div>
              <div className="text-[11px] text-black/50 italic -mt-0.5">
                Cars and Trucks since 1915
              </div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[#1a73c2] font-semibold">
            <Phone className="w-4 h-4" />
            <span>03 9590 5000</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl font-bold text-[#151515] mb-3">
              Voice to Tech
            </h1>
            <p className="text-lg text-black/60">
              Workshop Repair Order Assistant
            </p>
          </div>

          {/* Dark panel echoing the black search bar on pattersoncheney.com.au */}
          <div className="bg-[#111111] rounded-2xl p-6 space-y-3 mb-12">
            <div className="bg-white/[0.06] border border-white/10 rounded-full px-6 py-4 text-white/60">
              What is your work number?
            </div>
            <div className="bg-white/[0.06] border border-white/10 rounded-full px-6 py-4 text-white/60">
              What is your Vehicle Information?
            </div>
            <div className="bg-white/[0.06] border border-white/10 rounded-full px-6 py-4 text-white/60">
              What is your problem?
            </div>
          </div>

          {loader && <Loader />}

          <div className="flex flex-col items-center">
            <div className="relative w-full h-32 mb-8">
              <Soundwave isActive={isRecording} />
            </div>

            {isRecording && (
              <div className="text-3xl font-mono text-[#1a73c2] mb-6">
                {formatTime(recordingTime)}
              </div>
            )}

            <button
              onClick={toggleRecording}
              className={`relative group transition-all duration-300 ${
                isRecording ? "scale-110" : "hover:scale-105"
              }`}
            >
              <div
                className={`absolute inset-0 rounded-full blur-2xl transition-all duration-300 ${
                  isRecording
                    ? "bg-[#c62828]/40 animate-pulse"
                    : "bg-[#1a73c2]/30 group-hover:bg-[#1a73c2]/40"
                }`}
              />
              <div
                className={`relative rounded-full p-8 transition-all duration-300 ${
                  isRecording
                    ? "bg-[#c62828]"
                    : "bg-[#1a73c2] group-hover:bg-[#155a99]"
                } shadow-lg border-4 ${
                  isRecording ? "border-[#e57373]" : "border-white"
                }`}
              >
                {isRecording ? (
                  <Square className="w-12 h-12 text-white fill-white" />
                ) : (
                  <Mic className="w-12 h-12 text-white" />
                )}
              </div>
            </button>

            {/* Preview shows only after stop */}
            {audioURL && !isRecording && (
              <div className="mt-8 w-full max-w-md text-center">
                <p className="text-black/60 mb-2">Preview your recording:</p>
                <audio controls playsInline src={audioURL}></audio>
              </div>
            )}

            {showSubmit && !isRecording && (
              <button
                onClick={submitRecording}
                className="mt-8 px-12 py-4 bg-[#1a73c2] text-white text-lg font-bold uppercase tracking-wide rounded-md hover:bg-[#155a99] transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Bottom bar echoing the site's black footer */}
      <footer className="bg-[#111111] py-5">
        <div className="max-w-5xl mx-auto px-6 text-center text-white/40 text-xs">
          Patterson Cheney Group — Internal Workshop Tool
        </div>
      </footer>
    </div>
  );
}

export default App;
