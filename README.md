# WisePrep (AI Interview Platform)

WisePrep is an AI-powered job interview preparation web platform. Users can practice mock interviews tailored to their chosen roles and tech stacks, receive instant AI feedback, and track their progress—all with a beautiful, modern interface. This project uses Next.js 14+ App Router, TypeScript, Firebase, Google Gemini, and VAPI for real-time AI voice interviews.

---

## ✨ Features

- **AI-Powered Mock Interviews**  
  Get dynamically generated interview questions for any role, level, and tech stack.

- **Voice-based Interview Experience**  
  Experience real-time interviews with an AI interviewer via VAPI (voice API).

- **Instant AI Feedback**  
  Receive structured feedback, category-wise scoring, strengths, and areas for improvement right after your interview.

- **Personal Dashboard**  
  Track all your past interviews, review detailed feedback, and retake interviews to improve.

- **Tech Stack Visualization**  
  See relevant tech stack icons for each interview.

- **Sign Up/Sign In with Firebase Auth**  
  Secure authentication and session management.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 14+, React, TypeScript, TailwindCSS  
- **UI Components:** Custom components + Headless UI  
- **Backend/DB:** Firebase Firestore  
- **Authentication:** Firebase Auth  
- **AI:** Google Gemini (Gemini 2.0 Flash via ai-sdk)  
- **Voice API:** VAPI (for AI interviewer)  
- **State/Forms:** React Hook Form, Zod  
- **Other:** dayjs, Sonner (toast notifications)

---

## 📦 Folder Structure

/app
/(root)/ # Main app routes and pages
/components/ # All reusable components (Agent, InterviewCard, AuthForm, etc.)
/lib/ # Utility functions, API actions, vapi sdk, and helpers
/firebase/ # Firebase client and admin configs
/public/ # Static assets (images, logos)
/constants/ # Project-wide constants (e.g., interviewer workflows)

---

## 🚀 Getting Started

### 1. **Clone the Repository**

```bash
git clone https://github.com/your-username/wiseprep.git
cd wiseprep
npm install
# or
yarn install
Set Up Environment Variables
Create a .env.local file with:
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_VAPI_WORKFLOW_ID=...
GOOGLE_AI_API_KEY=...
Run the Development Server
npm run dev
