import { clerkMiddleware, redirectToSignIn } from "@clerk/nextjs/server";

export default clerkMiddleware({
  afterAuth: (req) => {
    // If user is not logged in, redirect to sign-in page
    if (!req.auth.userId) {
      return redirectToSignIn();
    }
  },
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
