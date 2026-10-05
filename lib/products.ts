export type Product={id:string;slug:string;name:string;price:number;compareAtPrice?:number;unit:string;description:string;category:string;inventory:number;active:boolean};
export const products:Product[]=[
{id:"moringa",slug:"pure-moringa-powder",name:"Pure Moringa Powder",price:299,unit:"100 G",description:"Pure botanical moringa powder for a simple daily wellness ritual.",category:"Powders",inventory:50,active:true},
{id:"hibiscus",slug:"hibiscus-herbal-infusion",name:"Hibiscus Herbal Infusion",price:549,compareAtPrice:699,unit:"30 PYRAMID BAGS",description:"A floral herbal infusion crafted for a slow, considered pause.",category:"Infusions",inventory:40,active:true},
{id:"blue-tea",slug:"butterfly-pea-blue-tea",name:"Butterfly Pea Blue Tea",price:579,compareAtPrice:799,unit:"30 PYRAMID BAGS",description:"A delicate botanical tea for beautiful everyday rituals.",category:"Tea",inventory:35,active:true}
];