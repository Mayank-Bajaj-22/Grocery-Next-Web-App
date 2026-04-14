import { auth } from "@/src/auth";
import connectDb from "../lib/db";
import User from "../models/user.model";
import { redirect } from "next/navigation";
import EditRoleMobile from "../components/EditRoleMobile";
import Nav from "../components/Nav";
import UserDashboard from "../components/UserDashboard";
import AdminDashboard from "../components/AdminDashboard";
import DeliveryBoy from "../components/DeliveryBoy";

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

  const plainUser = JSON.parse(JSON.stringify(user))
  // console.log(plainUser)

  return (
    <>
      <Nav user={ plainUser } />

      {
        user.role == "user" ? (
          <UserDashboard />
        ) : user.role == "admin" ? (
          <AdminDashboard />
        ) : <DeliveryBoy />
      }
    </>
  )
}
