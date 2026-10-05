import ShopClient from "./ShopClient";
export const metadata = { title: "Shop | Verdixa", description: "Shop Verdixa botanical wellness rituals." };
export default function ShopPage(){ return <main><div className="shopHero"><p className="eyebrow">THE VERDIXA COLLECTION</p><h1>Choose your<br/><em>daily ritual.</em></h1></div><ShopClient/></main>;}