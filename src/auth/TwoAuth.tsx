import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { siteConfig } from '../siteConfig';
import { words } from '../textConfig';
import { set_cookie } from '@/cookie';
import { InputOTP, InputOTPGroup,InputOTPSeparator,InputOTPSlot,} from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';

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
    try {
      const response = await fetch(siteConfig.links.twoauth, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Something went wrong');

      if (data.token) {
        set_cookie('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="flex flex-col w-[90%] max-w-md p-6 mx-auto bg-card rounded-lg shadow-md border">
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
            {words.send}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TwoAuth;
