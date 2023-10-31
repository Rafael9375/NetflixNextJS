import NextAuthSessionProvider from "@/providers/sessionProvider"
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import UserSession from "./components/userSession";
import './globals.css'
import  tt from '../public/images/loginForm/bgImage.jpg'


export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`bg-black h-full `}>
        <NextAuthSessionProvider>
          {children}
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}