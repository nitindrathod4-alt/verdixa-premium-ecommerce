import {NextResponse} from "next/server";
import {getSupabaseServer} from "@/lib/supabase/server";
import {isAdminRequest} from "@/lib/admin";
export async function GET(request:Request){
 if(!isAdminRequest(request))return NextResponse.json({error:"Unauthorized"},{status:401});
 const supabase=getSupabaseServer();
 if(!supabase)return NextResponse.json({products:[],source:"preview"});
 const {data,error}=await supabase.from("products").select("*").order("created_at",{ascending:false});
 if(error)return NextResponse.json({error:error.message},{status:500});
 return NextResponse.json({products:data,source:"supabase"});
}