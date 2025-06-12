// Import the Agent component, which handles the main functionality on this page
import Agent from "@/components/Agent";
// Import the function to fetch the currently authenticated user's details
import { getCurrentUser } from "@/lib/actions/auth.action";

// Define the page component as an async function (since we'll fetch user info server-side)
const Page = async () => {
  // Fetch the currently logged-in user's details
  const user = await getCurrentUser();

  // Render the interview generation UI
  return (
    <>
      {/* Page heading */}
      <h3>Interview generation</h3>

      {/* Agent component handles the interview generation logic and UI */}
      <Agent
        userName={user?.name!}           // Pass the user's name (non-null assertion, since page is protected)
        userId={user?.id}                // Pass the user's ID
        profileImage={user?.profileURL}  // Pass the user's profile image URL
        type="generate"                  // Specify the operation type for Agent
      />
    </>
  );
};

// Export this page as the default export
export default Page;
