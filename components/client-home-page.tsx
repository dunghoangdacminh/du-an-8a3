"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import Fireworks from "@/components/fireworks";
const photos = [
	{
		id: 1,
		src: "https://files.catbox.moe/0a7wcc.jpg?height=600&width=800&text=Thể+Thao",
		alt: "Hoạt động thể thao",
		category: "outdoor",
	},
	{
		id: 2,
		src: "https://files.catbox.moe/jki3q0.jpg?height=600&width=800&text=Video+8+thg+3",
		alt: "Tổ chức ngày 8/3",
		category: "school-events",
	},
	{
		id: 3,
		src: "https://files.catbox.moe/qdgx21.jpg?height=600&width=800&text=Tết",
		alt: "Vui chơi hội xuân",
		category: "celebrations",
	},
	{
		id: 4,
		src: "https://files.catbox.moe/7e9jlo.jpg?height=600&width=800&text=Dã+Ngoại",
		alt: "Dã ngoại lớp",
		category: "outdoor",
	},
];
// Định nghĩa kiểu dữ liệu
interface Memory {
	_id?: string;
	id?: number;
	name: string;
	message: string;
	avatar: string;
	date: string;
}

interface TimelineEvent {
	month: string;
	title: string;
	description: string;
	image: string;
}

interface ClientHomePageProps {
	latestMemories: Memory[];
	featuredEvents: TimelineEvent[];
}

