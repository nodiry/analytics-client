import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { siteConfig } from '../siteConfig';
import { words } from '../textConfig';
import { InputOTP, InputOTPGroup,InputOTPSeparator,InputOTPSlot,} from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const TwoAuth = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const email = localStorage.getItem('email');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setError('Authentication token is missing. Please log in again.');
      return;
    }
    if (code.length !== 6) {
      toast.error("Please enter full code!");
      return;
    }
    try {
      const response = await fetch(siteConfig.links.twoauth, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials:'include',
        body: JSON.stringify({ email, passcode:code }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Something went wrong');
        
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('web', '[]');
        navigate('/dashboard');
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="flex flex-col w-[90%] max-w-md p-6 mx-auto bg-card rounded-lg shadow-md border">
      <img src="/favicon.png" className="mx-auto" alt="Logo" width={90} height={90} />
      <h1 className="mx-auto mb-4 text-2xl font-bold">📊 Web Analytics</h1>
        <p className="text-xl font-semibold text-primary text-center">{email}</p>
        <p className="text-lg text-muted-foreground text-center mb-4">{words.twoauthm}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-500 text-center">{error}</div>}

          {/* ✅ ShadCN OTP Input */}
          <div className="flex justify-center">
            <InputOTP maxLength={6} value={code} onChange={(value)=>setCode(value)} className="space-x-2">
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
            </InputOTPGroup>
            <InputOTPSeparator/>
            <InputOTPGroup>
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
            <InputOTPSeparator/>
           <InputOTPGroup>
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
           </InputOTPGroup>
            </InputOTP>
          </div>

          {/* ✅ ShadCN Buttons */}
          <Button type="submit" className="w-full">
            {words.delconfirm}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TwoAuth;
