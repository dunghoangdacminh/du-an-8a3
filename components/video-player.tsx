"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import {
	Play,
	Pause,
	Volume2,
	VolumeX,
	Maximize,
	Minimize,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoPlayerProps {
	src: string;
	title: string;
	poster?: string;
	autoPlay?: boolean;
	className?: string;
}

export default function VideoPlayer({
	src,
	title,
	poster,
	autoPlay = false,
	className = "",
}: VideoPlayerProps) {
	const [isPlaying, setIsPlaying] = useState(autoPlay);
	const [isMuted, setIsMuted] = useState(false);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [showControls, setShowControls] = useState(true);
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);

	const videoRef = useRef<HTMLVideoElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const controlsTimeoutRef = useRef<NodeJS.Timeout>();

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const handleLoadedData = () => {
			setIsLoading(false);
			setDuration(video.duration);
		};

		const handleTimeUpdate = () => {
			setCurrentTime(video.currentTime);
		};

		const handlePlay = () => setIsPlaying(true);
		const handlePause = () => setIsPlaying(false);
		const handleError = () => {
			setHasError(true);
			setIsLoading(false);
		};

		video.addEventListener("loadeddata", handleLoadedData);
		video.addEventListener("timeupdate", handleTimeUpdate);
		video.addEventListener("play", handlePlay);
		video.addEventListener("pause", handlePause);
		video.addEventListener("error", handleError);

		return () => {
			video.removeEventListener("loadeddata", handleLoadedData);
			video.removeEventListener("timeupdate", handleTimeUpdate);
			video.removeEventListener("play", handlePlay);
			video.removeEventListener("pause", handlePause);
			video.removeEventListener("error", handleError);
		};
	}, []);

	const togglePlay = () => {
		const video = videoRef.current;
		if (!video) return;

		if (isPlaying) {
			video.pause();
		} else {
			video.play();
		}
	};

	const toggleMute = () => {
		const video = videoRef.current;
		if (!video) return;

		video.muted = !isMuted;
		setIsMuted(!isMuted);
	};

	const toggleFullscreen = () => {
		const container = containerRef.current;
		if (!container) return;

		if (!isFullscreen) {
			if (container.requestFullscreen) {
				container.requestFullscreen();
			}
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			}
		}
		setIsFullscreen(!isFullscreen);
	};

	const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
		const video = videoRef.current;
		if (!video) return;

		const newTime = (Number.parseFloat(e.target.value) / 100) * duration;
		video.currentTime = newTime;
		setCurrentTime(newTime);
	};

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds.toString().padStart(2, "0")}`;
	};

	const handleMouseMove = () => {
		setShowControls(true);
		if (controlsTimeoutRef.current) {
			clearTimeout(controlsTimeoutRef.current);
		}
		controlsTimeoutRef.current = setTimeout(() => {
			if (isPlaying) {
				setShowControls(false);
			}
		}, 3000);
	};

	if (hasError) {
		return (
			<div
				className={`relative bg-black rounded-lg overflow-hidden ${className}`}
			>
				<div className="absolute inset-0 flex items-center justify-center text-white">
					<div className="text-center">
						<p className="text-lg mb-2">Không thể phát video</p>
						<p className="text-sm opacity-70">
							Vui lòng kiểm tra đường dẫn video
						</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div
			ref={containerRef}
			className={`relative bg-black rounded-lg overflow-hidden group ${className}`}
			onMouseMove={handleMouseMove}
			onMouseLeave={() => isPlaying && setShowControls(false)}
		>
			<video
				ref={videoRef}
				src={src}
				poster={poster}
				className="w-full h-full object-contain"
				onClick={togglePlay}
				autoPlay={autoPlay}
				playsInline
			/>

			{isLoading && (
				<div className="absolute inset-0 flex items-center justify-center text-white">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
				</div>
			)}

			{/* Controls */}
			<div
				className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
					showControls ? "opacity-100" : "opacity-0"
				}`}
			>
				{/* Progress bar */}
				<div className="mb-4">
					<input
						type="range"
						min="0"
						max="100"
						value={duration ? (currentTime / duration) * 100 : 0}
						onChange={handleSeek}
						className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider"
					/>
				</div>

				{/* Control buttons */}
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-4">
						<Button
							variant="ghost"
							size="icon"
							onClick={togglePlay}
							className="text-white hover:bg-white/20"
						>
							{isPlaying ? (
								<Pause className="h-5 w-5" />
							) : (
								<Play className="h-5 w-5" />
							)}
						</Button>

						<Button
							variant="ghost"
							size="icon"
							onClick={toggleMute}
							className="text-white hover:bg-white/20"
						>
							{isMuted ? (
								<VolumeX className="h-5 w-5" />
							) : (
								<Volume2 className="h-5 w-5" />
							)}
						</Button>

						<span className="text-white text-sm">
							{formatTime(currentTime)} / {formatTime(duration)}
						</span>
					</div>

					<div className="flex items-center space-x-2">
						<span className="text-white text-sm">{title}</span>
						<Button
							variant="ghost"
							size="icon"
							onClick={toggleFullscreen}
							className="text-white hover:bg-white/20"
						>
							{isFullscreen ? (
								<Minimize className="h-5 w-5" />
							) : (
								<Maximize className="h-5 w-5" />
							)}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
