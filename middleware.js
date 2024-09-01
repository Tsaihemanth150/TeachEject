import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import Jwt from 'jsonwebtoken';

export async function middleware(request) {
 
  const token =  cookies().get("Token")?.value || "Empty"; // get token from cookies
  

  const path = request.nextUrl.pathname;
  const publicPaths = ['/login', 
                      '/signup', 
                      '/forgotpassword',]; // add public  paths here
  const isPublicPath = publicPaths.includes(path);
  


  const AdminPath = ['/admindashboard', 
                    '/admingetusers', 
                    '/adminapis',
                    '/api/admin/getAllUsers',
                    '/api/check/checkdbhealth',
                    '/pages/prodcut/',
                    '/adminclaims',
                    '/adminviewclaims'
                    
                    
                    ]; 
                    // add admin paths here and for tetsing purpose added user paths
  const isAdminPath = AdminPath.includes(path);

  const UserPath = ['/dashboard',
                    '/pages/prodcut/',
                    '/myorders',
                    '/mypolicy',
                   '/updatenominee',
                   '/payment'];// add user paths here
  const isUserPath = UserPath.includes(path); 

  if (isPublicPath) {
    if (token === "Empty") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if(token === "Empty" && !isPublicPath ){
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token !== "Empty") {
    const decryptedToken = Jwt.decode(token, process.env.Token_SECERT);
    
    if (isAdminPath) { 
      if (decryptedToken && decryptedToken.isAdmin) {
        return NextResponse.next();
      }else{
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    } else if (isUserPath && !decryptedToken.isAdmin) {
      return NextResponse.next();
    }
  }

  
  return NextResponse.redirect(new URL('/', request.url));
}



export const config = {
  matcher: ['/admindashboard',
            '/dashboard',
            '/login',
            '/admingetusers',
            '/signup',
            '/adminapis',
            '/forgotpassword',
            '/api/admin/getAllUsers',
            '/api/check/checkdbhealth',
            '/pages/prodcut/',
            '/myorders',
            '/mypolicy',
            '/updatenominee',
            '/payment',
            '/adminclaims',
            '/adminviewclaims'


                            ]
};
