import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

// Import authentication check function
import { isAuthenticated } from "@/lib/actions/auth.action";

// Layout is an async component because it performs an authentication check
const Layout = async ({ children }: { children: ReactNode }) => {
  // Check if the user is authenticated (server-side)
  const isUserAuthenticated = await isAuthenticated();

  // If the user is not authenticated, redirect to the sign-in page
  if (!isUserAuthenticated) redirect("/sign-in");

  // If authenticated, render the layout with navigation and children components
  return (
    <div className="root-layout">
      {/* Navigation bar with logo and site name */}
      <nav>
        <Link href="/" className="flex items-center gap-2">
          {/* Site logo image */}
          <Image src="/logo.svg" alt="MockMate Logo" width={38} height={32} />
          {/* Site name */}
          <h2 className="text-primary-100">WisePrep</h2>
        </Link>
      </nav>

      {/* Render any children components/pages passed into the layout */}
      {children}
    </div>
  );
};

// Export the Layout component as default
export default Layout;
