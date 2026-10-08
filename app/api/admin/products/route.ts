import {NextResponse} from "next/server";
import {getSupabaseServer} from "@/lib/supabase/server";
import {isAdminRequest} from "@/lib/admin";

function bodyNumber(v:unknown,fallback=0){const n=Number(v);return Number.isFinite(n)?Math.max(0,Math.round(n)):fallback}

export async function GET(request:Request){
 const supabase=getSupabaseServer();
 if(!supabase)return NextResponse.json({products:[],source:"preview"});
 const {data,error}=await supabase.from("products").select("*").order("created_at",{ascending:false});
 if(error)return NextResponse.json({error:error.message},{status:500});
 return NextResponse.json({products:data,source:"supabase"});
}

export async function POST(request:Request){
 if(!isAdminRequest(request))return NextResponse.json({error:"Unauthorized"},{status:401});
 const supabase=getSupabaseServer(); if(!supabase)return NextResponse.json({error:"Supabase is not configured."},{status:500});
 const b=await request.json();
 if(!b.name||!b.slug)return NextResponse.json({error:"Name and slug are required."},{status:400});
 const payload={slug:String(b.slug).trim().toLowerCase(),name:String(b.name).trim(),description:String(b.description||""),price:bodyNumber(b.price),compare_at_price:b.compareAtPrice===""||b.compareAtPrice==null?null:bodyNumber(b.compareAtPrice),unit:String(b.unit||""),category:String(b.category||""),inventory:bodyNumber(b.inventory),image_url:String(b.imageUrl||""),active:b.active!==false};
 const {data,error}=await supabase.from("products").insert(payload).select("*").single();
 if(error)return NextResponse.json({error:error.message},{status:400});
 return NextResponse.json({product:data});
}

export async function PATCH(request:Request){
 if(!isAdminRequest(request))return NextResponse.json({error:"Unauthorized"},{status:401});
 const supabase=getSupabaseServer(); if(!supabase)return NextResponse.json({error:"Supabase is not configured."},{status:500});
 const b=await request.json(); if(!b.id)return NextResponse.json({error:"Product id is required."},{status:400});
 const payload={slug:String(b.slug).trim().toLowerCase(),name:String(b.name).trim(),description:String(b.description||""),price:bodyNumber(b.price),compare_at_price:b.compareAtPrice===""||b.compareAtPrice==null?null:bodyNumber(b.compareAtPrice),unit:String(b.unit||""),category:String(b.category||""),inventory:bodyNumber(b.inventory),image_url:String(b.imageUrl||""),active:Boolean(b.active),updated_at:new Date().toISOString()};
 const {data,error}=await supabase.from("products").update(payload).eq("id",b.id).select("*").single();
 if(error)return NextResponse.json({error:error.message},{status:400});
 return NextResponse.json({product:data});
}

export async function DELETE(request:Request){
 if(!isAdminRequest(request))return NextResponse.json({error:"Unauthorized"},{status:401});
 const supabase=getSupabaseServer(); if(!supabase)return NextResponse.json({error:"Supabase is not configured."},{status:500});
 const b=await request.json(); if(!b.id)return NextResponse.json({error:"Product id is required."},{status:400});
 const {error}=await supabase.from("products").delete().eq("id",b.id);
 if(error)return NextResponse.json({error:error.message},{status:400});
 return NextResponse.json({success:true});
}
