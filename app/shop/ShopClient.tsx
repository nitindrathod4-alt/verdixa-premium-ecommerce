"use client";
import {useEffect,useMemo,useState} from "react";
import Link from "next/link";
import {AnimatePresence,motion} from "framer-motion";
import {Minus,Plus,ShoppingBag,X,ArrowRight,Leaf,ArrowUpRight} from "lucide-react";
import {getFreeShippingProgress,getShipping,getTotal} from "@/lib/commerce";
import {products} from "@/lib/products";

const CART_KEY="verdixa_cart";
export default function ShopClient(){
 const [bag,setBag]=useState<Record<string,number>>({});
 const [open,setOpen]=useState(false);
 const [flipped,setFlipped]=useState<string|null>(null);
 useEffect(()=>{try{const saved=localStorage.getItem(CART_KEY);if(saved)setBag(JSON.parse(saved))}catch{}},[]);
 useEffect(()=>{localStorage.setItem(CART_KEY,JSON.stringify(bag))},[bag]);
 const items=useMemo(()=>products.filter(p=>bag[p.slug]).map(p=>({...p,quantity:bag[p.slug]})),[bag]);
 const subtotal=items.reduce((s,p)=>s+p.price*p.quantity,0),shipping=getShipping(subtotal),total=getTotal(subtotal,"prepaid"),progress=getFreeShippingProgress(subtotal);
 const add=(slug:string)=>{setBag(b=>({...b,[slug]:(b[slug]||0)+1}));setOpen(true)};
 const change=(slug:string,n:number)=>setBag(b=>{const next={...b};if(n<=0)delete next[slug];else next[slug]=n;return next});
 return <>
  <section className="vxShopIntro"><div className="vxShopIntroCopy"><span className="vxShopKicker"><Leaf size={13}/> THE VERDIXA BOTANICAL EDIT</span><h1>Find your<br/><em>daily ritual.</em></h1><p>Thoughtfully chosen botanicals for slower mornings, clearer moments, and a little more care in every day.</p><div className="vxShopIntroFoot"><span>SMALL-BATCH BOTANICALS</span><span>01 — 03 / THE COLLECTION</span></div></div><div className="vxShopIntroVisual"><div className="vxShopSun"/><div className="vxShopLeaf leafA"/><div className="vxShopLeaf leafB"/><div className="vxShopLeaf leafC"/><span>ROOTED IN NATURE<br/>MADE FOR YOUR RITUAL</span></div></section>
  <section className="vxShopBar"><div><span>THE COLLECTION</span><b>{products.length} thoughtfully made essentials</b></div><span>BOTANICAL WELLNESS <i>·</i> EVERYDAY RITUALS</span></section>
  <section className="vxShopGrid">
   {products.map((p,index)=><article className={"vxShopCard product-"+p.slug} key={p.slug}>
    <div className="vxShopImageStage">
     <span className="vxShopIndex">0{index+1} / 03</span>
     {p.compareAtPrice&&<span className="vxSaleTag">SAVE ₹{p.compareAtPrice-p.price}</span>}
     <Link href={"/products/"+p.slug} className="vxShopImageLink" aria-label={"View "+p.name}>
      {p.imageUrl?<img src={p.imageUrl} alt={p.name}/>:<div className="vxBotanicalPlaceholder"><Leaf size={45}/></div>}
     </Link>
     <button className="vxQuickAdd" onClick={()=>add(p.slug)} aria-label={"Add "+p.name+" to bag"}><Plus size={17}/></button>
     <span className="vxImageCaption">{p.category}</span>
    </div>
    <div className="vxShopCardInfo">
     <div className="vxShopCardTop"><span>{p.category} <i>·</i> {p.unit}</span><button type="button" onClick={()=>setFlipped(flipped===p.slug?null:p.slug)}>{flipped===p.slug?"Close details":"Discover"} <ArrowUpRight size={12}/></button></div>
     <Link href={"/products/"+p.slug} className="vxShopProductName"><h2>{p.name}</h2><span>↗</span></Link>
     <p className="vxShopDescription">{p.description}</p>
     <div className="vxShopPriceRow"><div><strong>₹{p.price.toLocaleString("en-IN")}</strong>{p.compareAtPrice&&<del>₹{p.compareAtPrice.toLocaleString("en-IN")}</del>}</div><span>{p.unit}</span></div>
     <button className="vxShopAddButton" onClick={()=>add(p.slug)}>Add to bag <ArrowRight size={15}/></button>
     <AnimatePresence>{flipped===p.slug&&<motion.div className="vxShopDetails" initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}}><div><span>THE BOTANICAL</span><b>{p.category}</b></div><div><span>YOUR PACK</span><b>{p.unit}</b></div><p>{p.description}</p><Link href={"/products/"+p.slug}>Explore product details <ArrowRight size={13}/></Link></motion.div>}</AnimatePresence>
    </div>
   </article>)}
  </section>
  <section className="vxShopPromise"><span>THE VERDIXA WAY</span><p>Less noise.<br/><em>More nature.</em></p><div>Botanical essentials made to bring intention back to the everyday.</div></section>
  <AnimatePresence>{open&&<><motion.div className="cartBackdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setOpen(false)}/><motion.aside className="cartDrawer" initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} transition={{type:"spring",damping:28,stiffness:260}}>
   <header><div><p className="eyebrow">YOUR BAG</p><strong>{items.reduce((n,p)=>n+p.quantity,0)} items</strong></div><button onClick={()=>setOpen(false)} aria-label="Close cart"><X/></button></header>
   {items.length===0?<div className="cartEmpty"><ShoppingBag/><p>Your bag is waiting.</p></div>:<><div className="cartItems">{items.map(p=><div className="cartItem" key={p.slug}><div className="cartThumb">{p.imageUrl&&<img src={p.imageUrl} alt="" style={{width:"100%",height:"100%",objectFit:"contain",mixBlendMode:"multiply",background:"#ece8df"}}/>}</div><div className="cartItemInfo"><strong>{p.name}</strong><small>₹{p.price} · {p.unit}</small><div className="qty"><button onClick={()=>change(p.slug,p.quantity-1)} aria-label="Decrease quantity"><Minus/></button><span>{p.quantity}</span><button onClick={()=>change(p.slug,p.quantity+1)} aria-label="Increase quantity"><Plus/></button></div></div><b>₹{(p.price*p.quantity).toLocaleString("en-IN")}</b></div>)}</div><div className="shippingProgress"><div><span>{subtotal>=799?"Free shipping unlocked":"Free shipping"}</span><b>{subtotal>=799?"✓":"₹"+Math.max(0,799-subtotal)+" away"}</b></div><i><em style={{width:progress+"%"}}/></i></div><div className="cartTotals"><span>Subtotal <b>₹{subtotal}</b></span><span>Shipping <b>{shipping?"₹"+shipping:"FREE"}</b></span><strong>Total <b>₹{total}</b></strong></div><Link className="primary cartCheckout" href="/checkout">Checkout <ArrowRight size={15}/></Link></>}
  </motion.aside></>}</AnimatePresence>
 </>;
}
