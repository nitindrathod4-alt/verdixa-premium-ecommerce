"use client";

import { useEffect } from "react";

const HOME_HTML = `
<div class="vd-shell">
  <div class="vd-topline"><span>BOTANICAL GOODS, MADE FOR EVERYDAY</span><span>FREE SHIPPING ON ORDERS ₹799+</span></div>
  <header class="vd-header" id="nav">
    <a class="vd-logo" href="#top" aria-label="Verdixa home">verdixa<span>®</span></a>
    <nav class="vd-nav"><a href="#shop">Shop all</a><a href="#approach">Our approach</a><a href="#journal">The journal</a></nav>
    <div class="vd-head-actions"><a class="vd-shop-link" href="/shop">Explore shop <span>↗</span></a><button class="vd-cart" onclick="cart.openDrawer()" aria-label="Open cart">Bag <span id="cartCount" class="cart-count" style="display:none">0</span> ↗</button></div>
  </header>
  <main id="top">
    <section class="vd-hero">
      <div class="vd-hero-copy"><p class="vd-kicker"><i></i> A LITTLE MORE NATURE, EVERY DAY</p><h1>Good things<br/>grow <em>slowly.</em></h1><p class="vd-intro">Thoughtful botanicals for small daily rituals. Meet your new favourite way to pause, reset and feel a little more like you.</p><div class="vd-hero-actions"><a href="#shop" class="vd-button vd-button-dark">Find your ritual <span>↗</span></a><span class="vd-caption">PLANTS FIRST. ALWAYS.</span></div><div class="vd-proof"><span>01 / PLANT-LED</span><span>02 / EASY RITUALS</span><span>03 / MADE TO ENJOY</span></div></div>
      <div class="vd-hero-art"><div class="vd-art-orbit orbit-one"></div><div class="vd-art-orbit orbit-two"></div><div class="vd-art-label">THE DAILY<br/>BOTANICAL CLUB</div><div class="vd-sun"></div><div class="vd-art-photo photo-main"><img src="/products/hibiscus-tea.jpg" alt="Hibiscus herbal infusion"/><span>HIBISCUS / 01</span></div><div class="vd-art-photo photo-small"><img src="/products/blue-tea.jpg" alt="Butterfly pea blue tea"/><span>BLUE TEA / 02</span></div><div class="vd-art-sticker">GROW<br/>YOUR<br/><b>GOOD</b></div><div class="vd-art-foot">NATURE, WITHOUT THE NOISE.</div></div>
    </section>
    <div class="vd-ticker" aria-label="Verdixa values"><div>LESS NOISE <b>✳</b> MORE NATURE <b>✳</b> TAKE YOUR TIME <b>✳</b> SIP SOMETHING GOOD <b>✳</b> LESS NOISE <b>✳</b> MORE NATURE <b>✳</b> TAKE YOUR TIME <b>✳</b></div></div>
    <section class="vd-products" id="shop"><div class="vd-section-head"><div><p class="vd-kicker"><i></i> THE VERDIXA EDIT</p><h2>Meet your new<br/><em>daily favourites.</em></h2></div><p>Three simple ways to bring a little botanical goodness into your everyday. Pick a starting point.</p><a class="vd-text-link" href="/shop">VIEW ALL PRODUCTS ↗</a></div>
      <div class="vd-product-grid" id="productGrid">
        <article class="vd-product"><a class="vd-product-image image-green" href="/products/pure-moringa-powder"><span class="vd-number">01 / POWDER</span><img src="https://images.unsplash.com/photo-1565802700474-1c8b57596859?auto=format&fit=crop&w=900&q=85" alt="Pure Moringa Powder"/><span class="vd-image-cta">DISCOVER ↗</span></a><div class="vd-product-meta"><span>THE EVERYDAY GREEN</span><span>100 G</span></div><div class="vd-product-title"><h3>Pure Moringa Powder</h3><span>₹299</span></div><p>Green goodness for your everyday routine.</p><div class="vd-product-buttons"><button class="vd-add home-add" data-slug="pure-moringa-powder">Add to bag <span>+</span></button><button class="vd-buy home-buy" data-slug="pure-moringa-powder" aria-label="Buy Pure Moringa Powder">↗</button></div></article>
        <article class="vd-product"><a class="vd-product-image image-pink" href="/products/hibiscus-herbal-infusion"><span class="vd-number">02 / INFUSION</span><img src="/products/hibiscus-tea.jpg" alt="Hibiscus Herbal Infusion"/><span class="vd-discount">SAVE 21%</span><span class="vd-image-cta">DISCOVER ↗</span></a><div class="vd-product-meta"><span>THE SLOW DOWN</span><span>30 PYRAMID BAGS</span></div><div class="vd-product-title"><h3>Hibiscus Herbal Infusion</h3><span><del>₹699</del> ₹549</span></div><p>A bright, floral cup made for a slower moment.</p><div class="vd-product-buttons"><button class="vd-add home-add" data-slug="hibiscus-herbal-infusion">Add to bag <span>+</span></button><button class="vd-buy home-buy" data-slug="hibiscus-herbal-infusion" aria-label="Buy Hibiscus Herbal Infusion">↗</button></div></article>
        <article class="vd-product"><a class="vd-product-image image-blue" href="/products/butterfly-pea-blue-tea"><span class="vd-number">03 / TEA</span><img src="/products/blue-tea.jpg" alt="Butterfly Pea Blue Tea"/><span class="vd-discount">SAVE 28%</span><span class="vd-image-cta">DISCOVER ↗</span></a><div class="vd-product-meta"><span>THE BLUE HOUR</span><span>30 PYRAMID BAGS</span></div><div class="vd-product-title"><h3>Butterfly Pea Blue Tea</h3><span><del>₹799</del> ₹579</span></div><p>A naturally vivid brew for your pause in the day.</p><div class="vd-product-buttons"><button class="vd-add home-add" data-slug="butterfly-pea-blue-tea">Add to bag <span>+</span></button><button class="vd-buy home-buy" data-slug="butterfly-pea-blue-tea" aria-label="Buy Butterfly Pea Blue Tea">↗</button></div></article>
      </div>
    </section>
    <section class="vd-manifesto" id="approach"><div class="vd-manifesto-mark">V.</div><div class="vd-manifesto-copy"><p class="vd-kicker"><i></i> OUR POINT OF VIEW</p><h2>Wellness isn't<br/>another <em>to-do.</em></h2><p>It can be a cup before the day begins. A breath between the busy bits. A tiny habit that belongs only to you. We make plant-led products to help those moments feel worth keeping.</p><a href="/shop" class="vd-button vd-button-light">Make room for a ritual <span>↗</span></a></div><div class="vd-manifesto-side"><span>SMALL MOMENTS.</span><span>GOOD PLANTS.</span><span>YOUR OWN PACE.</span><div class="vd-leaf">✳</div></div></section>
    <section class="vd-ritual" id="journal"><div class="vd-ritual-image"><img src="/products/hibiscus-tea.jpg" alt="A closer look at botanical tea"/><span class="vd-vertical">A MOMENT, JUST FOR YOU</span></div><div class="vd-ritual-copy"><p class="vd-kicker"><i></i> A NOTE FROM VERDIXA</p><h2>Make a little<br/>space for <em>you.</em></h2><p>No perfect morning routine required. Choose a blend you love, make it your way, and take the moment as it comes.</p><a href="#shop" class="vd-text-link">START WITH A CUP ↗</a><div class="vd-quote">“The best rituals are the ones you look forward to.”</div></div></section>
  </main>
  <footer class="vd-footer"><div class="vd-footer-main"><a class="vd-logo vd-logo-footer" href="#top">verdixa<span>®</span></a><div><p class="vd-kicker">KEEP IN TOUCH</p><a href="mailto:verdixaa5@gmail.com">verdixaa5@gmail.com ↗</a><a href="tel:9637665533">9637665533</a></div><div><p class="vd-kicker">EXPLORE</p><a href="#shop">Shop products</a><a href="#approach">Our approach</a><a href="#journal">The journal</a></div><div class="vd-footer-note">A little more nature.<br/><em>A little more you.</em></div></div><div class="vd-footer-bottom"><span>© 2026 VERDIXA</span><span>BOTANICAL GOODS FOR EVERYDAY LIVING</span><a href="#top">BACK TO TOP ↑</a></div></footer>
</div>`;

