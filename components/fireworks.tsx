"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface FireworkParticle {
	id: string;
	x: number;
	y: number;
	size: number;
	color: string;
	angle: number;
	distance: number;
	duration: number;
	delay: number;
}

export default function Fireworks({ autoPlay = true }: { autoPlay?: boolean }) {
	const [particles, setParticles] = useState<FireworkParticle[]>([]);
	const [isPlaying, setIsPlaying] = useState(false);
	const idCounterRef = useRef(0);
	const timeoutRef = useRef<NodeJS.Timeout>();

	const colors = [
		"#FF5252", // Red
		"#FFEB3B", // Yellow
		"#4CAF50", // Green
		"#2196F3", // Blue
		"#E040FB", // Purple
		"#FF9800", // Orange
		"#00BCD4", // Cyan
	];

	const createFirework = useCallback(
		(x: number, y: number) => {
			const newParticles: FireworkParticle[] = [];
			const particleCount = Math.floor(Math.random() * 30) + 30; // 30-60 particles
			const baseSize = Math.random() * 3 + 2; // 2-5px
			const color = colors[Math.floor(Math.random() * colors.length)];
			const baseDuration = Math.random() * 0.5 + 0.8; // 0.8-1.3s

			for (let i = 0; i < particleCount; i++) {
				const angle = (Math.PI * 2 * i) / particleCount;
				const distance = Math.random() * 100 + 50; // 50-150px
				const delay = Math.random() * 0.2; // 0-0.2s
				const size = baseSize * (Math.random() * 0.5 + 0.5); // Variation in size
				const duration = baseDuration * (Math.random() * 0.4 + 0.8); // Variation in duration

				idCounterRef.current += 1;
				const uniqueId = `particle-${idCounterRef.current}-${Date.now()}`;

				newParticles.push({
					id: uniqueId,
					x,
					y,
					size,
					color,
					angle,
					distance,
					duration,
					delay,
				});
			}

			return newParticles;
		},
		[colors],
	);

	const launchFireworks = useCallback(() => {
		if (isPlaying) return; // Prevent multiple launches

		setIsPlaying(true);
		const allNewParticles: FireworkParticle[] = [];

		// Create multiple fireworks at random positions
		const fireworkCount = Math.floor(Math.random() * 3) + 2; // 2-4 fireworks

		for (let i = 0; i < fireworkCount; i++) {
			const x = Math.random() * 80 + 10; // 10-90% of screen width
			const y = Math.random() * 40 + 30; // 30-70% of screen height
			const newParticles = createFirework(x, y);
			allNewParticles.push(...newParticles);
		}

		setParticles((prev) => [...prev, ...allNewParticles]);

		// Clear particles after animation completes
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(() => {
			setParticles((prev) =>
				prev.filter(
					(p) => !allNewParticles.some((np) => np.id === p.id),
				),
			);

			if (autoPlay && Math.random() > 0.3) {
				// 70% chance to continue in autoplay mode
				setTimeout(() => {
					setIsPlaying(false);
					launchFireworks();
				}, 1000);
			} else {
				setIsPlaying(false);
			}
		}, 2000);
	}, [isPlaying, createFirework, autoPlay]);

	useEffect(() => {
		if (autoPlay) {
			const timeout = setTimeout(() => {
				launchFireworks();
			}, 1000);

			return () => {
				if (timeout) clearTimeout(timeout);
			};
		}
	}, [autoPlay, launchFireworks]);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	return (
		<>
			<div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
				<AnimatePresence mode="popLayout">
					{particles.map((particle) => (
						<motion.div
							key={particle.id}
							className="absolute rounded-full"
							initial={{
								x: `${particle.x}%`,
								y: `${particle.y}%`,
								scale: 0.1,
								opacity: 1,
							}}
							animate={{
								x: `calc(${particle.x}% + ${Math.cos(particle.angle) * particle.distance}px)`,
								y: `calc(${particle.y}% + ${Math.sin(particle.angle) * particle.distance}px)`,
								scale: 1,
								opacity: 0,
							}}
							exit={{ opacity: 0, scale: 0 }}
							transition={{
								duration: particle.duration,
								delay: particle.delay,
								ease: "easeOut",
							}}
							style={{
								width: particle.size,
								height: particle.size,
								backgroundColor: particle.color,
								boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
							}}
						/>
					))}
				</AnimatePresence>
			</div>

			{!autoPlay && (
				<div className="fixed bottom-8 right-8 z-50">
					<Button
						size="lg"
						className="rounded-full shadow-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
						onClick={launchFireworks}
						disabled={isPlaying}
					>
						<Sparkles className="mr-2 h-5 w-5" />
						{isPlaying ? "Đang bắn..." : "Pháo Hoa"}
					</Button>
				</div>
			)}
		</>
	);
}
