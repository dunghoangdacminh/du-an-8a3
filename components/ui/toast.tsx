// Nếu file này chưa tồn tại, tạo mới
"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ToastProps {
	id: string
	title: string
	description: string
	variant?: "default" | "destructive" | "success"
	onDismiss: (id: string) => void
}

export function Toast({ id, title, description, variant = "default", onDismiss }: ToastProps) {
	const [isVisible, setIsVisible] = useState(true)

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(false)
			setTimeout(() => onDismiss(id), 300)
		}, 5000)

		return () => clearTimeout(timer)
	}, [id, onDismiss])

	const getVariantStyles = () => {
		switch (variant) {
			case "destructive":
				return "bg-red-500 text-white"
			case "success":
				return "bg-green-500 text-white"
			default:
				return "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
		}
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20, scale: 0.9 }}
			animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20, scale: isVisible ? 1 : 0.9 }}
			transition={{ duration: 0.2 }}
			className={`rounded-lg shadow-lg p-4 mb-2 ${getVariantStyles()}`}
		>
			<div className="flex justify-between items-start">
				<div>
					<h3 className="font-medium">{title}</h3>
					<p className="text-sm opacity-90 mt-1">{description}</p>
				</div>
				<button
					onClick={() => {
						setIsVisible(false)
						setTimeout(() => onDismiss(id), 300)
					}}
					className="ml-4 p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10"
				>
					<X className="h-4 w-4" />
				</button>
			</div>
		</motion.div>
	)
}

export function ToastContainer({ toasts, dismissToast }: { toasts: any[]; dismissToast: (id: string) => void }) {
	return (
		<div className="fixed bottom-4 right-4 z-50 max-w-md w-full flex flex-col items-end">
			<AnimatePresence>
				{toasts.map((toast) => (
					<Toast key={toast.id} {...toast} onDismiss={dismissToast} />
				))}
			</AnimatePresence>
		</div>
	)
}
