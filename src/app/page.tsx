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


// backend me apan kuch access kate hai jab hum use karte hai auth from auth.ts
// frontend me apan useSession hook ka use karte hai

// import { auth } from "@/src/auth";
// import connectDb from "../lib/db";
// import User from "../models/user.model";
// import { redirect } from "next/navigation";
// import EditRoleMobile from "../components/EditRoleMobile";
// import { unstable_noStore as noStore } from "next/cache";

// export default async function Home() {

//   noStore(); // 🔥 prevent caching

//   // ✅ Step 1: Get session FIRST
//   const session = await auth();
//   console.log("SESSION:", session);

//   if (!session?.user?.id) {
//     redirect("/login");
//   }

//   // ✅ Step 2: Then connect DB
//   await connectDb();

//   const user = await User.findById(session.user.id);
//   console.log("USER:", user);

//   if (!user) {
//     redirect("/login");
//   }

//   const isIncomplete = !user.mobile || !user.role;

//   if (isIncomplete) {
//     return <EditRoleMobile />;
//   }

//   return (
//     <div>
//       Welcome {user.name}
//     </div>
//   );
// }