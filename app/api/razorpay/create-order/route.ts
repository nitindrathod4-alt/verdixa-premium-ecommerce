import {NextResponse} from "next/server";
import {getTotal,getShipping,COD_FEE} from "@/lib/commerce";

export async function POST(request:Request){
 try{
  const body=await request.json();
  const subtotal=Number(body.subtotal);
  const paymentMethod=body.paymentMethod==="cod"?"cod":"prepaid";
  if(!Number.isFinite(subtotal)||subtotal<=0) return NextResponse.json({error:"Invalid subtotal."},{status:400});
  if(paymentMethod==="cod") return NextResponse.json({error:"COD does not require a Razorpay order."},{status:400});
  const keyId=process.env.RAZORPAY_KEY_ID;
  const secret=process.env.RAZORPAY_KEY_SECRET;
  if(!keyId||!secret) return NextResponse.json({mode:"preview",amount:getTotal(subtotal,"prepaid")*100,currency:"INR"});
  const amount=getTotal(subtotal,"prepaid")*100;
  const auth=Buffer.from(keyId+":"+secret).toString("base64");
  const response=await fetch("https://api.razorpay.com/v1/orders",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Basic "+auth},body:JSON.stringify({amount,currency:"INR",receipt:"verdixa_"+Date.now(),notes:{shipping:getShipping(subtotal),cod_fee:0}})});
  const data=await response.json();
  if(!response.ok) return NextResponse.json({error:data?.error?.description||"Razorpay order creation failed."},{status:500});
  return NextResponse.json({keyId,order:data});
 }catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Unable to create payment order."},{status:500});}
}