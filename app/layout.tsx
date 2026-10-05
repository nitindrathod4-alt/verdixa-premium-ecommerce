import type {Metadata} from "next";
import "./globals.css";
import "./checkout/checkout.css";
import "./admin/admin.css";
import Analytics from "@/components/Analytics";
import WhatsAppButton from "@/components/WhatsAppButton";
export const metadata:Metadata={title:"Verdixa — Nature’s Wellness, Made a Daily Ritual",description:"Premium botanical wellness products by Verdixa.",metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||"https://verdixaa.com"),openGraph:{title:"Verdixa — Nature’s Wellness, Made a Daily Ritual",description:"Premium botanical wellness products by Verdixa.",type:"website"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Analytics/>{children}<WhatsAppButton/></body></html>}