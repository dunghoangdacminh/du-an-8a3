"use client"

import type React from "react"
import { useToast } from "@/hooks/use-toast"
import { ToastContainer } from "@/components/ui/toast"

export function ToastProvider({ children }: { children: React.ReactNode }) {
	const { toasts, dismissToast } = useToast()

	return (
		<>
			{children}
			<ToastContainer toasts={toasts} dismissToast={dismissToast} />
		</>
	)
}
