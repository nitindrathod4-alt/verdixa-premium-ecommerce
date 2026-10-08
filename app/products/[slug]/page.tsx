import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {products} from "@/lib/products";

export function generateStaticParams(){return products.map(p=>({slug:p.slug}));}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const p=products.find(x=>x.slug===slug);
  if(!p)return {title:"Product | Verdixa"};
  return {
    title:`${p.name} | Verdixa`,
    description:p.description,
    openGraph:{title:`${p.name} | Verdixa`,description:p.description,type:"website"},
  };
}

export default async function ProductPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const p=products.find(x=>x.slug===slug);
  if(!p)notFound();

  return (
    <main className="productPage">
      <div className="productVisual">
        {p.imageUrl ? (
          <Image
            src={p.imageUrl}
            alt={p.name}
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
            style={{objectFit:"cover"}}
            unoptimized={p.imageUrl.startsWith("http")}
          />
        ) : null}
        <span>{p.category}</span>
      </div>
      <section className="productInfo">
        <p className="eyebrow">{p.unit}</p>
        <h1>{p.name}</h1>
        <div className="productPrice">
          {p.compareAtPrice&&<del>₹{p.compareAtPrice}</del>} ₹{p.price}
        </div>
        <p className="productDescription">{p.description}</p>
        <div className="productActions">
          <Link className="primary" href="/shop">Add to bag</Link>
          <Link href="/checkout">Buy now →</Link>
        </div>
        <div className="productAccordions">
          <details open><summary>Ingredients</summary><p>Botanical ingredients selected for a considered everyday wellness ritual.</p></details>
          <details><summary>Nutrition</summary><p>See the product packaging for the complete nutrition and ingredient information.</p></details>
          <details><summary>How to use</summary><p>Follow the serving guidance supplied with your Verdixa product and make it part of your daily routine.</p></details>
          <details><summary>Storage</summary><p>Store sealed in a cool, dry place away from direct sunlight.</p></details>
          <details><summary>FAQ & Returns</summary><p>Contact Verdixa support for product questions and return eligibility.</p></details>
        </div>
      </section>
    </main>
  );
}
