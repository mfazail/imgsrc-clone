import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/global/Navbar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AppStateProvider } from "@/components/providers/StateProvider";
import Footer from "@/components/global/Footer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Imgsrc.io clone",
	description: "Project 3 - Imgsrc.io clone",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange>
					<Navbar />
					<AppStateProvider>{children}</AppStateProvider>
					<Footer />
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
