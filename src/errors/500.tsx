import { words } from "@/textConfig";
import NavBar from "../components/NavBar";

const ServerError = () => {
  const user = localStorage.getItem("user");
  return (
    <div className="flex flex-col space-y-10 items-center">
      {!user ? <></>:<NavBar/>}
      <p className="text-8xl text-red-800 mt-32">500!</p>
      <p className="m-4 text-2xl text-white">{words.CrashServer}</p>
    </div>
  )
}

export default ServerError
