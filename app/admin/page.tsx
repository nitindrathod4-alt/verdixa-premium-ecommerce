"use client";
import Link from "next/link";
import {useEffect,useState} from "react";

type Order={id:string;order_number:string;customer_name:string;phone:string;email?:string;address?:string;pin_code?:string;total:number;subtotal:number;shipping:number;cod_fee:number;payment_method:string;payment_status:string;fulfillment_status:string;created_at:string};
type Product={id:string;slug:string;name:string;description?:string;price:number;compare_at_price?:number|null;unit?:string;category?:string;inventory:number;image_url?:string;active:boolean};
const empty={slug:"",name:"",description:"",price:"",compareAtPrice:"",unit:"",category:"",inventory:"0",imageUrl:"",active:true};

export default function AdminPage(){
 const [orders,setOrders]=useState<Order[]>([]);const [catalog,setCatalog]=useState<Product[]>([]);const [token,setToken]=useState("direct-admin");const [loggedIn,setLoggedIn]=useState(true);const [loading,setLoading]=useState(false);const [error,setError]=useState("");const [form,setForm]=useState<any>(empty);const [editing,setEditing]=useState<string|null>(null);const [saving,setSaving]=useState(false);const [msg,setMsg]=useState("");
 const headers=()=>({"Content-Type":"application/json"});
 async function load(){setLoading(true);setError("");try{const h={Authorization:"Bearer "+token};const [o,p]=await Promise.all([fetch("/api/admin/orders",{headers:h}),fetch("/api/admin/products",{headers:h})]);const od=await o.json(),pd=await p.json();if(!o.ok||!p.ok)throw new Error(od.error||pd.error||"Invalid admin token or API unavailable.");setOrders(od.orders||[]);setCatalog(pd.products||[])}catch(e){setError(e instanceof Error?e.message:"Unable to load dashboard.")}finally{setLoading(false)}}
 useEffect(()=>{load()},[]);
 const set=(k:string,v:any)=>setForm((x:any)=>({...x,[k]:v}));
 async function productSave(e:any){e.preventDefault();setSaving(true);setMsg("");try{const r=await fetch("/api/admin/products",{method:editing?"PATCH":"POST",headers:headers(),body:JSON.stringify(editing?{id:editing,...form}:form)});const d=await r.json();if(!r.ok)throw new Error(d.error||"Save failed.");setMsg(editing?"Product updated.":"Product added.");setForm(empty);setEditing(null);await load()}catch(e){setMsg(e instanceof Error?e.message:"Save failed.")}finally{setSaving(false)}}
 function edit(p:Product){setEditing(p.id);setForm({slug:p.slug,name:p.name,description:p.description||"",price:String(p.price),compareAtPrice:p.compare_at_price==null?"":String(p.compare_at_price),unit:p.unit||"",category:p.category||"",inventory:String(p.inventory),imageUrl:p.image_url||"",active:p.active});window.scrollTo({top:0,behavior:"smooth"})}
 async function remove(id:string){if(!confirm("Delete this product?"))return;const r=await fetch("/api/admin/products",{method:"DELETE",headers:headers(),body:JSON.stringify({id})});const d=await r.json();if(!r.ok){setError(d.error||"Delete failed.");return}await load()}
 async function orderUpdate(id:string,key:string,value:string){const r=await fetch("/api/admin/orders",{method:"PATCH",headers:headers(),body:JSON.stringify({id,[key]:value})});const d=await r.json();if(!r.ok){setError(d.error||"Order update failed.");return}await load()}
 return <main className="adminPage">
<header className="adminHeader"><div><p className="eyebrow">VERDIXA / CONTROL ROOM</p><h1>Commerce control.</h1><p className="adminSub">A quiet command center for your botanical store.</p></div><div className="adminHeaderRight"><span className="adminLive"><i/> LIVE STORE</span><Link href="/" className="adminBack">View storefront →</Link></div></header>
 {error&&<p className="adminError">{error}</p>}
 <section className="adminStats"><article className="statPrimary"><span>CATALOG</span><strong>{catalog.length}</strong><small>Active products & drafts</small></article><article><span>ORDERS</span><strong>{orders.length}</strong><small>Latest 100 orders</small></article><article><span>GROSS REVENUE</span><strong>₹{orders.reduce((n,o)=>n+Number(o.total||0),0)}</strong><small>Loaded order value</small></article></section>
 <section className="adminPanel"><div className="adminPanelHead"><div><p className="eyebrow">PRODUCT MANAGEMENT</p><h2>{editing?"Edit product":"Add product"}</h2></div><span>{saving?"Saving…":"Supabase"}</span></div>
 <form className="adminForm" onSubmit={productSave}>
 <input required value={form.name} onChange={e=>set("name",e.target.value)} placeholder="Product name"/>
 <input required value={form.slug} onChange={e=>set("slug",e.target.value)} placeholder="Slug e.g. pure-moringa-powder"/>
 <input required type="number" value={form.price} onChange={e=>set("price",e.target.value)} placeholder="Price ₹"/>
 <input type="number" value={form.compareAtPrice} onChange={e=>set("compareAtPrice",e.target.value)} placeholder="Compare-at / sale original ₹"/>
 <input value={form.unit} onChange={e=>set("unit",e.target.value)} placeholder="Unit / weight"/>
 <input value={form.category} onChange={e=>set("category",e.target.value)} placeholder="Category"/>
 <input type="number" min="0" value={form.inventory} onChange={e=>set("inventory",e.target.value)} placeholder="Stock"/>
 <input value={form.imageUrl} onChange={e=>set("imageUrl",e.target.value)} placeholder="Product image URL or /products/file.jpg"/>
 <textarea value={form.description} onChange={e=>set("description",e.target.value)} placeholder="Description"/>
 <label className="adminCheck"><input type="checkbox" checked={form.active} onChange={e=>set("active",e.target.checked)}/> Published</label>
 <div><button className="primary" disabled={saving}>{editing?"Update product":"Add product"}</button>{editing&&<button type="button" className="adminCancel" onClick={()=>{setEditing(null);setForm(empty)}}>Cancel</button>}</div>
 {msg&&<p className="adminNotice">{msg}</p>}
 </form></section>
 <section className="adminPanel"><div className="adminPanelHead"><div><p className="eyebrow">CATALOG</p><h2>Products</h2></div><span>{catalog.length} items</span></div>
 <div className="adminTable">{catalog.map(p=><div className="adminRow productRow" key={p.id}><div>{p.image_url&&<img src={p.image_url} alt="" className="adminThumb"/>}<b>{p.name}</b><small>{p.category} · {p.unit}</small></div><strong>₹{p.price}</strong><span>{p.inventory} stock</span><span>{p.active?"Published":"Draft"}</span><div className="adminActions"><button onClick={()=>edit(p)}>Edit</button><button onClick={()=>remove(p.id)}>Delete</button></div></div>)}</div></section>
 <section className="adminPanel"><div className="adminPanelHead"><div><p className="eyebrow">ORDERS</p><h2>Order management</h2></div><span>{loading?"Refreshing…":"Live API"}</span></div>
 <div className="adminTable">{orders.length?orders.map(o=><div className="adminRow orderRow" key={o.id}><div><b>{o.order_number}</b><small>{o.customer_name} · {o.phone}<br/>{o.address||""} {o.pin_code||""}</small></div><strong>₹{o.total}</strong><span>{o.payment_method}<select value={o.payment_status} onChange={e=>orderUpdate(o.id,"payment_status",e.target.value)}><option>pending</option><option>paid</option><option>failed</option><option>refunded</option></select></span><span><select value={o.fulfillment_status} onChange={e=>orderUpdate(o.id,"fulfillment_status",e.target.value)}><option>pending</option><option>processing</option><option>shipped</option><option>delivered</option><option>cancelled</option></select></span></div>):<p className="adminEmpty">No orders loaded yet.</p>}</div></section>
 </main>
}
