import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { ToastProvider } from "@/components/toast-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Một Năm Lớp Tám",
	description: "Kỷ yếu lớp 8 - Những kỷ niệm đáng nhớ",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="vi" suppressHydrationWarning>
			<body className={inter.className}>
				<ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
					<ToastProvider>
						<div className="min-h-screen flex flex-col">
							<Header />
							<main className="flex-grow">{children}</main>
							<Footer />
						</div>
					</ToastProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
