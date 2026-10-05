import {NextResponse} from "next/server";
import crypto from "crypto";

export async function POST(request:Request){
 try{
  const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=await request.json();
  if(!razorpay_order_id||!razorpay_payment_id||!razorpay_signature) return NextResponse.json({verified:false,error:"Missing Razorpay verification fields."},{status:400});
  const secret=process.env.RAZORPAY_KEY_SECRET;
  if(!secret) return NextResponse.json({verified:false,mode:"preview",message:"Configure RAZORPAY_KEY_SECRET for live verification."});
  const expected=crypto.createHmac("sha256",secret).update(razorpay_order_id+"|"+razorpay_payment_id).digest("hex");
  const verified=crypto.timingSafeEqual(Buffer.from(expected),Buffer.from(razorpay_signature));
  return NextResponse.json({verified});
 }catch{ return NextResponse.json({verified:false,error:"Verification failed."},{status:400});}
}