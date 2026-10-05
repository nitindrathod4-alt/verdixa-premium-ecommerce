"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useState } from "react";

type Product = { name:string; price:number; meta:string; tone:string };

const catalog:Product[]=[
 {name:"Pure Moringa Powder",price:299,meta:"100 G",tone:"green"},
 {name:"Hibiscus Herbal Infusion",price:549,meta:"30 PYRAMID BAGS",tone:"burgundy"},
 {name:"Butterfly Pea Blue Tea",price:579,meta:"30 PYRAMID BAGS",tone:"blue"}
];

export default function ShopClient(){
 const [bag,setBag]=useState<Product[]>([]);
 const [open,setOpen]=useState(false);
 const [qty,setQty]=useState(1);
 const add=(p:Product)=>{setBag([p]);setOpen(true)};
 const subtotal=bag.reduce((s,p)=>s+p.price,0)*qty;
 const shipping=subtotal>=799||subtotal===0?0:29;
 const total=subtotal+shipping;
 return <section className="shopClient">
   <div className="shopGrid">{catalog.map(p=><article className="shopCard" key={p.name}>
    <div className={`shopImage ${p.tone}`}><span>VERDIXA</span></div>
    <div className="shopMeta"><div><h3>{p.name}</h3><p>{p.meta}</p></div><strong>₹{p.price}</strong></div>
    <button className="primary shopAdd" onClick={()=>add(p)}>Add to bag <ArrowRight size={15}/></button>
   </article>)}</div>
   <AnimatePresence>{open&&<><motion.div className="drawerBackdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setOpen(false)}/>
   <motion.aside className="cartDrawer" initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}}>
    <header><div><p className="eyebrow">Your ritual</p><h3>Shopping bag</h3></div><button onClick={()=>setOpen(false)} aria-label="Close"><X/></button></header>
    {bag.length?<div className="drawerBody"><div className="drawerProduct"><div className={`miniImage ${bag[0].tone}`}/><div><h4>{bag[0].name}</h4><p>{bag[0].meta}</p><b>₹{bag[0].price}</b></div></div>
      <div className="qty"><button onClick={()=>setQty(Math.max(1,qty-1))}><Minus size={14}/></button><span>{qty}</span><button onClick={()=>setQty(qty+1)}><Plus size={14}/></button></div>
      <div className="shippingBar"><span>{subtotal>=799?"Free shipping unlocked":"₹"+Math.max(0,799-subtotal)+" away from free shipping"}</span><i><em style={{width:`${Math.min(100,subtotal/799*100)}%`}}/></i></div>
      <div className="totals"><span>Subtotal <b>₹{subtotal}</b></span><span>Shipping <b>{shipping===0?"FREE":"₹"+shipping}</b></span><strong>Total <b>₹{total}</b></strong></div>
      <button className="primary checkout">Continue to checkout <ArrowRight size={16}/></button>
    </div>:<div className="empty"><ShoppingBag size={30}/><p>Your bag is waiting.</p></div>}
   </motion.aside></>}</AnimatePresence>
 </section>
}