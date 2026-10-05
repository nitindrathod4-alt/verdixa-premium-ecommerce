import {NextResponse} from "next/server";
import {getSupabaseServer} from "@/lib/supabase/server";
import {products as fallbackProducts} from "@/lib/products";

export async function GET(){
 const supabase=getSupabaseServer();
 if(!supabase) return NextResponse.json({products:fallbackProducts,source:"fallback"});
 const {data,error}=await supabase.from("products").select("*").eq("active",true).order("created_at",{ascending:true});
 if(error) return NextResponse.json({products:fallbackProducts,source:"fallback",error:error.message},{status:200});
 return NextResponse.json({products:data,source:"supabase"});
}