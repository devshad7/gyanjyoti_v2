"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

const SSOCallbackPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 bg-white shadow-lg rounded-xl">
        <AuthenticateWithRedirectCallback />

        <div className="mt-4">
          <p className="text-lg text-gray-700">
            Processing sign-in... Redirecting.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SSOCallbackPage;
