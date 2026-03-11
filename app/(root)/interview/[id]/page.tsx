import { redirect } from "next/navigation";

import InterviewSession from "@/components/InterviewSession";
import { getRandomInterviewCover } from "@/lib/utils";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";

const InterviewDetails = async ({ params }: RouteParams) => {
  const { id } = await params;

  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });

  return (
    <InterviewSession
      mode="voice"
      userName={user?.name!}
      userId={user?.id}
      interviewId={id}
      type="interview"
      questions={interview.questions}
      feedbackId={feedback?.id}
    />
  );
};

export default InterviewDetails;
