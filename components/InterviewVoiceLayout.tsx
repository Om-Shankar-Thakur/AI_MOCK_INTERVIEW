"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import CallControls from "./CallControls";

interface InterviewVoiceLayoutProps {
  isSpeaking: boolean;
  isMuted: boolean;
  onToggleMic: () => void;
  onEndCall: () => void;
  callStatus: string;
  onStartCall: () => void;
}

const InterviewVoiceLayout = ({
  isSpeaking,
  isMuted,
  onToggleMic,
  onEndCall,
  callStatus,
  onStartCall,
}: InterviewVoiceLayoutProps) => {
  return (
    <div className="flex flex-col h-full">
      {/* Back button */}
      <Link
        href="/interview"
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors mb-8 w-fit"
      >
        <ArrowLeft size={18} />
        <span className="text-sm font-medium">Back</span>
      </Link>

      {/* Main voice area */}
      <div className="voice-layout">
        {/* AI Avatar */}
        <div className="voice-avatar">
          <div className="voice-avatar-ring" />
          {isSpeaking && (
            <div className="absolute inset-[-8px] rounded-full border-[3px] border-brand-blue/20 animate-ping" />
          )}
          <div className="flex flex-col items-center gap-1">
            <Sparkles size={36} className="text-white" />
            <span className="text-white text-xs font-medium">AI</span>
          </div>
        </div>

        {/* Interviewer name */}
        <h2 className="text-2xl font-bold text-gray-900">
          Robin (Interviewer)
        </h2>

        {/* Status */}
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full bg-green-500"
            style={{ animation: "pulse-dot 1.5s ease-in-out infinite" }}
          />
          <span className="text-brand-blue text-sm font-medium">
            {callStatus === "ACTIVE"
              ? "Listening to you..."
              : callStatus === "CONNECTING"
              ? "Connecting..."
              : "Ready to start"}
          </span>
        </div>

        {/* Controls */}
        {callStatus === "ACTIVE" ? (
          <CallControls
            isMuted={isMuted}
            onToggleMic={onToggleMic}
            onEndCall={onEndCall}
          />
        ) : (
          <button
            onClick={onStartCall}
            className="mt-4 px-8 py-3 bg-brand-blue text-white font-semibold rounded-full hover:bg-brand-blue-dark transition-colors cursor-pointer shadow-lg shadow-brand-blue/20"
          >
            {callStatus === "CONNECTING" ? "Connecting..." : "Start Interview"}
          </button>
        )}
      </div>
    </div>
  );
};

export default InterviewVoiceLayout;
