import InterviewSession from "@/components/InterviewSession";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async ({ searchParams }: RouteParams) => {
  const { mode } = await searchParams;
  const user = await getCurrentUser();

  const interviewMode = mode === "video" ? "video" : "voice";

  return (
    <InterviewSession
      mode={interviewMode}
      userName={user?.name!}
      userId={user?.id}
      type="generate"
    />
  );
};

export default Page;
