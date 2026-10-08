import {NextResponse} from "next/server";

export async function POST(request:Request){
 const {username,password}=await request.json().catch(()=>({}));
 const expectedUser=process.env.ADMIN_USERNAME;
 const expectedPassword=process.env.ADMIN_PASSWORD;
 const token=process.env.ADMIN_DASHBOARD_TOKEN;
 if(!expectedUser||!expectedPassword||!token)return NextResponse.json({error:"Admin login is not configured."},{status:500});
 if(username!==expectedUser||password!==expectedPassword)return NextResponse.json({error:"Invalid username or password."},{status:401});
 return NextResponse.json({success:true,token});
}
