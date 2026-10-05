"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Leaf, ShoppingBag, Sparkles } from "lucide-react";

const products = [
  { name: "Pure Moringa Powder", price: "₹299", meta: "100 G", tone: "green", note: "Daily greens" },
  { name: "Hibiscus Herbal Infusion", price: "₹549", compare: "₹699", meta: "30 PYRAMID BAGS", tone: "burgundy", note: "Floral infusion" },
  { name: "Butterfly Pea Blue Tea", price: "₹579", compare: "₹799", meta: "30 PYRAMID BAGS", tone: "blue", note: "Calm ritual" },
];

export default function Home() {
  return (
    <main>
      <div className="announcement">COMPLIMENTARY SHIPPING ON ORDERS ₹799+ · BOTANICAL WELLNESS, MADE A DAILY RITUAL</div>

      <nav className="nav">
        <a className="logo" href="#">VERDIXA<span>®</span></a>
        <div className="navLinks">
          <a href="#collection">Collection</a>
          <a href="#ingredients">Ingredients</a>
          <a href="#philosophy">Our story</a>
          <a href="#ritual">Daily ritual</a>
        </div>
        <button className="bag" aria-label="Shopping bag"><ShoppingBag size={18} /><i>0</i></button>
      </nav>

      <section className="hero">
        <div className="heroCopy">
          <p className="eyebrow"><Leaf size={13}/> Botanical wellness</p>
          <h1>Nature’s wellness,<br/><em>made a daily ritual.</em></h1>
          <p className="heroText">Thoughtfully sourced botanicals, presented with clarity and crafted for everyday rituals.</p>
          <div className="heroActions"><a className="primary" href="#collection">Shop the collection <ArrowRight size={16}/></a><span>01 / 03</span></div>
        </div>
        <div className="heroVisual">
          <motion.div className="orb orb1" animate={{ y: [0, -14, 0], rotate: [12, 14, 12] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}/>
          <motion.div className="orb orb2" animate={{ y: [0, 16, 0], rotate: [-20, -16, -20] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}/>
          <motion.div className="orb orb3" animate={{ y: [0, -10, 0], rotate: [20, 24, 20] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}/>
          <div className="heroBottle"><span>VERDIXA</span><small>PURE BOTANICALS</small></div>
          <div className="heroStamp">QUIET<br/>LUXURY</div>
        </div>
        <a className="scrollHint" href="#collection"><ArrowDown size={14}/> Scroll to discover</a>
      </section>

      <section className="trust">
        <span><Leaf size={15}/> Botanical integrity</span><span><Sparkles size={15}/> Thoughtfully crafted</span><span>100% considered ingredients</span><span>01 — Daily wellness</span>
      </section>

      <section id="collection" className="section">
        <div className="sectionHead"><div><p className="eyebrow">The collection</p><h2>Rituals from<br/><em>the earth.</em></h2></div><p>Simple botanicals. Premium quality.<br/>Designed for your everyday.</p></div>
        <div className="products">
          {products.map((p, i) => (
            <motion.article key={p.name} className="productCard" whileHover={{ y: -7 }} transition={{ duration: .3 }}>
              <div className={`productVisual ${p.tone}`}><span>VERDIXA</span><strong>{String(i + 1).padStart(2, "0")}</strong><small>{p.note}</small></div>
              <div className="productInfo"><div><h3>{p.name}</h3><p>{p.meta}</p></div><div className="price"><b>{p.price}</b>{p.compare && <del>{p.compare}</del>}</div></div>
              <button className="add">Add to bag <ArrowRight size={15}/></button>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="ingredients" className="ingredientStory">
        <div className="ingredientVisual"><div className="ingredientCircle"/><span>01 / 03</span></div>
        <div className="ingredientCopy"><p className="eyebrow">Ingredient science</p><h2>What goes in<br/><em>matters.</em></h2><p>One visual. Three botanicals. A considered journey from plant to daily ritual.</p><div className="ingredientList"><div><b>01</b><span>Moringa</span><small>Earthy · Green</small></div><div><b>02</b><span>Hibiscus</span><small>Floral · Tart</small></div><div><b>03</b><span>Butterfly Pea</span><small>Delicate · Blue</small></div></div></div>
      </section>

      <section id="philosophy" className="philosophy"><p className="eyebrow">Our philosophy</p><h2>Trust in what<br/><em>you consume.</em></h2><p>Verdixa brings botanical ingredients into a considered modern ritual — with transparency, restraint and respect for the plant.</p><div className="philosophyMark">V / 2026</div></section>

      <section id="ritual" className="ritual"><div><p className="eyebrow">The daily ritual</p><h2>Slow down.<br/><em>Steep in.</em></h2></div><div className="steps"><div><span>01</span><b>SCOOP</b><p>Measure your botanical ritual.</p></div><div><span>02</span><b>STEEP</b><p>Give the ingredients time to open.</p></div><div><span>03</span><b>INFUSE</b><p>Make wellness part of your day.</p></div></div></section>

      <section className="ethos"><p>“A return to<br/><em>botanical integrity.</em>”</p><small>VERDIXA ETHOS</small></section>

      <footer><div><div className="logo">VERDIXA<span>®</span></div><p>Nature’s Wellness, Made a Daily Ritual.</p></div><div className="footerLinks"><a href="#">Instagram</a><a href="#">Contact</a><a href="#">Returns</a></div><small>© 2026 Verdixa</small></footer>
    </main>
  );
}