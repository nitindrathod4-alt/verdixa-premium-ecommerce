"use client";

import { useEffect } from "react";

const HOME_HTML = `
<div class="vd-shell">
  <header class="vd-header" id="nav">
    <a class="vd-logo" href="#top" aria-label="Verdixa home"><span class="vd-emblem">V</span><span class="vd-wordmark">VERDIXA</span></a>
    <nav class="vd-nav"><a class="active" href="#top">Home</a><a href="#shop">Shop</a><a href="#story">Our Story</a><a href="#benefits">Benefits</a><a href="#contact">Contact</a></nav>
    <div class="vd-head-actions"><a class="vd-search" href="/shop" aria-label="Search">⌕</a><a class="vd-user" href="/shop" aria-label="Account">♙</a><button class="vd-cart" onclick="cart.openDrawer()" aria-label="Open cart">♧ <span id="cartCount" class="cart-count" style="display:none">0</span></button></div>
  </header>
  <main id="top">
    <section class="vd-hero">
      <div class="vd-hero-backdrop"></div>
      <div class="vd-hero-copy"><p class="vd-kicker">NATURE IN EVERY CUP <span></span></p><h1>Herbal Rituals<br/><em>for a Better You.</em></h1><p class="vd-intro">Thoughtful botanical teas for your everyday wellness ritual. Naturally beautiful, full of character, and made for the moments that matter.</p>
        <div class="vd-values"><div><span class="vd-value-icon">♧</span><b>Plant based</b><small>Thoughtful botanicals</small></div><div><span class="vd-value-icon">♨</span><b>Caffeine free</b><small>A gentler daily ritual</small></div><div><span class="vd-value-icon">✳</span><b>Pure ingredients</b><small>Nature takes the lead</small></div><div><span class="vd-value-icon">♡</span><b>Feel-good moments</b><small>Made to be savoured</small></div></div>
        <div class="vd-hero-actions"><a href="#shop" class="vd-button">Shop herbal teas <span>→</span></a><a href="#story" class="vd-story-link"><span class="vd-play">▷</span> Our story</a></div>
      </div>
      <div class="vd-product-scene" aria-label="Verdixa herbal tea collection"><div class="vd-scene-glow"></div><div class="vd-botanical botanical-one">✿</div><div class="vd-botanical botanical-two">✿</div><div class="vd-pouch pouch-hibiscus"><img src="/products/hibiscus-tea.jpg" alt="Verdixa Hibiscus Tea package"/><span>HIBISCUS / BOTANICAL INFUSION</span></div><div class="vd-pouch pouch-blue"><img src="/products/blue-tea.jpg" alt="Verdixa Butterfly Pea Blue Tea package"/><span>BUTTERFLY PEA / BLUE TEA</span></div><div class="vd-tea-glass"><span>✿</span></div><div class="vd-scene-caption">A LITTLE NATURE, EVERY DAY</div></div>
    </section>
    <section class="vd-benefits" id="benefits"><div class="vd-benefit"><span>♧</span><div><b>Pure &amp; Natural</b><small>Simple botanical goodness</small></div></div><div class="vd-benefit"><span>✧</span><div><b>Thoughtfully Made</b><small>Quality in every detail</small></div></div><div class="vd-benefit"><span>♨</span><div><b>Your Daily Ritual</b><small>A pause worth keeping</small></div></div><div class="vd-benefit"><span>♻</span><div><b>Mindful Choices</b><small>Small steps, more care</small></div></div></section>
    <section class="vd-products" id="shop"><div class="vd-section-head"><div><p class="vd-kicker">THE VERDIXA COLLECTION <span></span></p><h2>Find your everyday<br/><em>favourite.</em></h2></div><p>Meet the botanicals that make it easy to create a small moment of your own, one cup at a time.</p><a class="vd-text-link" href="/shop">EXPLORE ALL PRODUCTS ↗</a></div>
      <div class="vd-product-grid" id="productGrid">
        <article class="vd-product"><a class="vd-product-image image-green" href="/products/pure-moringa-powder"><span class="vd-number">01 / POWDER</span><img src="https://images.unsplash.com/photo-1565802700474-1c8b57596859?auto=format&fit=crop&w=900&q=85" alt="Pure Moringa Powder"/><span class="vd-image-cta">DISCOVER ↗</span></a><div class="vd-product-meta"><span>THE EVERYDAY GREEN</span><span>100 G</span></div><div class="vd-product-title"><h3>Pure Moringa Powder</h3><span>₹299</span></div><p>Green goodness for your everyday routine.</p><div class="vd-product-buttons"><button class="vd-add home-add" data-slug="pure-moringa-powder">Add to bag <span>+</span></button><button class="vd-buy home-buy" data-slug="pure-moringa-powder" aria-label="Buy Pure Moringa Powder">↗</button></div></article>
        <article class="vd-product"><a class="vd-product-image image-pink" href="/products/hibiscus-herbal-infusion"><span class="vd-number">02 / INFUSION</span><img src="/products/hibiscus-tea.jpg" alt="Hibiscus Herbal Infusion"/><span class="vd-discount">SAVE 21%</span><span class="vd-image-cta">DISCOVER ↗</span></a><div class="vd-product-meta"><span>THE SLOW DOWN</span><span>30 PYRAMID BAGS</span></div><div class="vd-product-title"><h3>Hibiscus Herbal Infusion</h3><span><del>₹699</del> ₹549</span></div><p>A bright, floral cup made for a slower moment.</p><div class="vd-product-buttons"><button class="vd-add home-add" data-slug="hibiscus-herbal-infusion">Add to bag <span>+</span></button><button class="vd-buy home-buy" data-slug="hibiscus-herbal-infusion" aria-label="Buy Hibiscus Herbal Infusion">↗</button></div></article>
        <article class="vd-product"><a class="vd-product-image image-blue" href="/products/butterfly-pea-blue-tea"><span class="vd-number">03 / TEA</span><img src="/products/blue-tea.jpg" alt="Butterfly Pea Blue Tea"/><span class="vd-discount">SAVE 28%</span><span class="vd-image-cta">DISCOVER ↗</span></a><div class="vd-product-meta"><span>THE BLUE HOUR</span><span>30 PYRAMID BAGS</span></div><div class="vd-product-title"><h3>Butterfly Pea Blue Tea</h3><span><del>₹799</del> ₹579</span></div><p>A naturally vivid brew for your pause in the day.</p><div class="vd-product-buttons"><button class="vd-add home-add" data-slug="butterfly-pea-blue-tea">Add to bag <span>+</span></button><button class="vd-buy home-buy" data-slug="butterfly-pea-blue-tea" aria-label="Buy Butterfly Pea Blue Tea">↗</button></div></article>
      </div>
    </section>
    <section class="vd-story" id="story"><div class="vd-story-photo"><img src="/products/hibiscus-tea.jpg" alt="Verdixa hibiscus tea packaging"/><span>THE ART OF TAKING A PAUSE</span></div><div class="vd-story-copy"><p class="vd-kicker">A NOTE FROM VERDIXA <span></span></p><h2>Make room for<br/><em>your moment.</em></h2><p>No perfect routine required. Choose a blend you love, prepare it your way, and take a moment to simply enjoy it. Good rituals don't need to be complicated.</p><a href="#shop" class="vd-text-link">START WITH A CUP ↗</a><blockquote>“A little pause can change the shape of a day.”</blockquote></div></section>
  </main>
  <footer class="vd-footer" id="contact"><div class="vd-footer-main"><a class="vd-logo vd-logo-footer" href="#top"><span class="vd-emblem">V</span><span class="vd-wordmark">VERDIXA</span></a><div><p class="vd-footer-label">SAY HELLO</p><a href="mailto:verdixaa5@gmail.com">verdixaa5@gmail.com ↗</a><a href="tel:9637665533">9637665533</a></div><div><p class="vd-footer-label">DISCOVER</p><a href="#shop">Shop the collection</a><a href="#story">Our story</a><a href="#benefits">Our values</a></div><div class="vd-footer-note">Nature in every cup.<br/><em>Goodness in every day.</em></div></div><div class="vd-footer-bottom"><span>© 2026 VERDIXA</span><span>BOTANICAL TEAS FOR EVERYDAY RITUALS</span><a href="#top">BACK TO TOP ↑</a></div></footer>
</div>
`;

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
