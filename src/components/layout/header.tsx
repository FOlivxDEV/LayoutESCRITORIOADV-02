"use client";
import Link from "next/link";
import { Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { whatsappUrl } from "@/config/site";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { BrandLogo } from "@/components/ui/brand-logo";

const links = [["Início", "/#inicio"], ["O Escritório", "/#escritorio"], ["Áreas de Atuação", "/#areas"], ["Equipe", "/#equipe"], ["Conteúdos", "/#conteudos"], ["Contato", "/#contato"]];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => {
      const hero = document.getElementById("inicio");
      setScrolled(!hero || scrollY > 8);
    };
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    return () => { removeEventListener("scroll", update); removeEventListener("resize", update); };
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false); addEventListener("keydown", close); return () => { removeEventListener("keydown", close); document.body.style.overflow = ""; }; }, [open]);
  return <header className={`fixed inset-x-0 top-0 z-50 transition ${scrolled ? "is-scrolled" : ""}`}>
    <div className="container relative z-10 flex h-20 items-center justify-between">
      <Link href="/" aria-label="Página inicial"><BrandLogo inverted={!scrolled} /></Link>
      <nav className="hidden items-center gap-5 lg:flex" aria-label="Principal">
        {links.map(([name, href]) => <Link className="text-sm font-semibold hover:text-[#b69a63]" key={href} href={href}>{name}</Link>)}
        <a className="btn" href={whatsappUrl()} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} />Fale pelo WhatsApp</a>
        <LanguageSwitcher />
      </nav>
      <button className="p-3 lg:hidden" aria-expanded={open} aria-controls="menu-mobile" aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
    {open && <nav id="menu-mobile" className="relative z-10 border-t p-5 lg:hidden" aria-label="Menu móvel">{links.map(([name, href]) => <Link className="block border-b py-4 font-semibold" key={href} href={href} onClick={() => setOpen(false)}>{name}</Link>)}<LanguageSwitcher /><a className="btn mt-5 w-full" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">Fale pelo WhatsApp</a></nav>}
  </header>;
}
