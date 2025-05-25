"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Định nghĩa kiểu dữ liệu cho timeline event
interface TimelineEvent {
	month: string;
	title: string;
	description: string;
	image: string;
}

interface ClientTimelinePageProps {
	events: TimelineEvent[];
}

export default function ClientTimelinePage({
	events = [],
}: ClientTimelinePageProps) {
	return (
		<div className="bg-white dark:bg-slate-900 min-h-screen py-12">
			<div className="container px-4 mx-auto">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-center mb-16"
				>
					<h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-800 dark:text-blue-300">
						Một Năm Đã Qua
					</h1>
					<p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
						Hành trình của chúng ta qua từng tháng với những kỷ niệm
						khó quên
					</p>
				</motion.div>

				{events.length === 0 ? (
					<div className="text-center p-8 bg-blue-50 dark:bg-slate-800 rounded-lg">
						<p className="text-slate-600 dark:text-slate-300">
							Chưa có sự kiện nào được thêm vào timeline.
						</p>
					</div>
				) : (
					<div className="relative">
						{/* Timeline center line */}
						<div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 dark:bg-blue-900 rounded-full" />

						{/* Timeline events */}
						<div className="space-y-24">
							{events.map((event, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 50 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.1 }}
									viewport={{ once: true, margin: "-100px" }}
									className={`relative flex items-center ${
										index % 2 === 0
											? "flex-row md:flex-row-reverse"
											: "flex-row-reverse md:flex-row"
									} gap-8 md:gap-16`}
								>
									{/* Timeline dot */}
									<div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-500 dark:bg-blue-400 rounded-full border-4 border-white dark:border-slate-900 z-10" />

									{/* Content */}
									<div className="w-full md:w-5/12">
										<div
											className={`bg-blue-50 dark:bg-slate-800 p-6 rounded-xl shadow-md ${
												index % 2 === 0
													? "md:rounded-tr-none"
													: "md:rounded-tl-none"
											}`}
										>
											<span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mb-2">
												{event.month}
											</span>
											<h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
												{event.title}
											</h3>
											<p className="text-slate-600 dark:text-slate-300 mb-4">
												{event.description}
											</p>
											<div className="relative h-48 w-full rounded-lg overflow-hidden">
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
										</div>
									</div>

									{/* Empty space for the other side */}
									<div className="hidden md:block w-5/12" />
								</motion.div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
