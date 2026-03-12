"use client";

import { Mic, MicOff, Settings, Scissors } from "lucide-react";

interface CallControlsProps {
  isMuted: boolean;
  onToggleMic: () => void;
  onEndCall: () => void;
  showSettings?: boolean;
  onSettings?: () => void;
  endLabel?: string;
}

const CallControls = ({
  isMuted,
  onToggleMic,
  onEndCall,
  showSettings = false,
  endLabel = "End Interview",
}: CallControlsProps) => {
  return (
    <div className="call-controls">
      <button
        onClick={onToggleMic}
        className={`control-btn ${isMuted ? "!bg-red-100 !text-red-500" : ""}`}
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
      </button>

      <button onClick={onEndCall} className="control-btn-end">
        <Scissors size={16} />
        {endLabel}
      </button>

      {showSettings && (
        <button className="control-btn" title="Settings">
          <Settings size={18} />
        </button>
      )}
    </div>
  );
};

export default CallControls;
