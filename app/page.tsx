"use client";

import {motion} from "framer-motion";
import {ArrowRight,Leaf,Sparkles,ShoppingBag} from "lucide-react";

const products=[
{name:"Pure Moringa Powder",price:"₹299",meta:"100 G",tone:"green"},
{name:"Hibiscus Herbal Infusion",price:"₹549",meta:"30 PYRAMID BAGS",tone:"burgundy"},
{name:"Butterfly Pea Blue Tea",price:"₹579",meta:"30 PYRAMID BAGS",tone:"blue"}
];

export default function Home(){
return <main className="singleHome">
<div className="announcement">COMPLIMENTARY SHIPPING ON ORDERS ₹799+ · BOTANICAL WELLNESS, MADE A DAILY RITUAL</div>
<nav className="nav">
<a className="logo" href="/">VERDIXA<span>®</span></a>
<div className="navLinks"><a href="#collection">Collection</a><a href="#ingredients">Ingredients</a><a href="#story">Our story</a><a href="#ritual">Daily ritual</a></div>
<button className="bag" aria-label="Shopping bag"><ShoppingBag size={17}/><i>0</i></button>
</nav>

<section className="singleHero">
<div className="singleCopy">
<p className="eyebrow"><Leaf size={12}/> Botanical wellness</p>
<h1>Nature’s wellness,<br/><em>made a daily ritual.</em></h1>
<p className="heroText">Thoughtfully sourced botanicals, presented with clarity and crafted for everyday rituals.</p>
<a className="primary" href="#collection">Shop the collection <ArrowRight size={15}/></a>
<div className="miniTrust"><span><Leaf size={13}/> Botanical integrity</span><span><Sparkles size={13}/> Thoughtfully crafted</span><span>100% considered ingredients</span></div>
</div>

<div className="singleVisual">
<motion.div className="orb orb1" animate={{y:[0,-10,0]}} transition={{duration:6,repeat:Infinity,ease:"easeInOut"}}/>
<motion.div className="orb orb2" animate={{y:[0,12,0]}} transition={{duration:7,repeat:Infinity,ease:"easeInOut"}}/>
<motion.div className="orb orb3" animate={{y:[0,-8,0]}} transition={{duration:5,repeat:Infinity,ease:"easeInOut"}}/>
<div className="heroBottle"><span>VERDIXA</span><small>PURE BOTANICALS</small></div>
<div className="heroStamp">QUIET<br/>LUXURY</div>
</div>
</section>

<section id="collection" className="singleCollection">
<div className="compactHeading"><p className="eyebrow">The collection</p><h2>Rituals from <em>the earth.</em></h2></div>
<div className="compactProducts">{products.map((p,i)=><motion.article key={p.name} className="compactProduct" whileHover={{y:-4}}>
<div className={`compactVisual ${p.tone}`}><span>VERDIXA</span><b>0{i+1}</b></div>
<div className="compactMeta"><div><strong>{p.name}</strong><small>{p.meta}</small></div><b>{p.price}</b></div>
</motion.article>)}</div>
</section>

<section className="singleBottom">
<div id="ingredients"><p className="eyebrow">Ingredient science</p><strong>What goes in <em>matters.</em></strong><small>Moringa · Hibiscus · Butterfly Pea</small></div>
<div id="story"><p className="eyebrow">Our philosophy</p><strong>Trust in what you consume.</strong><small>Transparency · restraint · respect for the plant.</small></div>
<div id="ritual"><p className="eyebrow">Daily ritual</p><strong>Scoop · Steep · Infuse</strong><small>Make wellness part of your day.</small></div>
</section>
<footer className="singleFooter"><span>VERDIXA®</span><small>Nature’s Wellness, Made a Daily Ritual. · © 2026</small><span>V / 2026</span></footer>
</main>
}