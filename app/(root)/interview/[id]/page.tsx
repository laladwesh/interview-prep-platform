import Image from "next/image";
import { redirect } from "next/navigation";

import Agent from "@/components/Agent";
import { getRandomInterviewCover } from "@/lib/utils";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";
import DisplayTechIcons from "@/components/DisplayTechIcons";

// Component props type (assumed) – params contains route parameters (like [id])
const InterviewDetails = async ({ params }: RouteParams) => {
  // Destructure interview ID from route params
  const { id } = await params;

  // Fetch current logged-in user
  const user = await getCurrentUser();

  // Fetch interview data by its ID
  const interview = await getInterviewById(id);
  // If interview doesn't exist, redirect to homepage
  if (!interview) redirect("/");

  // Fetch feedback for this interview and user
  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });

  return (
    <>
      {/* Top row: Interview cover, title, tech stack, and type */}
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex flex-row gap-4 items-center max-sm:flex-col">
          <div className="flex flex-row gap-4 items-center">
            {/* Random interview cover image for visual variety */}
            <Image
              src={getRandomInterviewCover()}
              alt="cover-image"
              width={40}
              height={40}
              className="rounded-full object-cover size-[40px]"
            />
            {/* Interview role as heading */}
            <h3 className="capitalize">{interview.role} Interview</h3>
          </div>

          {/* Show tech stack icons for this interview */}
          <DisplayTechIcons techStack={interview.techstack} />
        </div>

        {/* Pill badge for interview type (e.g., technical, behavioral) */}
        <p className="bg-dark-200 px-4 py-2 rounded-lg h-fit">
          {interview.type}
        </p>
      </div>

      {/* Agent component handles the main interview interaction */}
      <Agent
        userName={user?.name!}              // Current user's name
        userId={user?.id}                   // Current user's ID
        interviewId={id}                    // This interview's ID
        type="interview"                    // Tells Agent this is an "interview" session
        questions={interview.questions}     // Questions for the interview
        feedbackId={feedback?.id}           // Pass feedback ID if available
      />
    </>
  );
};

export default InterviewDetails;
