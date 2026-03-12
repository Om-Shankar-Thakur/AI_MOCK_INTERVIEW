import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";

import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

async function Home() {
  const user = await getCurrentUser();

  const [userInterviews, allInterview] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = allInterview?.length! > 0;

  return (
    <>
      {/* Hero CTA */}
      <section className="flex flex-row bg-gradient-to-r from-brand-blue to-brand-blue-dark rounded-3xl px-12 py-8 items-center justify-between max-sm:px-6">
        <div className="flex flex-col gap-4 max-w-lg">
          <h2 className="text-3xl font-bold text-white">
            Get Interview-Ready with AI-Powered Practice &amp; Feedback
          </h2>
          <p className="text-blue-100 text-lg">
            Practice real interview questions &amp; get instant feedback
          </p>

          <Button asChild className="w-fit bg-white text-brand-blue hover:bg-blue-50 rounded-full font-bold px-6 min-h-10 cursor-pointer">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>

        <Image
          src="/robot.png"
          alt="robo-dude"
          width={300}
          height={300}
          className="max-sm:hidden"
        />
      </section>

      {/* Your Interviews */}
      <section className="flex flex-col gap-6 mt-8">
        <h2 className="text-2xl font-bold text-gray-900">Your Interviews</h2>

        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p className="text-gray-500">
              You haven&apos;t taken any interviews yet
            </p>
          )}
        </div>
      </section>

      {/* Take Interviews */}
      <section className="flex flex-col gap-6 mt-8">
        <h2 className="text-2xl font-bold text-gray-900">Take Interviews</h2>

        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            allInterview?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p className="text-gray-500">
              There are no interviews available
            </p>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
