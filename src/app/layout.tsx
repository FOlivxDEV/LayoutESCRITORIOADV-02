import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CookieBanner } from "@/components/ui/cookie-banner";

const serif = Cormorant_Garamond({ subsets:["latin"], variable:"--font-serif", weight:["500","600","700"], display:"swap" });
const sans = Inter({ subsets:["latin"], variable:"--font-sans", display:"swap" });
export const metadata: Metadata = { metadataBase:new URL(siteConfig.url), title:{default:siteConfig.name,template:`%s | ${siteConfig.shortName}`}, description:siteConfig.description, openGraph:{type:"website",locale:"pt_BR",siteName:siteConfig.name,title:siteConfig.name,description:siteConfig.description,images:[{url:"/og.png",width:1200,height:630,alt:siteConfig.name}]}, twitter:{card:"summary_large_image",images:["/og.png"]} };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="pt-BR" className={`${serif.variable} ${sans.variable}`}><body><a className="skip" href="#conteudo">Pular para o conteúdo</a><Header/><main id="conteudo">{children}</main><Footer/><CookieBanner/></body></html>; }
