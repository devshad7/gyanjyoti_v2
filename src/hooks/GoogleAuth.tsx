"use client";

import { SignInResource, SignUpResource } from "@clerk/types";

interface HandleGoogleSignInProps {
  redirectUrl?: string;
  signIn: SignInResource | undefined;
}

interface HandleGoogleSignUpProps {
  redirectUrl?: string;
  signUp: SignUpResource | undefined;
}

export const handleGoogleSignIn = async ({
  redirectUrl,
  signIn,
}: HandleGoogleSignInProps) => {
  try {
    await signIn?.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrlComplete: redirectUrl,
    });
  } catch (error) {
    console.log(error);
  }
};

export const handleGoogleSignUp = async ({
  redirectUrl,
  signUp,
}: HandleGoogleSignUpProps) => {
  try {
    await signUp?.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrlComplete: redirectUrl,
    });
  } catch (error) {
    console.log(error);
  }
};
