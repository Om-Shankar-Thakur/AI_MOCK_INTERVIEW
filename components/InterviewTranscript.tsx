"use client";

import { Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";

interface TranscriptMessage {
  role: "user" | "system" | "assistant";
  content: string;
  timestamp?: string;
}

interface InterviewTranscriptProps {
  messages: TranscriptMessage[];
  userName?: string;
}

const InterviewTranscript = ({
  messages,
  userName = "You",
}: InterviewTranscriptProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatTime = (timestamp?: string) => {
    if (timestamp) return timestamp;
    return new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="transcript-panel">
      <div className="transcript-header">
        <Sparkles size={18} className="text-brand-blue" />
        <h3 className="text-base font-semibold text-gray-900">
          AI transcript
        </h3>
      </div>
      <div className="transcript-messages" ref={scrollRef}>
        {messages.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-8">
            Transcript will appear here once the interview begins...
          </p>
        )}
        {messages
          .filter((m) => m.role !== "system")
          .map((message, index) => {
            const isAI = message.role === "assistant";
            const time = formatTime(message.timestamp);

            return (
              <div
                key={index}
                className={isAI ? "message-bubble-ai" : "message-bubble-user"}
              >
                <div
                  className={`flex items-center gap-2 ${
                    isAI ? "flex-row-reverse" : ""
                  }`}
                >
                  {isAI ? (
                    <>
                      <span className="text-xs text-gray-400">{time}</span>
                      <span className="text-sm font-semibold text-gray-700">
                        Robin
                      </span>
                      <div className="w-6 h-6 rounded-full bg-brand-blue-light flex items-center justify-center">
                        <Sparkles size={12} className="text-brand-blue" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-gray-600">
                          {getInitials(userName)}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-gray-700">
                        {userName}
                      </span>
                      <span className="text-xs text-gray-400">{time}</span>
                    </>
                  )}
                </div>
                <div className={isAI ? "bubble-ai" : "bubble-user"}>
                  {message.content}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default InterviewTranscript;
