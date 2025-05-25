"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Play } from "lucide-react";
import VideoPlayer from "@/components/video-player";

// Gallery data
const photos = [
	{
		id: 1,
		src: "https://files.catbox.moe/0a7wcc.jpg?height=600&width=800&text=Thể+Thao",
		alt: "Hoạt động thể thao",
		category: "outdoor",
	},
	{
		id: 2,
		src: "https://files.catbox.moe/84suaj.jpg?height=600&width=800&text=Sinh+Nhật+Cô",
		alt: "Tổ chức ngày Sinh Nhật cô",
		category: "events",
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
		alt: "Tham quan, dã ngoại",
		category: "outdoor",
	},
	{
		id: 5,
		src: "https://files.catbox.moe/99wecx.jpg?height=600&width=800&text=Lớp+Học",
		alt: "Trong lớp học",
		category: "classroom",
	},
	{
		id: 6,
		src: "https://files.catbox.moe/fxf9nt.jpg?height=600&width=800&text=Thể+Thao",
		alt: "Hoạt động thể thao",
		category: "outdoor",
	},
	{
		id: 7,
		src: "https://files.catbox.moe/g0tglt.jpg?height=600&width=800&text=Ảnh+Dìm",
		alt: "Ảnh chụp trong lớp",
		category: "classroom",
	},
	{
		id: 8,
		src: "https://files.catbox.moe/8ys5vq.jpg?height=600&width=800&text=HBTA",
		alt: "Hùng biện tiếng anh",
		category: "school-events",
	},
	{
		id: 9,
		src: "https://files.catbox.moe/crtn09.jpg?height=600&width=800&text=VHĐ",
		alt: "Ngày Sách và Văn hóa đọc Việt Nam",
		category: "school-events",
	},
];

// Videos data
const videos = [
	{
		id: 1,
		thumbnail:
			"https://files.catbox.moe/jki3q0.jpg?height=600&width=800&text=Video+8+thg+3",
		title: "Tiết mục chào mừng 8/3",
		category: "school-events",
		videoUrl: "https://files.catbox.moe/o246eq.mp4",
	},
	{
		id: 2,
		thumbnail:
			"https://files.catbox.moe/ciiohg.png?height=600&width=800&text=Video+Thể+Thao",
		title: "Hoạt động thể thao",
		category: "outdoor",
		videoUrl: "https://files.catbox.moe/loet1m.mp4",
	},
	{
		id: 3,
		thumbnail:
			"https://files.catbox.moe/blnxj1.png?height=600&width=800&text=Video+HeoBai",
		title: "Tham quan, dã ngoại",
		category: "outdoor",
		videoUrl: "https://files.catbox.moe/3o32xi.mp4",
	},
];

export default function GalleryPage() {
	const [selectedImage, setSelectedImage] = useState<number | null>(null);
	const [activeTab, setActiveTab] = useState("photos");
	const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
	const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

	const openLightbox = (id: number) => {
		setSelectedImage(id);
		document.body.style.overflow = "hidden";
	};

	const closeLightbox = () => {
		setSelectedImage(null);
		document.body.style.overflow = "auto";
	};

	const openVideoModal = (id: number) => {
		setSelectedVideo(id);
		setIsVideoModalOpen(true);
		document.body.style.overflow = "hidden";
	};

	const closeVideoModal = () => {
		setSelectedVideo(null);
		setIsVideoModalOpen(false);
		document.body.style.overflow = "auto";
	};

	const currentPhoto = photos.find((photo) => photo.id === selectedImage);
	const currentVideo = videos.find((video) => video.id === selectedVideo);

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
						Góc Kỷ Niệm
					</h1>
					<p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
						Những khoảnh khắc đáng nhớ được lưu giữ qua ảnh và video
					</p>
				</motion.div>

				<Tabs
					defaultValue="photos"
					value={activeTab}
					onValueChange={setActiveTab}
					className="w-full"
				>
					<div className="flex justify-center mb-8">
						<TabsList className="grid w-full max-w-md grid-cols-2">
							<TabsTrigger value="photos">Hình Ảnh</TabsTrigger>
							<TabsTrigger value="videos">Video</TabsTrigger>
						</TabsList>
					</div>

					<TabsContent value="photos" className="mt-6">
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
									onClick={() => openLightbox(photo.id)}
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
					</TabsContent>

					<TabsContent value="videos" className="mt-6">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{videos.map((video, index) => (
								<motion.div
									key={video.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.3,
										delay: index * 0.1,
									}}
									className="bg-blue-50 dark:bg-slate-800 rounded-xl overflow-hidden shadow-md cursor-pointer group"
									onClick={() => openVideoModal(video.id)}
								>
									<div className="relative aspect-video">
										<Image
											src={
												video.thumbnail ||
												"/placeholder.svg"
											}
											alt={video.title}
											fill
											className="object-cover group-hover:scale-105 transition-transform duration-300"
										/>
										<div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
											<div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-white transition-all duration-300 shadow-lg">
												<Play
													className="w-6 h-6 text-blue-600 ml-0.5"
													fill="currentColor"
												/>
											</div>
										</div>
									</div>
									<div className="p-4">
										<h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
											{video.title}
										</h3>
										<p className="text-slate-600 dark:text-slate-300 mt-2">
											Nhấn vào để xem video
										</p>
									</div>
								</motion.div>
							))}
						</div>
					</TabsContent>
				</Tabs>

				{/* Lightbox */}
				<AnimatePresence>
					{selectedImage && currentPhoto && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
							onClick={closeLightbox}
						>
							<motion.div
								initial={{ scale: 0.9 }}
								animate={{ scale: 1 }}
								exit={{ scale: 0.9 }}
								className="relative max-w-4xl max-h-[90vh] w-full"
								onClick={(e) => e.stopPropagation()}
							>
								<div className="relative w-full h-auto aspect-[4/3]">
									<Image
										src={
											currentPhoto.src ||
											"/placeholder.svg"
										}
										alt={currentPhoto.alt}
										fill
										className="object-contain"
									/>
								</div>
								<button
									className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black bg-opacity-50 flex items-center justify-center text-white"
									onClick={closeLightbox}
								>
									<X className="w-6 h-6" />
								</button>
								<div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4">
									<p className="text-lg font-medium">
										{currentPhoto.alt}
									</p>
								</div>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Video Modal */}
				<AnimatePresence>
					{isVideoModalOpen && selectedVideo && currentVideo && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
							onClick={closeVideoModal}
						>
							<motion.div
								initial={{ scale: 0.9 }}
								animate={{ scale: 1 }}
								exit={{ scale: 0.9 }}
								className="relative max-w-6xl max-h-[90vh] w-full"
								onClick={(e) => e.stopPropagation()}
							>
								<VideoPlayer
									src={currentVideo.videoUrl}
									title={currentVideo.title}
									poster={currentVideo.thumbnail}
									autoPlay={true}
									className="w-full aspect-video"
								/>
								<button
									className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black bg-opacity-50 flex items-center justify-center text-white hover:bg-opacity-70 transition-colors duration-200 z-10"
									onClick={closeVideoModal}
								>
									<X className="w-6 h-6" />
								</button>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}
