"use client";

import { Mic, Video } from "lucide-react";
import { useRouter } from "next/navigation";

const InterviewModeCard = ({
  icon: Icon,
  title,
  description,
  onClick,
}: {
  icon: typeof Mic;
  title: string;
  description: string;
  onClick: () => void;
}) => {
  return (
    <button onClick={onClick} className="mode-card group">
      <div className="mode-card-icon">
        <Icon size={36} strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500 text-center leading-relaxed max-w-[260px]">
        {description}
      </p>
    </button>
  );
};

const InterviewModeSelector = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center flex-1 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">
        Take your Mock Interview
      </h1>
      <p className="text-gray-500 text-center max-w-lg mb-12">
        Practice your skills in a simulated environment. Choose the type of
        interview you&apos;d like to take today.
      </p>

      <div className="flex flex-row gap-6 flex-wrap justify-center">
        <InterviewModeCard
          icon={Mic}
          title="Voice Based"
          description="Focus on your verbal communication and quick thinking. Perfect for technical phone screens and HR rounds."
          onClick={() => router.push("/interview/start?mode=voice")}
        />
        <InterviewModeCard
          icon={Video}
          title="Video Based"
          description="Practice your body language, eye contact, and presence. Simulates a real face-to-face remote interview."
          onClick={() => router.push("/interview/start?mode=video")}
        />
      </div>
    </div>
  );
};

export default InterviewModeSelector;
