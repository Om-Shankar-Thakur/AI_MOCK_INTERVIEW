"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useEffect, useRef } from "react";
import CallControls from "./CallControls";
import InterviewTranscript from "./InterviewTranscript";

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
  timestamp?: string;
}

interface InterviewVideoLayoutProps {
  messages: SavedMessage[];
  isMuted: boolean;
  onToggleMic: () => void;
  onEndCall: () => void;
  callStatus: string;
  onStartCall: () => void;
  userName: string;
}

const InterviewVideoLayout = ({
  messages,
  isMuted,
  onToggleMic,
  onEndCall,
  callStatus,
  onStartCall,
  userName,
}: InterviewVideoLayoutProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.log("Camera access denied or not available:", err);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/interview"
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors w-fit"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back</span>
        </Link>
        <h2 className="text-xl font-bold text-gray-900">Interview Details</h2>
        <div className="w-16" /> {/* Spacer for centering */}
      </div>

      {/* Two-column layout */}
      <div className="video-layout">
        {/* Left: Video Feed */}
        <div className="video-feed">
          {/* User label */}
          <div className="absolute top-4 right-4 z-10 bg-gray-800/70 backdrop-blur-sm px-3 py-1 rounded-lg">
            <span className="text-white text-sm font-medium">
              Om Shankar (You)
            </span>
          </div>

          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover scale-x-[-1]"
          />

          {/* Controls overlay */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
            {callStatus === "ACTIVE" ? (
              <CallControls
                isMuted={isMuted}
                onToggleMic={onToggleMic}
                onEndCall={onEndCall}
                showSettings={true}
                endLabel="End Call"
              />
            ) : (
              <button
                onClick={onStartCall}
                className="px-8 py-3 bg-brand-blue text-white font-semibold rounded-full hover:bg-brand-blue-dark transition-colors cursor-pointer shadow-lg"
              >
                {callStatus === "CONNECTING"
                  ? "Connecting..."
                  : "Start Interview"}
              </button>
            )}
          </div>
        </div>

        {/* Right: Transcript */}
        <InterviewTranscript messages={messages} userName={"Om Shankar"} />
      </div>
    </div>
  );
};

export default InterviewVideoLayout;
