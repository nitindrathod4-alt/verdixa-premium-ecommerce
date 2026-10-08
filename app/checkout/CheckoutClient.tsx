"use client";

import {useEffect,useMemo,useState} from "react";
import {useRouter} from "next/navigation";
import {ArrowRight,Check,Loader2} from "lucide-react";
import {COD_FEE,getShipping,getTotal} from "@/lib/commerce";
import {products} from "@/lib/products";

type CartItem={slug:string;quantity:number};
const CART_KEY="verdixa_cart";

export default function CheckoutClient(){
  const router=useRouter();
  const [method,setMethod]=useState<"prepaid"|"cod">("prepaid");
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const [items,setItems]=useState<CartItem[]>([]);

  useEffect(()=>{
    try{
      const saved=JSON.parse(localStorage.getItem(CART_KEY)||"{}") as Record<string,number>;
      setItems(Object.entries(saved).filter(([,quantity])=>Number(quantity)>0).map(([slug,quantity])=>({slug,quantity:Number(quantity)})));
    }catch{
      setItems([]);
    }
  },[]);

  const subtotal=useMemo(
    ()=>items.reduce((sum,item)=>{
      const p=products.find(x=>x.slug===item.slug);
      return sum+(p?.price||0)*item.quantity;
    },0),
    [items]
  );
  const shipping=getShipping(subtotal);
  const total=getTotal(subtotal,method);

  async function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    if(!items.length){setError("Your bag is empty. Add a product before checkout.");return;}
    setError("");
    setLoading(true);
    const form=new FormData(e.currentTarget);
    const payload={
      name:String(form.get("name")),
      phone:String(form.get("phone")),
      email:String(form.get("email")),
      address:String(form.get("address")),
      pinCode:String(form.get("pinCode")),
      paymentMethod:method,
      items,
    };

    try{
      const orderRes=await fetch("/api/orders",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(payload)
      });
      const orderData=await orderRes.json();
      if(!orderRes.ok)throw new Error(orderData.error||"Could not create order.");

      if(method==="cod"){
        localStorage.removeItem(CART_KEY);
        router.push("/checkout/success?order="+encodeURIComponent(orderData.order?.order_number||orderData.orderNumber));
        return;
      }

      const payRes=await fetch("/api/razorpay/create-order",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({subtotal,paymentMethod:"prepaid"})
      });
      const payData=await payRes.json();
      if(!payRes.ok)throw new Error(payData.error||"Could not start payment.");

      if(payData.mode==="preview"){
        localStorage.removeItem(CART_KEY);
        router.push("/checkout/success?order="+encodeURIComponent(orderData.order?.order_number||orderData.orderNumber));
        return;
      }

      if(!window.Razorpay)throw new Error("Razorpay checkout script is not loaded.");

      const rz=new window.Razorpay({
        key:payData.keyId,
        amount:payData.order.amount,
        currency:"INR",
        name:"Verdixa",
        description:"Botanical wellness order",
        order_id:payData.order.id,
        handler:async(response:Record<string,string>)=>{
          const v=await fetch("/api/razorpay/verify",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(response)
          });
          const vd=await v.json();
          if(vd.verified){
            localStorage.removeItem(CART_KEY);
            router.push("/checkout/success?order="+encodeURIComponent(orderData.order?.order_number||orderData.orderNumber));
          }else{
            setError("Payment verification failed.");
            setLoading(false);
          }
        }
      });
      rz.open();
    }catch(err){
      setError(err instanceof Error?err.message:"Something went wrong.");
      setLoading(false);
    }
  }

  if(!items.length){
    return <div className="checkoutError">Your bag is empty. <a href="/shop">Return to shop →</a></div>;
  }

  return <form onSubmit={submit}>
    <div className="formGrid">
      <label>Full name<input name="name" required placeholder="Your name"/></label>
      <label>Phone<input name="phone" required placeholder="+91"/></label>
      <label>Email<input name="email" type="email" required placeholder="you@example.com"/></label>
      <label>PIN code<input name="pinCode" required inputMode="numeric" maxLength={6} placeholder="411001"/></label>
      <label className="wide">Address<textarea name="address" required placeholder="House / flat, street, area"/></label>
    </div>

    <div className="payment">
      <p className="eyebrow">PAYMENT</p>
      <button type="button" className={method==="prepaid"?"paymentOption selected":"paymentOption"} onClick={()=>setMethod("prepaid")}>
        <span>UPI / Card / Netbanking</span><b>Online</b>
      </button>
      <button type="button" className={method==="cod"?"paymentOption selected":"paymentOption"} onClick={()=>setMethod("cod")}>
        <span>Cash on Delivery</span><b>+₹{COD_FEE}</b>
      </button>
    </div>

    <div className="checkoutSummary">
      <span>Subtotal <b>₹{subtotal}</b></span>
      <span>Shipping <b>{shipping?"₹"+shipping:"FREE"}</b></span>
      {method==="cod"&&<span>COD handling <b>₹{COD_FEE}</b></span>}
      <strong>Total <b>₹{total}</b></strong>
    </div>

    {error&&<p className="checkoutError">{error}</p>}

    <button disabled={loading} className="primary checkoutButton">
      {loading?<><Loader2 size={16}/> Processing...</>:<>Continue securely <ArrowRight size={16}/></>}
    </button>
    <small className="secureNote"><Check size={13}/> Payment signature is verified on the server.</small>
  </form>;
}
