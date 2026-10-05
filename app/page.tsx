"use client";

import { ArrowRight, Heart, Leaf, Search, ShieldCheck, ShoppingBag, Truck, UserRound, WalletCards, PackageCheck } from "lucide-react";

const products = [
  { name: "Botanical Face Wash", meta: "Neem · Tulsi · Vitamin E", price: "₹449", compare: "₹599", tone: "wash", badge: "Bestseller", reviews: "4.8 (1.2k reviews)" },
  { name: "Natural Face Cream", meta: "Aloe Vera · Green Tea", price: "₹599", compare: "₹749", tone: "cream", badge: "20% OFF", reviews: "4.9 (980 reviews)" },
  { name: "Radiant Face Serum", meta: "Niacinamide · Hyaluronic Acid", price: "₹699", compare: "₹899", tone: "serum", reviews: "4.8 (760 reviews)" },
];

export default function Home() {
  return (
    <main className="verdixaPage">
      <div className="verdixaAnnouncement">Free shipping on orders above ₹799 <span>|</span> Cash on Delivery Available <span>|</span> Natural. Ethical. Effective.</div>

      <nav className="verdixaNav">
        <a href="/" className="verdixaLogo"><span className="logoLeaf"><Leaf size={25} /></span>VERDIXA</a>
        <div className="verdixaNavLinks">
          <a href="#home">Home</a><a href="#collection">Shop</a><a href="#philosophy">Our Philosophy</a><a href="#ingredients">Ingredients</a><a href="#contact">Track Order</a>
        </div>
        <div className="verdixaNavActions">
          <button aria-label="Search"><Search size={23}/></button>
          <button aria-label="Account"><UserRound size={23}/></button>
          <button className="verdixaBag" aria-label="Shopping bag"><ShoppingBag size={24}/><b>2</b></button>
        </div>
      </nav>

      <section id="home" className="verdixaHero">
        <div className="heroContent">
          <p className="verdixaEyebrow">NATURE MEETS MODERN SKINCARE</p>
          <h1>Pure Ingredients.<br/><em>Real Results.</em></h1>
          <p className="verdixaHeroText">Clean, conscious skincare crafted with the power of nature — for naturally radiant, healthy skin.</p>
          <a href="#collection" className="verdixaPrimary">Shop Now <ArrowRight size={18}/></a>
          <div className="heroClaims">
            <span><Leaf size={27}/><b>100% Natural<br/>Ingredients</b></span>
            <span><ShieldCheck size={27}/><b>Dermatologist<br/>Tested</b></span>
            <span><Heart size={27}/><b>Cruelty Free<br/>& Vegan</b></span>
          </div>
        </div>
        <div className="heroScene">
          <div className="heroBackdropLeaf leafA"></div><div className="heroBackdropLeaf leafB"></div><div className="heroRock"></div>
          <div className="heroProduct heroCream"><span>VERDIXA</span><b>NATURAL FACE CREAM</b><small>Aloe Vera · Green Tea</small></div>
          <div className="heroProduct heroWash"><span>VERDIXA</span><b>BOTANICAL<br/>FACE WASH</b><small>Neem · Tulsi · Vitamin E</small></div>
          <div className="heroProduct heroSerum"><span>VERDIXA</span><b>RADIANT<br/>FACE SERUM</b><small>Niacinamide · Hyaluronic Acid</small></div>
          <div className="heroStamp">SKINCARE<br/>INSPIRED BY<br/>NATURE <Leaf size={17}/></div>
        </div>
      </section>

      <section className="verdixaTrust">
        <div><Truck size={29}/><span><b>Free Shipping</b>on orders above ₹799</span></div>
        <div><WalletCards size={29}/><span><b>Cash on Delivery</b>available (₹50 COD charge)</span></div>
        <div><ShieldCheck size={30}/><span><b>Secure Payments</b>UPI, Cards, Netbanking</span></div>
        <div><PackageCheck size={29}/><span><b>7-Day Easy Returns</b>Hassle free</span></div>
      </section>

      <section id="collection" className="verdixaCollection">
        <div className="collectionHeading">
          <div><p className="verdixaEyebrow">OUR BESTSELLERS</p><h2>Customer Favorites</h2><p>Skincare essentials loved for their purity, effectiveness and real results.</p></div>
          <a href="/shop">View All Products <ArrowRight size={16}/></a>
        </div>
        <div className="verdixaProductGrid">
          {products.map((p) => (
            <article className="verdixaProductCard" key={p.name}>
              <div className={`productImage ${p.tone}`}>
                {p.badge && <span className={`productBadge ${p.tone === "cream" ? "pink" : ""}`}>{p.badge}</span>}
                <div className="miniProduct"><span>VERDIXA</span><b>{p.name}</b><small>{p.meta}</small></div>
              </div>
              <div className="productCardInfo">
                <div><h3>{p.name}</h3><p>{p.meta}</p><div className="stars">★★★★★ <small>{p.reviews}</small></div><strong>{p.price} <del>{p.compare}</del></strong></div>
                <button className="addCart"><ShoppingBag size={16}/> Add to Cart</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="ingredients" className="verdixaIngredients">
        <div className="ingredientPanel">
          <p className="verdixaEyebrow">PURE BOTANICALS</p>
          <h2>What nature grows,<br/><em>we refine.</em></h2>
          <p>Carefully selected botanicals, thoughtfully formulated for everyday skincare rituals.</p>
          <a href="#philosophy" className="textLink">Explore our ingredients <ArrowRight size={16}/></a>
        </div>
        <div className="ingredientTiles"><div><span>01</span><b>Neem</b><small>Purifying botanical</small></div><div><span>02</span><b>Tulsi</b><small>Calming plant extract</small></div><div><span>03</span><b>Green Tea</b><small>Antioxidant rich</small></div></div>
      </section>

      <section id="philosophy" className="verdixaPhilosophy">
        <p className="verdixaEyebrow">OUR PHILOSOPHY</p>
        <h2>Less noise.<br/><em>More nature.</em></h2>
        <p>We believe effective skincare can feel calm, honest and uncomplicated. Every Verdixa ritual is designed around purposeful ingredients, considered formulas and everyday consistency.</p>
      </section>

      <section className="verdixaRitual">
        <div><p className="verdixaEyebrow">YOUR DAILY RITUAL</p><h2>Cleanse.<br/>Nourish.<br/><em>Glow.</em></h2></div>
        <div className="ritualSteps"><div><span>01</span><b>Cleanse</b><p>Start fresh with a gentle botanical cleanse.</p></div><div><span>02</span><b>Nourish</b><p>Layer simple formulas that respect your skin.</p></div><div><span>03</span><b>Glow</b><p>Make consistency your most beautiful habit.</p></div></div>
      </section>

      <footer id="contact" className="verdixaFooter">
        <div><a href="/" className="verdixaLogo">VERDIXA</a><p>Nature meets modern skincare.</p></div>
        <div><p className="footerLabel">CONTACT</p><a href="tel:+919999999999">+91 99999 99999</a><a href="mailto:hello@verdixaa.com">hello@verdixaa.com</a></div>
        <div><p className="footerLabel">QUICK LINKS</p><a href="#collection">Shop</a><a href="#ingredients">Ingredients</a><a href="#philosophy">Our Philosophy</a></div>
      </footer>
    </main>
  );
}