import type {Metadata} from "next";
import "./globals.css";
import "./checkout/checkout.css";
import "./admin/admin.css";
import "./home.css";
import Analytics from "@/components/Analytics";
import WhatsAppButton from "@/components/WhatsAppButton";
export const metadata:Metadata={title:"Verdixa — Nature’s Wellness, Made a Daily Ritual",description:"Premium botanical wellness products by Verdixa.",metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||"https://verdixaa.com"),openGraph:{title:"Verdixa — Nature’s Wellness, Made a Daily Ritual",description:"Premium botanical wellness products by Verdixa.",type:"website"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@300;400;500;600;700&display=swap" rel="stylesheet"/><script src="https://checkout.razorpay.com/v1/checkout.js" async/></head><body><Analytics/>{children}<WhatsAppButton/></body></html>}