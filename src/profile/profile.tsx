import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import NavBar from "@/components/NavBar";
import DeleteProfile from "@/components/deleteProfile";
import EditProfile from "@/components/editProfile";
import { words } from "@/textConfig";

interface User {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  img_url?: string;
  authorized: boolean;
  password: "";
  created_at: string;
  modified_at: string;
}

function formatDate(dateString: string | undefined) {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid Date";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/");
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen px-4">
      <NavBar />
      <Card className="w-full max-w-md md:max-w-lg lg:max-w-2xl mt-16 rounded-2xl shadow-md">
        <CardHeader className="flex flex-col items-center text-center">
          <Avatar className="w-28 h-28 md:w-32 md:h-32 lg:w-40 lg:h-40">
            <AvatarImage
              src={
                user.img_url ||
                "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
              }
              alt={user.username}
            />
            <AvatarFallback>
              {user.firstname[0]}
              {user.lastname[0]}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="mt-4 text-lg md:text-xl font-semibold">
            {user.firstname} {user.lastname}
          </CardTitle>
          <p className="text-gray-500 text-sm md:text-base">@{user.username}</p>
        </CardHeader>
        <CardContent className="space-y-4 text-center text-sm md:text-base">
          <p className="text-gray-600">📧 {user.email}</p>
          <p className="text-gray-600">📅 {words.created}: {formatDate(user.created_at)}</p>
          <p className="text-gray-600">📝 {words.last_modified}: {formatDate(user.modified_at)}</p>
          <p className={`font-semibold ${user.authorized ? "text-green-600" : "text-red-600"}`}>
            {user.authorized ? "✅ Authorized" : "❌ Not Authorized"}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
            <EditProfile user={user} />
            <DeleteProfile username={user.username} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
