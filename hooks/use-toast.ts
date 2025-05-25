"use client";

import { useState, useCallback } from "react";

type ToastVariant = "default" | "destructive" | "success";

interface ToastProps {
	title: string;
	description: string;
	variant?: ToastVariant;
	id?: string;
}

export function useToast() {
	const [toasts, setToasts] = useState<(ToastProps & { id: string })[]>([]);

	// Sử dụng useCallback để đảm bảo hàm toast không thay đổi giữa các lần render
	const toast = useCallback((props: ToastProps) => {
		const id = props.id || Math.random().toString(36).substring(2, 9);
		const newToast = { ...props, id };

		setToasts((prev) => [...prev, newToast]);

		// Tự động xóa toast sau 5 giây
		setTimeout(() => {
			setToasts((prev) => prev.filter((t) => t.id !== id));
		}, 5000);

		return id;
	}, []);

	// Sử dụng useCallback cho dismissToast
	const dismissToast = useCallback((id: string) => {
		setToasts((prev) => prev.filter((t) => t.id !== id));
	}, []);

	return { toast, toasts, dismissToast };
}
