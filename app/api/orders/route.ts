import {NextResponse} from "next/server";
import {getSupabaseServer} from "@/lib/supabase/server";
import {COD_FEE,getShipping,getTotal} from "@/lib/commerce";
import {products as fallbackProducts} from "@/lib/products";

export async function POST(request:Request){
 try{
  const body=await request.json();
  const {name,phone,email,address,pinCode,paymentMethod="prepaid",items}=body;
  if(!name||!phone||!address||!pinCode||!Array.isArray(items)||!items.length) return NextResponse.json({error:"Missing required checkout details."},{status:400});
  const catalog=fallbackProducts;
  let subtotal=0;
  const normalized=items.map((item:{slug:string;quantity:number})=>{
   const product=catalog.find(p=>p.slug===item.slug);
   if(!product) throw new Error("Product not found: "+item.slug);
   const quantity=Math.max(1,Math.min(20,Number(item.quantity)||1));
   const lineTotal=product.price*quantity; subtotal+=lineTotal;
   return {product_slug:product.slug,product_name:product.name,unit_price:product.price,quantity,line_total:lineTotal};
  });
  const shipping=getShipping(subtotal); const codFee=paymentMethod==="cod"?COD_FEE:0; const total=getTotal(subtotal,paymentMethod);
  const orderNumber="VDX-"+Date.now().toString(36).toUpperCase();
  const supabase=getSupabaseServer();
  if(!supabase) return NextResponse.json({order:{orderNumber,paymentMethod,subtotal,shipping,codFee,total,items:normalized},source:"preview"});
  const {data:order,error}=await supabase.from("orders").insert({order_number:orderNumber,customer_name:name,phone,email:email||null,address,pin_code:pinCode,payment_method:paymentMethod,payment_status:"pending",fulfillment_status:"pending",subtotal,shipping,cod_fee:codFee,total}).select("id,order_number,total").single();
  if(error) return NextResponse.json({error:error.message},{status:500});
  const {error:itemError}=await supabase.from("order_items").insert(normalized.map(x=>({...x,order_id:order.id})));
  if(itemError) return NextResponse.json({error:itemError.message},{status:500});
  return NextResponse.json({order,source:"supabase"});
 }catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Unable to create order."},{status:400});}
}