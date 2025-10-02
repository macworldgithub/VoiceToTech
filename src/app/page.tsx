"use client";

import React, { useState, useRef, useEffect } from "react";
import { Mic, Square } from "lucide-react";
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

  const startRecording = async () => {
    try {
      // clear old recording
      if (audioURL) {
        URL.revokeObjectURL(audioURL);
        setAudioURL(null);
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunks.current = [];

      setShowSubmit(false);
      setRecordingTime(0);

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
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
    if (!chunks.current.length) return;

    const blob = new Blob(chunks.current, { type: "audio/webm" });
    const file = new File([blob], "speech.webm", { type: "audio/webm" });
    const formData = new FormData();
    formData.append("audio", file);

    setLoader(true);

    const response = await fetch("https://www.apivtt.omnisuiteai.com/transcribe", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    setShowSubmit(false);
    setRecordingTime(0);
    setAudioURL(null);

    setLoader(false);
    router.push(
      `/vehicleinfo?workNumber=${encodeURIComponent(
        result["Work Number"]
      )}&vehicleInfo=${encodeURIComponent(
        result["Vehicle Information"]
      )}&problem=${encodeURIComponent(result["Problem Description"])}`
    );
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-600 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Voice to Tech</h1>
          <p className="text-xl text-white/80">
            Workshop Repair Order Assistant
          </p>
        </div>

        <div className="space-y-4 mb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-4 text-white/70">
            What is your work number?
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-4 text-white/70">
            What is your Vehicle Information?
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-4 text-white/70">
            What is your problem?
          </div>
        </div>

        {loader && <Loader />}

        <div className="flex flex-col items-center">
          <div className="relative w-full h-32 mb-8">
            <Soundwave isActive={isRecording} />
          </div>

          {isRecording && (
            <div className="text-3xl font-mono text-pink-400 mb-6">
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
                  ? "bg-red-500/50 animate-pulse"
                  : "bg-pink-500/30 group-hover:bg-pink-500/40"
              }`}
            />
            <div
              className={`relative rounded-full p-8 transition-all duration-300 ${
                isRecording
                  ? "bg-gradient-to-br from-red-500 to-red-600"
                  : "bg-gradient-to-br from-pink-500/20 to-purple-500/20 group-hover:from-pink-500/30 group-hover:to-purple-500/30"
              } backdrop-blur-sm border-2 ${
                isRecording ? "border-red-400" : "border-white/20"
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
              <p className="text-white/70 mb-2">Preview your recording:</p>
              <audio controls src={audioURL} className="w-full" />
            </div>
          )}

          {showSubmit && !isRecording && (
            <button
              onClick={submitRecording}
              className="mt-8 px-12 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xl font-semibold rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
