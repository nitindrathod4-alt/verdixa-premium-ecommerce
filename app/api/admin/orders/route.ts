import {NextResponse} from "next/server";
import {getSupabaseServer} from "@/lib/supabase/server";
export async function GET(){
 const supabase=getSupabaseServer();
 if(!supabase) return NextResponse.json({orders:[],source:"preview"});
 const {data,error}=await supabase.from("orders").select("id,order_number,customer_name,phone,total,payment_method,payment_status,fulfillment_status,created_at").order("created_at",{ascending:false}).limit(100);
 if(error) return NextResponse.json({error:error.message},{status:500});
 return NextResponse.json({orders:data,source:"supabase"});
}