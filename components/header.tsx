"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Menu, X } from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";

const navItems = [
	{ name: "Trang Chủ", path: "/" },
	{ name: "Timeline", path: "/timeline" },
	{ name: "Thư Viện", path: "/gallery" },
	{ name: "Lưu Bút", path: "/memory-board" },
	{ name: "Về Chúng Mình", path: "/about" },
	{ name: "Lễ Kỷ Niệm", path: "/celebration" },
];

export default function Header() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();
	const isMobile = useMobile();

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			className={`sticky top-0 z-40 w-full transition-all duration-200 ${
				isScrolled
					? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm"
					: "bg-transparent"
			}`}
		>
			<div className="container mx-auto px-4">
				<div className="flex h-16 items-center justify-between">
					<Link
						href="/"
						className="text-xl font-bold text-blue-800 dark:text-blue-300"
					>
						Lớp 8A3
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center space-x-6">
						{navItems.map((item) => (
							<Link
								key={item.path}
								href={item.path}
								className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
									pathname === item.path
										? "text-blue-600 dark:text-blue-400"
										: "text-slate-700 dark:text-slate-300"
								}`}
							>
								{item.name}
							</Link>
						))}
						<ModeToggle />
					</nav>

					{/* Mobile Navigation Toggle */}
					<div className="flex items-center md:hidden space-x-4">
						<ModeToggle />
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							aria-label="Toggle Menu"
						>
							{isMenuOpen ? (
								<X className="h-6 w-6" />
							) : (
								<Menu className="h-6 w-6" />
							)}
						</Button>
					</div>
				</div>
			</div>

			{/* Mobile Navigation Menu */}
			{isMenuOpen && isMobile && (
				<div className="md:hidden">
					<nav className="flex flex-col space-y-4 p-4 bg-white dark:bg-slate-900 border-t dark:border-slate-700">
						{navItems.map((item) => (
							<Link
								key={item.path}
								href={item.path}
								className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
									pathname === item.path
										? "text-blue-600 dark:text-blue-400"
										: "text-slate-700 dark:text-slate-300"
								}`}
								onClick={() => setIsMenuOpen(false)}
							>
								{item.name}
							</Link>
						))}
					</nav>
				</div>
			)}
		</header>
	);
}
