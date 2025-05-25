import clientPromise from "@/lib/mongodb";
import ClientHomePage from "@/components/client-home-page";
import { promises as fs } from "fs";
import path from "path";

// Replace the entire Home function with this:
export default async function Home() {
	try {
		// Connect to MongoDB
		const client = await clientPromise;
		const db = client.db("graduation");

		// Get latest memories and convert ObjectId to string
		const memoriesFromDB = await db
			.collection("memories")
			.find({})
			.sort({ _id: -1 })
			.limit(2)
			.toArray();

		// Convert MongoDB documents to plain objects
		const memories = memoriesFromDB.map((memory) => ({
			_id: memory._id.toString(), // Convert ObjectId to string
			name: memory.name,
			message: memory.message,
			avatar: memory.avatar,
			date: memory.date,
		}));

		// Get timeline data (still using JSON for timeline)
		const timelineFilePath = path.join(
			process.cwd(),
			"data",
			"timeline.json",
		);

		// Default timeline data
		const defaultTimelineData = {
			events: [
				{
					month: "Tháng 9",
					title: "Khai Giảng",
					description:
						"Ngày đầu tiên của năm học mới, gặp lại bạn bè sau kỳ nghỉ hè.",
					image: "/placeholder.svg?height=400&width=600",
				},
				{
					month: "Tháng 3 - 2025",
					title: "Ngày Quốc Tế Phụ Nữ",
					description: "Các bạn nam tặng quà cho các bạn nữ.",
					image: "https://files.catbox.moe/jki3q0.jpg",
				},
			],
		};

		// Read timeline data
		let timelineData;
		try {
			const fileData = await fs.readFile(timelineFilePath, "utf8");
			timelineData = JSON.parse(fileData);
		} catch (error) {
			console.error(`Error reading ${timelineFilePath}:`, error);
			timelineData = defaultTimelineData;
		}

		// Ensure events is an array
		const events = Array.isArray(timelineData.events)
			? timelineData.events
			: [];

		// Get 2 featured events
		const featuredEvents = events.slice(0, 2);

		return (
			<ClientHomePage
				latestMemories={memories}
				featuredEvents={featuredEvents}
			/>
		);
	} catch (error) {
		console.error("Error in Home page:", error);
		// Return fallback version if there's an error
		return <ClientHomePage latestMemories={[]} featuredEvents={[]} />;
	}
}
