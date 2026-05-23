import type { Metadata } from "next";
import { Inter, Syncopate, Orbitron } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/hooks/use-auth";
import { IntroWrapper } from "@/components/layout/IntroWrapper";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });
const syncopate = Syncopate({ weight: ["700"], subsets: ["latin"], variable: "--font-syncopate" });
const orbitron = Orbitron({ weight: ["500", "700", "900"], subsets: ["latin"], variable: "--font-orbitron" });

export const metadata: Metadata = {
  title: "CHANGAN Armenia - Официальный дилер",
  description: "CHANGAN - Будущее в Движении. Официальный дилер автомобилей CHANGAN в Армении.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${syncopate.variable} ${orbitron.variable} font-sans antialiased bg-white dark:bg-black text-black dark:text-white transition-colors duration-500`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          <AuthProvider>
            <IntroWrapper>
              {children}
            </IntroWrapper>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
