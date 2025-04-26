export type OtpInputType = {
  code: string;
  setCode: (value: string) => void;
  error: string;
  handleVerify: (e: React.FormEvent) => Promise<void>;
  loading: boolean;
};
