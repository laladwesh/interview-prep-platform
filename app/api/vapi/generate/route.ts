// Import AI text generation and Google Gemini model
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

// Import Firestore admin instance and utility for random cover image
import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";

// Handles POST requests for generating and saving new interviews
export async function POST(request: Request) {
  // Extract required fields from the request body (JSON)
  const { type, role, level, techstack, amount, userid } = await request.json();

  try {
    // Use Gemini AI model to generate interview questions as a JSON array of strings
    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
      `,
    });

    // Prepare interview object to store in Firestore
    const interview = {
      role: role,                                // Interview role (e.g. SDE, PM)
      type: type,                                // Interview type (behavioral/technical)
      level: level,                              // Experience level (e.g. entry, senior)
      techstack: techstack.split(","),           // Tech stack as array of strings
      questions: JSON.parse(questions),          // Parsed list of AI-generated questions
      userId: userid,                            // User who requested this interview
      finalized: true,                           // Mark interview as finalized
      coverImage: getRandomInterviewCover(),     // Random cover image for variety
      createdAt: new Date().toISOString(),       // Timestamp for record creation
    };

    // Store the interview in Firestore under the 'interviews' collection
    await db.collection("interviews").add(interview);

    // Respond with success
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    // Log error and return error response
    console.error("Error:", error);
    return Response.json({ success: false, error: error }, { status: 500 });
  }
}

// Handles GET requests (e.g. for health check or route availability)
export async function GET() {
  return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
}
