"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Music, Volume2, VolumeX } from "lucide-react";
import Fireworks from "@/components/fireworks";
import Link from "next/link";

// Tạo dữ liệu ngẫu nhiên nhưng cố định
const generateStars = () => {
	return Array.from({ length: 100 }).map((_, i) => ({
		id: `star-${i}`,
		x: Math.random() * 100,
		y: Math.random() * 100,
		size: Math.random() * 3 + 1,
		opacity: Math.random() * 0.7 + 0.3,
		duration: Math.random() * 3 + 2,
		delay: Math.random() * 5,
	}));
};

const generateBalloons = () => {
	return Array.from({ length: 15 }).map((_, i) => ({
		id: `balloon-${i}`,
		x: Math.random() * 100,
		xOffset: Math.sin(i) * 50,
		color: [
			"#FF5252",
			"#FFEB3B",
			"#4CAF50",
			"#2196F3",
			"#E040FB",
			"#FF9800",
		][Math.floor(Math.random() * 6)],
		duration: Math.random() * 20 + 15,
		delay: Math.random() * 10,
	}));
};

// Tạo dữ liệu trước khi component render
const stars = generateStars();
const balloons = generateBalloons();

export default function CelebrationPage() {
	const [showFireworks, setShowFireworks] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isMuted, setIsMuted] = useState(false);
	const [audioLoaded, setAudioLoaded] = useState(false);
	const [audioError, setAudioError] = useState<string | null>(null);
	const [isClient, setIsClient] = useState(false);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	// Đánh dấu khi code chạy ở client
	useEffect(() => {
		setIsClient(true);
	}, []);

	const launchFireworks = () => {
		setShowFireworks(true);
		setTimeout(() => setShowFireworks(false), 5000);
	};

	const toggleMusic = () => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.pause();
			} else {
				// Thử phát nhạc và bắt lỗi nếu có
				const playPromise = audioRef.current.play();
				if (playPromise !== undefined) {
					playPromise
						.then(() => {
							// Phát nhạc thành công
							setAudioError(null);
						})
						.catch((error) => {
							// Lỗi khi phát nhạc
							console.error("Error playing audio:", error);
							setAudioError(
								"Không thể phát nhạc. Vui lòng thử lại hoặc kiểm tra quyền truy cập.",
							);
						});
				}
			}
			setIsPlaying(!isPlaying);
		}
	};

	const toggleMute = () => {
		if (audioRef.current) {
			audioRef.current.muted = !isMuted;
			setIsMuted(!isMuted);
		}
	};

	useEffect(() => {
		// Tạo phần tử audio với URL bên ngoài
		const audio = new Audio("https://files.catbox.moe/nipbem.mp3");
		audio.loop = true;

		// Xử lý sự kiện khi audio đã sẵn sàng
		audio.addEventListener("canplaythrough", () => {
			setAudioLoaded(true);
			setAudioError(null);
		});

		// Xử lý lỗi
		audio.addEventListener("error", (e) => {
			console.error("Audio error:", e);
			setAudioError(
				"Không thể tải file nhạc. Vui lòng kiểm tra kết nối mạng hoặc URL.",
			);
		});

		audioRef.current = audio;

		// Cleanup khi component unmount
		return () => {
			if (audioRef.current) {
				audioRef.current.pause();
				audioRef.current.src = "";
				audioRef.current = null;
			}
		};
	}, []);

	// Nếu đang ở server-side, render một phiên bản đơn giản hơn
	if (!isClient) {
		return (
			<div className="min-h-screen bg-gradient-to-b from-blue-900 via-purple-900 to-pink-900 flex flex-col items-center justify-center p-4">
				<div className="text-center">
					<h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
						<span className="text-yellow-300">Chúc Mừng</span> Bế
						Giảng!
					</h1>
					<p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-2xl">
						Hãy cùng nhau ăn mừng kết thúc một năm học tuyệt vời với
						những kỷ niệm đáng nhớ!
					</p>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
						<Button
							size="lg"
							className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-lg p-8 h-auto"
						>
							<Sparkles className="mr-3 h-6 w-6" />
							Bắn Pháo Hoa
						</Button>
						<Button
							size="lg"
							className="bg-gradient-to-r from-blue-500 to-teal-500 text-white text-lg p-8 h-auto"
						>
							<Music className="mr-3 h-6 w-6" />
							Bật Nhạc
						</Button>
					</div>
					<Button
						size="lg"
						className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-lg px-8 py-6 h-auto"
					>
						Quay Về Trang Chủ
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-b from-blue-900 via-purple-900 to-pink-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
			{/* Stars background */}
			<div className="absolute inset-0 overflow-hidden">
				{stars.map((star) => (
					<motion.div
						key={star.id}
						className="absolute rounded-full bg-white"
						initial={{
							x: `${star.x}%`,
							y: `${star.y}%`,
							scale: Math.random() * 0.5 + 0.1,
							opacity: star.opacity,
						}}
						animate={{
							opacity: [null, 0.2, 1, 0.2],
						}}
						transition={{
							duration: star.duration,
							repeat: Number.POSITIVE_INFINITY,
							repeatType: "reverse",
							delay: star.delay,
						}}
						style={{
							width: `${star.size}px`,
							height: `${star.size}px`,
						}}
					/>
				))}
			</div>

			{/* Conditional fireworks */}
			{showFireworks && <Fireworks autoPlay={false} />}

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				className="z-10 text-center"
			>
				<h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
					<span className="text-yellow-300">Chúc Mừng</span> Bế Giảng!
				</h1>
				<p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-2xl">
					Hãy cùng nhau ăn mừng kết thúc một năm học tuyệt vời với
					những kỷ niệm đáng nhớ!
				</p>

				{/* Hiển thị thông báo lỗi nếu có */}
				{audioError && (
					<div className="bg-red-500/70 text-white p-4 rounded-lg mb-6 max-w-md mx-auto">
						<p>{audioError}</p>
					</div>
				)}

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
					<Button
						size="lg"
						className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white text-lg p-8 h-auto"
						onClick={launchFireworks}
					>
						<Sparkles className="mr-3 h-6 w-6" />
						Bắn Pháo Hoa
					</Button>

					<Button
						size="lg"
						className={`bg-gradient-to-r ${
							isPlaying
								? "from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
								: "from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
						} text-white text-lg p-8 h-auto`}
						onClick={toggleMusic}
						disabled={!audioLoaded && !audioError}
					>
						<Music className="mr-3 h-6 w-6" />
						{isPlaying ? "Tắt Nhạc" : "Bật Nhạc"}
					</Button>
				</div>

				<Button
					size="lg"
					className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white text-lg px-8 py-6 h-auto"
					asChild
				>
					<Link href="/">Quay Về Trang Chủ</Link>
				</Button>
			</motion.div>

			{/* Music controls */}
			{isPlaying && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="fixed bottom-6 right-6 z-20"
				>
					<Button
						size="icon"
						variant="outline"
						className="rounded-full bg-black/50 border-white/20 text-white hover:bg-black/70"
						onClick={toggleMute}
					>
						{isMuted ? (
							<VolumeX className="h-5 w-5" />
						) : (
							<Volume2 className="h-5 w-5" />
						)}
					</Button>
				</motion.div>
			)}

			{/* Floating balloons */}
			{balloons.map((balloon) => (
				<motion.div
					key={balloon.id}
					className="absolute rounded-full w-8 h-10 opacity-80"
					initial={{
						x: `${balloon.x}%`,
						y: "110%",
						backgroundColor: balloon.color,
					}}
					animate={{
						y: "-10%",
						x: `calc(${balloon.x}% + ${balloon.xOffset}px)`,
					}}
					transition={{
						duration: balloon.duration,
						repeat: Number.POSITIVE_INFINITY,
						repeatType: "loop",
						delay: balloon.delay,
						ease: "linear",
					}}
					style={{
						borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
					}}
				>
					<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0.5 h-10 bg-white/50" />
				</motion.div>
			))}

			{/* Thêm phần tử audio trực tiếp vào DOM để hỗ trợ một số trình duyệt */}
			<audio
				src="https://files.catbox.moe/nipbem.mp3"
				ref={audioRef}
				loop
				preload="auto"
				className="hidden"
				onCanPlayThrough={() => setAudioLoaded(true)}
				onError={(e) => {
					console.error("Audio error from element:", e);
					setAudioError("Không thể tải file nhạc từ phần tử audio.");
				}}
			/>
		</div>
	);
}
