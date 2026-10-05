"use client";

import { motion } from "framer-motion";
import { ArrowRight, Leaf, ShoppingBag, Sparkles } from "lucide-react";

const products = [
  { name: "Pure Moringa Powder", price: "₹299", meta: "100 G", tone: "green" },
  { name: "Hibiscus Herbal Infusion", price: "₹549", meta: "30 PYRAMID BAGS", tone: "burgundy" },
  { name: "Butterfly Pea Blue Tea", price: "₹579", meta: "30 PYRAMID BAGS", tone: "blue" },
];

export default function Home() {
  return (
    <main>
      <div className="announcement">NATURE’S WELLNESS, MADE A DAILY RITUAL · FREE SHIPPING ON ORDERS ₹799+</div>

      <nav className="nav">
        <a className="logo" href="#">VERDIXA<span>®</span></a>
        <div className="navLinks">
          <a href="#collection">Collection</a>
          <a href="#philosophy">Philosophy</a>
          <a href="#ritual">Daily Ritual</a>
        </div>
        <button className="bag" aria-label="Shopping bag"><ShoppingBag size={19} /></button>
      </nav>

      <section className="hero">
        <div className="heroCopy">
          <p className="eyebrow"><Leaf size={14}/> BOTANICAL WELLNESS</p>
          <h1>Nature’s wellness,<br/><em>made a daily ritual.</em></h1>
          <p className="heroText">Thoughtfully sourced botanicals, presented with clarity and crafted for everyday rituals.</p>
          <a className="primary" href="#collection">Explore the collection <ArrowRight size={17}/></a>
        </div>
        <div className="heroVisual">
          <div className="orb orb1"/><div className="orb orb2"/><div className="orb orb3"/>
          <div className="heroLabel">PURE<br/>BOTANICALS</div>
        </div>
      </section>

      <section className="trust">
        <span><Leaf size={16}/> Botanical integrity</span>
        <span><Sparkles size={16}/> Thoughtfully crafted</span>
        <span>01 — Daily wellness</span>
      </section>

      <section id="collection" className="section">
        <div className="sectionHead"><div><p className="eyebrow">THE COLLECTION</p><h2>Rituals from the earth.</h2></div><p>Simple botanicals. Premium quality.<br/>Designed for your everyday.</p></div>
        <div className="products">
          {products.map((p, i) => (
            <motion.article key={p.name} className="productCard" whileHover={{ y: -8 }}>
              <div className={`productVisual ${p.tone}`}><span>VERDIXA</span><strong>{String(i+1).padStart(2,"0")}</strong></div>
              <div className="productInfo"><div><h3>{p.name}</h3><p>{p.meta}</p></div><b>{p.price}</b></div>
              <button className="add">Add to bag <ArrowRight size={15}/></button>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="philosophy" className="philosophy">
        <p className="eyebrow">OUR PHILOSOPHY</p>
        <h2>Trust in what<br/><em>you consume.</em></h2>
        <p>Verdixa brings botanical ingredients into a considered modern ritual — with transparency, restraint and respect for the plant.</p>
      </section>

      <section id="ritual" className="ritual">
        <p className="eyebrow">THE DAILY RITUAL</p>
        <h2>Slow down. <em>Steep in.</em></h2>
        <div className="steps"><span>01 — SCOOP</span><span>02 — STEEP</span><span>03 — INFUSE</span></div>
      </section>

      <footer><div className="logo">VERDIXA<span>®</span></div><p>Nature’s Wellness, Made a Daily Ritual.</p><small>© 2026 Verdixa. All rights reserved.</small></footer>
    </main>
  );
}