export default function ClientHomePage({
	latestMemories = [],
	featuredEvents = [],
}: ClientHomePageProps) {
	const timelineRef = useRef<HTMLDivElement>(null);

	const scrollToTimeline = () => {
		timelineRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<div className="flex flex-col items-center">
			<Fireworks autoPlay={true} />
			{/* Hero Section */}
			<section className="w-full min-h-[90vh] flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="absolute inset-0 pointer-events-none"
				>
					{/* Falling flowers animation */}
					{Array.from({ length: 20 }).map((_, i) => (
						<motion.div
							key={i}
							className="absolute w-4 h-4 bg-red-200 rounded-full opacity-70"
							initial={{
								x: Math.random() * 100 + "%",
								y: -20,
								rotate: 0,
							}}
							animate={{
								y: "120vh",
								rotate: 360,
								x: `calc(${Math.random() * 100}% + ${Math.random() * 100 - 50}px)`,
							}}
							transition={{
								duration: Math.random() * 10 + 15,
								repeat: Number.POSITIVE_INFINITY,
								ease: "linear",
								delay: Math.random() * 10,
							}}
						/>
					))}
				</motion.div>

				<div className="container px-4 z-10 text-center">
					<motion.h1
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="text-4xl md:text-6xl font-bold mb-6 text-blue-800 dark:text-blue-300"
					>
						Một Năm Lớp 8 Của Tụi Mình
					</motion.h1>

					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5, delay: 0.4 }}
						className="relative w-full max-w-3xl h-64 md:h-96 mx-auto my-8 rounded-xl overflow-hidden shadow-xl"
					>
						<Image
							src="https://files.catbox.moe/0ymsc1.jpg?height=600&width=1200"
							alt="Ảnh lớp 8"
							fill
							className="object-cover"
							priority
						/>
					</motion.div>

					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.6 }}
						className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-slate-700 dark:text-slate-300"
					>
						Cùng nhau nhìn lại một năm học đầy kỷ niệm, những khoảnh
						khắc đáng nhớ và tình bạn đẹp của chúng ta.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.8 }}
						className="flex flex-wrap gap-4 justify-center"
					>
						<Button
							size="lg"
							className="bg-blue-600 hover:bg-blue-700 text-white"
							asChild
						>
							<Link href="/gallery">Xem Thư Viện Ảnh</Link>
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-slate-800"
							asChild
						>
							<Link href="/memory-board">Sổ Lưu Bút</Link>
						</Button>
					</motion.div>
				</div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1.2, duration: 0.5 }}
					className="absolute bottom-8"
				>
					<Button
						variant="ghost"
						size="icon"
						className="rounded-full animate-bounce"
						onClick={scrollToTimeline}
					>
						<ChevronDown className="h-6 w-6" />
					</Button>
				</motion.div>
			</section>

			{/* Timeline Preview Section */}
			<section
				ref={timelineRef}
				className="w-full py-20 bg-white dark:bg-slate-900"
			>
				<div className="container px-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
						className="text-center mb-16"
					>
						<h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-800 dark:text-blue-300">
							Một Năm Đã Qua
						</h2>
						<p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
							Hành trình của chúng ta qua từng tháng với những kỷ
							niệm khó quên
						</p>
					</motion.div>

					{featuredEvents.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
							{featuredEvents.map((event, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.5,
										delay: index * 0.1,
									}}
									viewport={{ once: true }}
									className="bg-blue-50 dark:bg-slate-800 rounded-xl overflow-hidden shadow-md"
								>
									<div className="relative h-48 w-full">
										<Image
											src={
												event.image ||
												"/placeholder.svg"
											}
											alt={event.title}
											fill
											className="object-cover"
										/>
									</div>
									<div className="p-6">
										<span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mb-2">
											{event.month}
										</span>
										<h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
											{event.title}
										</h3>
										<p className="text-slate-600 dark:text-slate-300">
											{event.description}
										</p>
									</div>
								</motion.div>
							))}
						</div>
					) : (
						<div className="text-center p-8 bg-blue-50 dark:bg-slate-800 rounded-lg mb-12">
							<p className="text-slate-600 dark:text-slate-300">
								Chưa có sự kiện nào trong timeline.
							</p>
						</div>
					)}

					<div className="text-center">
						<Button
							size="lg"
							className="bg-blue-600 hover:bg-blue-700 text-white"
							asChild
						>
							<Link href="/timeline">Xem Toàn Bộ Timeline</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Gallery Preview */}
			<section className="w-full py-20 bg-blue-50 dark:bg-slate-800">
				<div className="container px-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
						className="text-center mb-16"
					>
						<h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-800 dark:text-blue-300">
							Góc Kỷ Niệm
						</h2>
						<p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
							Những khoảnh khắc đáng nhớ được lưu giữ qua ảnh và
							video
						</p>
					</motion.div>

					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
						{photos.map((photo, index) => (
							<motion.div
								key={photo.id}
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{
									duration: 0.3,
									delay: index * 0.05,
								}}
								className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md cursor-pointer group"
								// onClick={() => openLightbox(photo.id)}
							>
								<Image
									src={photo.src || "/placeholder.svg"}
									alt={photo.alt}
									fill
									className="object-cover transition-transform duration-300 group-hover:scale-105"
								/>
								<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
									<div className="p-4 w-full text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
										<p className="font-medium">
											{photo.alt}
										</p>
									</div>
								</div>
							</motion.div>
						))}
					</div>

					<div className="text-center">
						<Button
							size="lg"
							className="bg-blue-600 hover:bg-blue-700 text-white"
							asChild
						>
							<Link href="/gallery">Xem Thêm Ảnh & Video</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Memory Board Preview */}
			<section className="w-full py-20 bg-white dark:bg-slate-900">
				<div className="container px-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
						className="text-center mb-16"
					>
						<h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-800 dark:text-blue-300">
							Lời Muốn Nói
						</h2>
						<p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
							Sổ lưu bút online - Nơi để lại những lời nhắn và kỷ
							niệm
						</p>
					</motion.div>

					{latestMemories.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
							{latestMemories.map((memory, index) => (
								<motion.div
									key={memory._id || memory.id || index}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.5,
										delay: index * 0.1,
									}}
									viewport={{ once: true }}
									className="bg-blue-50 dark:bg-slate-800 p-6 rounded-xl shadow-md"
								>
									<div className="flex items-center mb-4">
										<div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
											<Image
												src={
													memory.avatar ||
													"/placeholder.svg"
												}
												alt={memory.name}
												fill
												className="object-cover"
											/>
										</div>
										<h3 className="font-bold text-lg text-slate-900 dark:text-white">
											{memory.name}
										</h3>
									</div>
									<p className="text-slate-600 dark:text-slate-300 italic">
										"{memory.message}"
									</p>
								</motion.div>
							))}
						</div>
					) : (
						<div className="text-center p-8 bg-blue-50 dark:bg-slate-800 rounded-lg mb-12">
							<p className="text-slate-600 dark:text-slate-300">
								Chưa có lời nhắn nào. Hãy là người đầu tiên để
								lại lời nhắn!
							</p>
						</div>
					)}

					<div className="text-center">
						<Button
							size="lg"
							className="bg-blue-600 hover:bg-blue-700 text-white"
							asChild
						>
							<Link href="/memory-board">Xem & Viết Lưu Bút</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Conclusion */}
			<section className="w-full py-20 bg-gradient-to-t from-blue-50 to-white dark:from-slate-800 dark:to-slate-900 relative overflow-hidden">
				<div className="container px-4 z-10 relative">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
						className="text-center max-w-3xl mx-auto"
					>
						<h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-800 dark:text-blue-300">
							Tạm Biệt Tuổi 14
						</h2>
						<p className="text-lg md:text-xl mb-8 text-slate-700 dark:text-slate-300">
							Tạm biệt lớp 8, hẹn gặp lại năm lớp 9 – năm cuối
							cấp! Chúc tất cả các bạn có một kỳ nghỉ hè thật vui
							vẻ và chuẩn bị thật tốt cho năm học mới.
						</p>
						<Button
							size="lg"
							className="bg-blue-600 hover:bg-blue-700 text-white"
							asChild
						>
							<Link href="/about">Về Chúng Mình</Link>
						</Button>
					</motion.div>
				</div>
			</section>
		</div>
	);
}