export default function Home() {
  useEffect(() => {
    const nav = document.getElementById("nav");
    const onScroll = () => nav?.classList.toggle("vd-scrolled", window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
    const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("vd-in"); io.unobserve(e.target); } }), { threshold: .12 });
    document.querySelectorAll(".vd-product,.vd-section-head,.vd-manifesto-copy,.vd-ritual-copy").forEach(el => io.observe(el));
    document.querySelectorAll(".home-add").forEach(button => button.addEventListener("click", () => {
      const slug = (button as HTMLElement).dataset.slug; if (!slug) return;
      try { const cart = JSON.parse(localStorage.getItem("verdixa_cart") || "{}"); cart[slug] = (cart[slug] || 0) + 1; localStorage.setItem("verdixa_cart", JSON.stringify(cart)); window.location.href = "/shop"; } catch {}
    }));
    document.querySelectorAll(".home-buy").forEach(button => button.addEventListener("click", () => {
      const slug = (button as HTMLElement).dataset.slug; if (!slug) return;
      try { localStorage.setItem("verdixa_cart", JSON.stringify({ [slug]: 1 })); window.location.href = "/checkout"; } catch {}
    }));
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);
  return <div className="verdixaHome" dangerouslySetInnerHTML={{ __html: HOME_HTML }} />;
}
