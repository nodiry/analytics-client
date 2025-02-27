import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { siteConfig } from '../siteConfig';
import { words } from '../textConfig';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeClosed } from 'lucide-react';

interface FormData {
  username: string;
  password: string;
  email: string;
  firstname?: string;
  lastname?: string;
}

const SignUp = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    email: '',
    firstname: '',
    lastname: '',
  });
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(siteConfig.links.signup, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Something went wrong');

      navigate('/auth/signin');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <div className="flex flex-col w-[90%] max-w-md p-6 mx-auto bg-card rounded-lg shadow-md border">
        <img src="/logo.png" className="m-3" alt="Logo" width={90} height={90} />

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-500 text-center">{error}</div>}

          <Input
            type="text"
            value={formData.firstname}
            onChange={handleInputChange}
            placeholder={words.firstname}
            name="firstname"
            required
          />
          <Input
            type="text"
            value={formData.lastname}
            onChange={handleInputChange}
            placeholder={words.lastname}
            name="lastname"
            required
          />
          <Input
            type="text"
            value={formData.username}
            onChange={handleInputChange}
            placeholder={words.username}
            name="username"
            required
          />
          <Input
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder={words.email}
            name="email"
            required
          />

          <div className="relative">
            <Input
              type={isVisible ? 'text' : 'password'}
              value={formData.password} // ✅ Fixed this to password
              onChange={handleInputChange}
              placeholder={words.password}
              name="password"
              required
            />
            <Button type="button" variant="ghost" className="absolute right-3 top-0" onClick={toggleVisibility}>
              {!isVisible ? <Eye /> : <EyeClosed />}
            </Button>
          </div>
          <Button variant="link" className="text-blue-500" onClick={()=>{navigate('/auth/signin')}}>
              Go to sign in
          </Button>

          <Button type="submit" className="w-full">
            {words.signup}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
