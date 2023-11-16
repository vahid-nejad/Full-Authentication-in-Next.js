import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  return <div className=""></div>;
};

export default ProfilePage;
