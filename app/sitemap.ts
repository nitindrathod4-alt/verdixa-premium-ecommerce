import type {MetadataRoute} from "next";
export default function sitemap():MetadataRoute.Sitemap{
 const base=process.env.NEXT_PUBLIC_SITE_URL||"https://verdixaa.com";
 return [{url:base,changeFrequency:"weekly",priority:1},{url:base+"/shop",changeFrequency:"weekly",priority:.9},{url:base+"/products/pure-moringa-powder",changeFrequency:"monthly",priority:.8},{url:base+"/products/hibiscus-herbal-infusion",changeFrequency:"monthly",priority:.8},{url:base+"/products/butterfly-pea-blue-tea",changeFrequency:"monthly",priority:.8}];
}