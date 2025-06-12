// Import necessary modules and components
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";

// Import async actions for fetching user and interview data
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

// Home page is an async server component in Next.js App Router
async function Home() {
  // Fetch the currently authenticated user (if any)
  const user = await getCurrentUser();

  // Fetch user's interviews and latest available interviews in parallel
  // user?.id! uses non-null assertion because Home shouldn't render if user is not present
  const [userInterviews, allInterview] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);

  // Check if user has past interviews
  const hasPastInterviews = userInterviews?.length! > 0;
  // Check if there are any available interviews
  const hasUpcomingInterviews = allInterview?.length! > 0;

  // Main render
  return (
    <>
      {/* Hero section with call-to-action */}
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice real interview questions & get instant feedback
          </p>

          {/* Button to start a new interview */}
          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>

        {/* Decorative robot image, hidden on small screens */}
        <Image
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      {/* Section: User's previous interviews */}
      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>
        <div className="interviews-section">
          {/* Show list of user's interviews, or a message if none */}
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
            <p>You haven&apos;t taken any interviews yet</p>
          )}
        </div>
      </section>

      {/* Section: List of available interviews to take */}
      <section className="flex flex-col gap-6 mt-8">
        <h2>Take Interviews</h2>
        <div className="interviews-section">
          {/* Show available interviews, or a message if none */}
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
            <p>There are no interviews available</p>
          )}
        </div>
      </section>
    </>
  );
}

// Export Home as default page component
export default Home;
