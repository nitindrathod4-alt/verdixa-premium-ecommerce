import {NextResponse} from "next/server";
import {getSupabaseServer} from "@/lib/supabase/server";
import {isAdminRequest} from "@/lib/admin";

export async function GET(request:Request){
 if(!isAdminRequest(request))return NextResponse.json({error:"Unauthorized"},{status:401});
 const supabase=getSupabaseServer(); if(!supabase)return NextResponse.json({orders:[],source:"preview"});
 const {data,error}=await supabase.from("orders").select("id,order_number,customer_name,phone,email,address,pin_code,total,subtotal,shipping,cod_fee,payment_method,payment_status,fulfillment_status,razorpay_order_id,razorpay_payment_id,created_at").order("created_at",{ascending:false}).limit(100);
 if(error)return NextResponse.json({error:error.message},{status:500});
 return NextResponse.json({orders:data,source:"supabase"});
}

export async function PATCH(request:Request){
 if(!isAdminRequest(request))return NextResponse.json({error:"Unauthorized"},{status:401});
 const supabase=getSupabaseServer(); if(!supabase)return NextResponse.json({error:"Supabase is not configured."},{status:500});
 const b=await request.json(); if(!b.id)return NextResponse.json({error:"Order id is required."},{status:400});
 const allowedPayment=["pending","paid","failed","refunded"]; const allowedFulfillment=["pending","processing","shipped","delivered","cancelled"];
 const patch:any={};
 if(b.payment_status!==undefined){if(!allowedPayment.includes(b.payment_status))return NextResponse.json({error:"Invalid payment status."},{status:400});patch.payment_status=b.payment_status}
 if(b.fulfillment_status!==undefined){if(!allowedFulfillment.includes(b.fulfillment_status))return NextResponse.json({error:"Invalid fulfillment status."},{status:400});patch.fulfillment_status=b.fulfillment_status}
 const {data,error}=await supabase.from("orders").update(patch).eq("id",b.id).select("*").single();
 if(error)return NextResponse.json({error:error.message},{status:400});
 return NextResponse.json({order:data});
}
