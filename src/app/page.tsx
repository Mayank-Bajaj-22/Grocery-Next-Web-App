import { auth } from "@/src/auth";
import connectDb from "../lib/db";
import User from "../models/user.model";
import { redirect } from "next/navigation";
import EditRoleMobile from "../components/EditRoleMobile";

export default async function Home() {

  const session = await auth()
  // console.log(session)

  if (!session?.user?.id) {
    redirect("/login");
  }

  await connectDb();

  const user = await User.findById( session?.user?.id )
  // console.log(user)
  if (!user) {
    redirect("/login")
  }
  const inComplete = !user.mobile || !user.role || (!user.mobile && user.role == "user")
  console.log(inComplete)
  if (inComplete) {
    return <EditRoleMobile />
  }

  return (
    <div>
      Home
    </div>
  )
}
