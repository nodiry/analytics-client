import { Toaster } from "@/components/ui/sonner"
import NavBar from "../components/NavBar"
const Dashboard = () => {
  return (
    <div className="flex flex-col max-h-s w-full space-y-10">
      <NavBar/>
      This is a dashboard!
      <Toaster />
    </div>
  )
}

export default Dashboard
