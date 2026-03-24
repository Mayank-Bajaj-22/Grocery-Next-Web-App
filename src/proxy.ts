import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl
    const publicRoutes = ["/login", "/register", "/api/auth"]

    if (publicRoutes.some((path) => pathname.startsWith(path))) {
        // some return true or false
        return NextResponse.next()
    }

    // ab hum yeh likhenge agar koi home ya upar ke wala likhne routes me se kahi or jane chaiye without authenticated to hum usko nhi jane denge

    // jab bhi hum sign in karte hai jab next auth ek token bana kar ke genrate kar deta hai, or jab tak token expire nhi ho jata jab tak user login rehta hai, hume ab uss token ko access karna hai agar yeh token hai matalab user authenticated hai agar nhi jab user autheticated nhi hai

    const token = await getToken({ req, secret: process.env.AUTH_SECRET})
    console.log(token)
    // agar yeh token null nhi hai jab yeh hume home par direct kar dega, agar nhi hai jab login par hi rakhega

    if (!token) {
        const loginUrl = new URL("/login", req.url)
        loginUrl.searchParams.set("callbackUrl", req.url)
        // yeh humne iss liye likha hai ki hum jaha jane ki koshish kar rahe the yeh hume vaha hi pocha de
        // console.log(loginUrl)
        // req.url = http://localhost:3000/
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        // Exclude API routes, image optimization, static files, and specific file extensions
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)',
    ],
};

// req ------- middleware ---------- server
// agar yeh request yeh middleware ki condition fullfil karti hai jab yeh server se response lake degi
// login register api auth - yeh public route hai inhe koi bhi access kar payega