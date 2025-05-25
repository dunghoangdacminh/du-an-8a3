"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Định nghĩa kiểu dữ liệu cho memory
interface Memory {
	_id?: string;
	id?: number;
	name: string;
	message: string;
	avatar: string;
	date: string;
}

export default function MemoryBoardPage() {
	const [memories, setMemories] = useState<Memory[]>([]);
	const [newMemory, setNewMemory] = useState({
		name: "",
		message: "",
	});
	const [errors, setErrors] = useState({
		name: false,
		message: false,
	});
	const [isLoading, setIsLoading] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { toast } = useToast();

	// Tách hàm fetchMemories ra khỏi useEffect và sử dụng useCallback
	const fetchMemories = useCallback(async () => {
		try {
			const response = await fetch("/api/memories");
			if (!response.ok) {
				throw new Error("Failed to fetch memories");
			}
			const data = await response.json();
			setMemories(data.memories);
		} catch (error) {
			console.error("Error fetching memories:", error);
			toast({
				title: "Lỗi",
				description:
					"Không thể tải dữ liệu lưu bút. Vui lòng thử lại sau.",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	}, [toast]);

	// Fetch memories chỉ một lần khi component mount
	useEffect(() => {
		fetchMemories();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // Bỏ dependency để chỉ chạy một lần khi mount

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Validate form
		const newErrors = {
			name: !newMemory.name.trim(),
			message: !newMemory.message.trim(),
		};

		setErrors(newErrors);

		if (newErrors.name || newErrors.message) {
			return;
		}

		setIsSubmitting(true);

		try {
			// Prepare data to send
			const today = new Date();
			const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

			const memoryData = {
				name: newMemory.name,
				message: newMemory.message,
				avatar: `/placeholder.svg?height=100&width=100&text=${newMemory.name
					.split(" ")
					.map((n) => n[0])
					.join("")}`,
				date: formattedDate,
			};

			// Send data to API
			const response = await fetch("/api/memories", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(memoryData),
			});

			if (!response.ok) {
				throw new Error("Failed to add memory");
			}

			const savedMemory = await response.json();

			// Update state with new memory
			setMemories([savedMemory, ...memories]);
			setNewMemory({ name: "", message: "" });

			toast({
				title: "Thành công!",
				description: "Lời nhắn của bạn đã được lưu lại.",
			});
		} catch (error) {
			console.error("Error adding memory:", error);
			toast({
				title: "Lỗi",
				description: "Không thể lưu lời nhắn. Vui lòng thử lại sau.",
				variant: "destructive",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

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
						Lời Muốn Nói
					</h1>
					<p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
						Sổ lưu bút online - Nơi để lại những lời nhắn và kỷ niệm
					</p>
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Memory form */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						className="lg:col-span-1"
					>
						<Card>
							<CardContent className="pt-6">
								<form
									onSubmit={handleSubmit}
									className="space-y-4"
								>
									<div className="space-y-2">
										<Label htmlFor="name">
											Tên của bạn
										</Label>
										<Input
											id="name"
											placeholder="Nhập tên của bạn"
											value={newMemory.name}
											onChange={(e) =>
												setNewMemory({
													...newMemory,
													name: e.target.value,
												})
											}
											className={
												errors.name
													? "border-red-500"
													: ""
											}
											disabled={isSubmitting}
										/>
										{errors.name && (
											<p className="text-red-500 text-sm">
												Vui lòng nhập tên của bạn
											</p>
										)}
									</div>

									<div className="space-y-2">
										<Label htmlFor="message">
											Lời nhắn
										</Label>
										<Textarea
											id="message"
											placeholder="Viết lời nhắn của bạn ở đây..."
											rows={5}
											value={newMemory.message}
											onChange={(e) =>
												setNewMemory({
													...newMemory,
													message: e.target.value,
												})
											}
											className={
												errors.message
													? "border-red-500"
													: ""
											}
											disabled={isSubmitting}
										/>
										{errors.message && (
											<p className="text-red-500 text-sm">
												Vui lòng nhập lời nhắn
											</p>
										)}
									</div>

									<Button
										type="submit"
										className="w-full"
										disabled={isSubmitting}
									>
										{isSubmitting ? (
											<>
												<Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
												Đang gửi...
											</>
										) : (
											<>
												<Send className="mr-2 h-4 w-4" />{" "}
												Gửi lời nhắn
											</>
										)}
									</Button>
								</form>
							</CardContent>
						</Card>
					</motion.div>

					{/* Memory list */}
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						className="lg:col-span-2"
					>
						{isLoading ? (
							<div className="flex justify-center items-center h-64">
								<Loader2 className="h-8 w-8 animate-spin text-blue-500" />
								<span className="ml-2 text-slate-600 dark:text-slate-400">
									Đang tải lưu bút...
								</span>
							</div>
						) : memories.length === 0 ? (
							<div className="text-center p-8 bg-blue-50 dark:bg-slate-800 rounded-lg">
								<p className="text-slate-600 dark:text-slate-300">
									Chưa có lời nhắn nào. Hãy là người đầu tiên!
								</p>
							</div>
						) : (
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{memories.map((memory, index) => (
									<motion.div
										key={memory._id || memory.id || index}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											duration: 0.3,
											delay: index * 0.05,
										}}
									>
										<Card className="h-full">
											<CardContent className="p-6">
												<div className="flex items-start gap-4">
													<div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
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
													<div className="flex-1">
														<div className="flex justify-between items-start">
															<h3 className="font-bold text-lg text-slate-900 dark:text-white">
																{memory.name}
															</h3>
															<span className="text-xs text-slate-500 dark:text-slate-400">
																{memory.date}
															</span>
														</div>
														<p className="mt-2 text-slate-600 dark:text-slate-300">
															{memory.message}
														</p>
													</div>
												</div>
											</CardContent>
										</Card>
									</motion.div>
								))}
							</div>
						)}
					</motion.div>
				</div>
			</div>
		</div>
	);
}
