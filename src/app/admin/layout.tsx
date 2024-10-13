"use client"
import { Nav, NavLink } from "@/components/Nav";
export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <Nav>
        <NavLink href="/admin">Home</NavLink>
        <NavLink href="/admin/produtos">Produtos</NavLink>
        <NavLink href="/admin/clientes">Clientes</NavLink>
        <NavLink href="/admin/pedidos">Pedidos</NavLink>
        
    </Nav>
    <div className="container my-6">
    {children}
    </div>
    </>
  );
}