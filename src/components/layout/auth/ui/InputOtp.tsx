import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import { OtpInputType } from "@/types/OtpInputProps";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import React from "react";

const InputOtp = ({
  code,
  setCode,
  error,
  handleVerify,
  loading,
}: OtpInputType) => {
  return (
    <>
      <div className="space-y-2">
        <label htmlFor="otp" className="block text-gray-700">
          Enter Verification Code (from Email)
        </label>
        <InputOTP
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS}
          value={code}
          onChange={(value) => setCode(value)}
        >
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTP>
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <Button
        onClick={handleVerify}
        className="w-full py-2 bg-blue-600 hover:bg-blue-700 cursor-pointer text-white rounded-md"
        disabled={loading ? true : false}
      >
        {loading ? (
          <span>Verifying...</span>
        ) : (
          <span>Verify & Complete Signup</span>
        )}
      </Button>
    </>
  );
};

export default InputOtp;
