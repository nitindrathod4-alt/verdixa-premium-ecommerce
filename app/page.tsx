"use client";

import { ArrowRight, Leaf, ShoppingBag, Truck, ShieldCheck, PackageCheck } from "lucide-react";

const products = [
  {
    slug: "pure-moringa-powder",
    name: "Pure Moringa Powder",
    category: "MORINGA",
    unit: "100 G",
    price: "₹299",
    image: "/products/moringa.jpg",
    fallback: "MORINGA",
  },
  {
    slug: "hibiscus-herbal-infusion",
    name: "Hibiscus Herbal Infusion",
    category: "HIBISCUS",
    unit: "30 PYRAMID BAGS",
    price: "₹549",
    compare: "₹699",
    image: "/products/hibiscus-tea.jpg",
    fallback: "HIBISCUS",
  },
  {
    slug: "butterfly-pea-blue-tea",
    name: "Butterfly Pea Blue Tea",
    category: "BLUE TEA",
    unit: "30 PYRAMID BAGS",
    price: "₹579",
    compare: "₹799",
    image: "/products/blue-tea.jpg",
    fallback: "BUTTERFLY PEA",
  },
];

export default function Home() {
  return (
    <main className="botanicalHome">
      <div className="botanicalAnnouncement">
        Free shipping on orders above ₹799 <span>•</span> COD available <span>•</span> Botanical wellness, thoughtfully crafted
      </div>

      <nav className="botanicalNav">
        <a href="/" className="botanicalLogo">VERDIXA</a>
        <div className="botanicalNavLinks">
          <a href="#philosophy">Philosophy</a>
          <a href="#collection">Collection</a>
          <a href="#ingredients">Ingredients</a>
          <a href="#ritual">Ritual</a>
        </div>
        <a href="/shop" className="botanicalNavBag">
          <ShoppingBag size={17} />
          <span>Shop</span>
        </a>
      </nav>

      <section className="botanicalHero">
        <div className="botanicalHeroCopy">
          <p className="botanicalEyebrow">NATURE&apos;S GOODNESS, PURELY YOURS</p>
          <h1>Nourish<br /><em>Naturally,</em><br />Live Fully.</h1>
          <p className="botanicalLead">
            Botanical teas and wholefood wellness essentials, thoughtfully crafted for beautiful everyday rituals.
          </p>
          <a href="#collection" className="botanicalButton">
            Explore the range <ArrowRight size={16} />
          </a>
        </div>

        <div className="botanicalHeroVisual">
          <div className="heroOrb heroOrbGreen" />
          <div className="heroOrb heroOrbRed" />
          <div className="heroOrb heroOrbBlue" />
          <div className="heroLeafShape leafOne" />
          <div className="heroLeafShape leafTwo" />
          <div className="heroHeroLabel">
            <span>VERDIXA</span>
            <small>BOTANICAL<br />WELLNESS</small>
          </div>
          <div className="heroCircleStamp">PURE<br />BOTANICALS<br /><Leaf size={15} /></div>
        </div>
      </section>

      <section className="botanicalTrust">
        <div><Truck size={21} /><span><b>Free Shipping</b>above ₹799</span></div>
        <div><ShieldCheck size={21} /><span><b>Secure Payments</b>UPI · Cards · Netbanking</span></div>
        <div><PackageCheck size={21} /><span><b>Carefully Crafted</b>Botanical wellness</span></div>
        <div><Leaf size={21} /><span><b>Daily Rituals</b>Simple · intentional · natural</span></div>
      </section>

      <section id="philosophy" className="botanicalSection botanicalManifesto">
        <div className="botanicalSectionHead">
          <div>
            <p className="botanicalEyebrow">OUR PHILOSOPHY</p>
            <h2>Three promises kept in every <em>leaf and pour.</em></h2>
          </div>
          <p>Verdixa brings the quiet beauty of botanicals into simple, considered daily rituals.</p>
        </div>

        <div className="botanicalPromises">
          <article><span>01</span><h3>Pure Botanicals</h3><p>Thoughtfully selected plant ingredients with a clean, uncomplicated approach.</p></article>
          <article><span>02</span><h3>Considered Craft</h3><p>Every product is designed to feel as beautiful in your ritual as it is on your shelf.</p></article>
          <article><span>03</span><h3>Everyday Wellness</h3><p>Simple products made to become part of the moments you return to every day.</p></article>
        </div>
      </section>

      <div className="botanicalMarquee" aria-hidden="true">
        <span>BOTANICAL</span><i>✦</i><span>NATURAL</span><i>✦</i><span>MINDFUL</span><i>✦</i><span>EVERYDAY RITUAL</span><i>✦</i><span>BOTANICAL</span><i>✦</i>
      </div>

      <section id="collection" className="botanicalSection botanicalCollection">
        <div className="botanicalSectionHead">
          <div>
            <p className="botanicalEyebrow">THE COLLECTION</p>
            <h2>Small-batch botanicals, treated like <em>treasure.</em></h2>
          </div>
          <a href="/shop" className="botanicalTextLink">View all products <ArrowRight size={15} /></a>
        </div>

        <div className="botanicalProducts">
          {products.map((product, index) => (
            <article className="botanicalProductCard" key={product.slug}>
              <a href={`/products/${product.slug}`} className={`botanicalProductImage productTone${index + 1}`}>
                <span className="productIndex">0{index + 1}</span>
                <img src={product.image} alt={product.name} onError={(e) => { e.currentTarget.style.display = "none"; }} />
                <div className="productFallback"><span>VERDIXA</span><b>{product.fallback}</b><small>{product.unit}</small></div>
                <div className="productPill">{product.category}</div>
              </a>
              <div className="botanicalProductInfo">
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.unit}</p>
                </div>
                <div className="botanicalPrice">
                  {product.compare && <del>{product.compare}</del>}
                  <strong>{product.price}</strong>
                </div>
              </div>
              <a href={`/products/${product.slug}`} className="botanicalAddLink">
                Discover product <ArrowRight size={14} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="ingredients" className="botanicalIngredientStory">
        <div className="ingredientArt">
          <div className="ingredientGlow" />
          <div className="ingredientLeaf">VERDIXA</div>
          <span>01 — 03</span>
        </div>
        <div className="ingredientCopy">
          <p className="botanicalEyebrow">THE BOTANICAL STORY</p>
          <h2>What nature grows,<br /><em>we thoughtfully refine.</em></h2>
          <p>From vibrant hibiscus to butterfly pea and nutrient-rich moringa, our collection celebrates distinctive botanicals and the rituals built around them.</p>
          <div className="ingredientList">
            <div><span>01</span><b>Moringa</b><small>Wholefood botanical</small></div>
            <div><span>02</span><b>Hibiscus</b><small>Floral herbal infusion</small></div>
            <div><span>03</span><b>Butterfly Pea</b><small>Natural blue botanical tea</small></div>
          </div>
        </div>
      </section>

      <section id="ritual" className="botanicalRitual">
        <div>
          <p className="botanicalEyebrow">YOUR DAILY RITUAL</p>
          <h2>Pour.<br />Pause.<br /><em>Reconnect.</em></h2>
        </div>
        <div className="ritualSteps">
          <div><span>01</span><div><b>Choose</b><p>Pick the botanical that suits the moment.</p></div></div>
          <div><span>02</span><div><b>Prepare</b><p>Slow down and make space for the ritual.</p></div></div>
          <div><span>03</span><div><b>Enjoy</b><p>Let a simple daily ritual become something to look forward to.</p></div></div>
        </div>
      </section>

      <section className="botanicalEthos">
        <p>Less noise.<br /><em>More nature.</em></p>
        <small>VERDIXA — BOTANICAL WELLNESS, SIMPLY CONSIDERED</small>
      </section>

      <footer className="botanicalFooter">
        <div>
          <a href="/" className="botanicalLogo">VERDIXA</a>
          <p>Botanical teas and wholefood wellness essentials for everyday rituals.</p>
        </div>
        <div>
          <span>EXPLORE</span>
          <a href="/shop">Shop</a>
          <a href="#philosophy">Philosophy</a>
          <a href="#ingredients">Ingredients</a>
        </div>
        <div>
          <span>CONTACT</span>
          <a href="mailto:hello@verdixaa.com">hello@verdixaa.com</a>
          <a href="/shop">Start your ritual →</a>
        </div>
      </footer>
    </main>
  );
}
