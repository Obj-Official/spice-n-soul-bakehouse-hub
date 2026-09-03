import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spice and Soul Bake House Hub ",
  description: "Spice and Soul Bake House Hub - Delicious confectionery and baked goods",
  keywords: "Cakes, Pastries, Donuts, Juices, Smoothies, Fruit Juice, Iced Donuts, Cake Slices, Cupcakes, Sausage Pies, Spice and Soul Bake House Hub, Confectionery, Baked Goods, Dessert, Bakery, Sweet Treats, Gourmet Pastries, Freshly Baked, Artisan Cakes, Custom Cakes, Specialty Desserts, Confetionaries, Confetionaries in Lagos, Bakers in Lagos",
  openGraph:{
    title: 'Spice and Soul Bake House Hub ',
    description: 'Spice and Soul Bake House Hub - Delicious confectionery and baked goods',
    images: ['/spice-and-soul-logo-round.png'],
  },
  icons: {
    icon: '/cake_icon.jpg',
    apple: [
      {url: '/spice-and-soul-logo-round.png'}
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
