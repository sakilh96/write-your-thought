/* eslint-disable newline-before-return */

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Middleware for protected routes
export default async function middleware(req) {
    const url = req.url;
    const pathname = req.nextUrl.pathname;
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // console.log('pathname',pathname.includes('/users'));
    // console.log('session',session);
  
    if (!session && url !== process.env.API_BASE_URL_ADMIN) {
     
        const loginUrl = new URL(process.env.API_BASE_URL_ADMIN);
        // loginUrl.searchParams.set("callbackUrl", pathname.trim());
      
        return NextResponse.redirect(loginUrl);
    }
  
    if (session && url === process.env.API_BASE_URL_ADMIN) {
        
        
        return NextResponse.redirect(`${process.env.API_BASE_URL_ADMIN}/dashboard/`);
    }

      // Additional check for unauthorized access only for User component
      if (pathname.includes('/users') && (!session || (session._doc.role !== 'Admin'))) {
        // Handle unauthorized access here
        return NextResponse.redirect('http://localhost:3000/401'); // Redirect to 401 page
    }
    // console.log('pathname',pathname.includes('/blogscategoty'),session._doc.role);
    if (pathname.includes('/blogscategoty') && (!session || (session._doc.role !== 'Admin'))) {
        // Handle unauthorized access here
        return NextResponse.redirect('http://localhost:3000/401'); // Redirect to 401 page
    }

    
}

export const config = {
    matcher: ['/admin/:path*']
};
