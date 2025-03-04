import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { Github } from "lucide-react";
import LangOption from "./components/LangOption";
import FAQ from "./faq";

export default function HeroPage() {
  const controls = useAnimation();
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // If scrolling down, hide navbar
        controls.start({ y: -100, opacity: 0 });
      } else {
        // If scrolling up, show navbar
        controls.start({ y: 0, opacity: 1 });
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, controls]);

// Tech Logos (White on Black)
const frontendTech = [
  "/react.svg",
  "/vite.png",
  "/bun.png",
  "/jwt.png",
  "/tailwind.svg",
  "/shadcn.png",
  "/framer.png",
  "/typescript.svg",
];

const backendTech = [
  "/bun.png",
  "/express.svg",
  "/jwt.png",
  "/mongo.png",
  "/resend.png",
  "/typescript.svg",
];

const marqueeVariants = {
  animate: {
    x: ["0%", "-50%"], // Moves the first set to the left while the second set comes into view
    transition: {
      x: { repeat: Infinity, duration: 20, ease: "linear" },
    },
  },
};

// Infinite Logo Belt Component
const TechMarquee = ({ techStack }: { techStack: string[] }) => {
  return (
    <div className="relative overflow-hidden w-full bg-black py-4">
      <motion.div
        className="flex space-x-12"
        variants={marqueeVariants}
        animate="animate"
      >
        {/* Duplicate logos for seamless infinite scroll */}
        <div className="flex m-8">
          {[...techStack, ...techStack].map((logo, idx) => (
            <img key={idx} src={logo} alt="tech-logo" className="h-12 mx-4" />
          ))}
        </div>
      </motion.div>
    </div>
  );
};
  
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white">
      {/* Motion Navbar */}
      <motion.nav
        animate={controls}
        initial={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 w-full flex justify-between items-center p-6 backdrop-blur-lg bg-black/50"
      >
        <h1 className="text-2xl font-bold">📊 Web Analytics</h1>
        <div className="flex gap-4">
          <LangOption/>
          <Link to="/auth/signin">
            <Button variant="outline">Sign in</Button>
          </Link>
          <Button asChild>
            <Link to="/auth/signup">Get Started</Link>
          </Button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl px-6"
      >
        <h1 className="mt-20 text-4xl md:text-6xl font-bold leading-tight">
          Web Analytics. Made Simple.
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          Effortless tracking, real-time insights, and a powerful dashboard – built for developers.
        </p>
        <div className="mt-6 flex gap-4 justify-center">
          <Button size="lg" asChild>
            <Link to="/auth/signup">Try for Free</Link>
          </Button>
          <p className="rounded-lg border p-2 flex-row">
            <a className="hover:bg-neutral-500" href="https://github.com/Turan-Nadir/analytics-client" target="_blank" rel="noopener noreferrer" ><Github/> Get Code</a>
          </p>
        </div>
      </motion.div>
      <div className="relative flex flex-row">
  {/* Dash White Screenshot - Positioned Over Metrics */}
  <motion.img
    whileHover={{ scale: 1.05 }}
    src="/dash_white.png"
    alt="Dashboard Screenshot"
    className="relative z-10 w-[250px] shadow-lg border rounded-xl border-gray-700 mt-40 ml-40"
  />

  {/* Metrics Container */}
  <motion.div 
    whileHover={{ scale: 1.05 }}
    className="relative bg-gray-800 mt-8 ml-[-80px] h-fit rounded-xl shadow-lg w-8/12 justify-end max-w-full"
  >
    {/* Top bar for metrics window */}
    <div className="flex items-end px-4 py-2 bg-gray-700 rounded-t-xl">
      <div className="flex space-x-2">
        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
        <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
      </div>
    </div>

    {/* Metrics Screenshot */}
    <motion.img
      src="/metrics.jpeg" 
      alt="Metrics Screenshot"
      className="shadow-lg border rounded-b-xl border-gray-700"
    />
  </motion.div>
</div>

<div className="mt-16">
      <h2 className="text-2xl font-bold text-center text-white mb-4">
        Frontend Tech Stack
      </h2>
      <TechMarquee techStack={frontendTech} />

      <h2 className="text-2xl font-bold text-center text-white mt-10 mb-4">
        Backend Tech Stack
      </h2>
      <TechMarquee techStack={backendTech} />
    </div>


      {/* Final Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-16 text-center"
      >
        <FAQ/>
        <h2 className="text-3xl font-bold">Ready to get started?</h2>
        <div className="mt-6">
          <Button size="lg" asChild>
            <Link to="/auth/signup">Sign Up Now</Link>
          </Button>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="mt-20 pb-6 text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Web Analytics. All rights reserved.</p>
      </footer>
    </div>
  );
}