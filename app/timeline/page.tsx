import { promises as fs } from "fs";
import path from "path";
import ClientTimelinePage from "@/components/client-timeline-page";

// Đường dẫn đến file JSON
const timelineFilePath = path.join(process.cwd(), "data", "timeline.json");

// Dữ liệu mặc định cho timeline
const defaultTimelineData = {
	events: [
		{
			month: "Tháng 11",
			title: "Sinh nhật cô giáo",
			description: "Tổ chức sinh nhật cô giáo Nguyễn Thị Huyền",
			image: "https://files.catbox.moe/osh0a9.jpg?height=600&width=800&text=Sinh+Nhật+Cô",
		},
		{
			month: "Tháng 1-2",
			title: "Hội chợ xuân",
			description: "Tổ chức hội chợ cho toàn trường",
			image: "https://files.catbox.moe/hztpej.jpg?height=400&width=600",
		},
		{
			month: "Tháng 3",
			title: "Ngày Quốc Tế Phụ Nữ",
			description:
				"Các bạn nam đã tặng hoa và thiệp cho các bạn nữ trong lớp nhân ngày 8/3.",
			image: "https://files.catbox.moe/jki3q0.jpg?height=400&width=600",
		},
		{
			month: "Tháng 4",
			title: "Tham quan, dã ngoại tới K9 và Đảo Ngọc Xanh",
			description:
				"Lớp mình đã tham gia một chuyến dã ngoại để tìm hiểu lịch sử cũng như thư giãn sau một kỳ thi vất vả",
			image: "https://files.catbox.moe/7e9jlo.jpg?height=400&width=600",
		},
	],
};

// Hàm đảm bảo thư mục data tồn tại
async function ensureDataDirectoryExists() {
	const dataDir = path.join(process.cwd(), "data");
	try {
		await fs.access(dataDir);
	} catch (error) {
		await fs.mkdir(dataDir, { recursive: true });
		console.log(`Created directory: ${dataDir}`);
	}
}

// Hàm đảm bảo file JSON tồn tại
async function ensureFileExists(filePath: string, defaultData: any) {
	try {
		await fs.access(filePath);
	} catch (error) {
		// Đảm bảo thư mục data tồn tại
		await ensureDataDirectoryExists();

		// Tạo file với dữ liệu mặc định
		await fs.writeFile(
			filePath,
			JSON.stringify(defaultData, null, 2),
			"utf8",
		);
		console.log(`Created file: ${filePath}`);
	}
}

// Hàm đọc file JSON với xử lý lỗi
async function readTimelineFile() {
	try {
		// Đảm bảo file tồn tại
		await ensureFileExists(timelineFilePath, defaultTimelineData);

		// Đọc và parse file JSON
		const fileData = await fs.readFile(timelineFilePath, "utf8");
		const data = JSON.parse(fileData);

		// Đảm bảo events là một mảng
		return {
			events: Array.isArray(data.events)
				? data.events
				: defaultTimelineData.events,
		};
	} catch (error) {
		console.error(`Error reading ${timelineFilePath}:`, error);
		return defaultTimelineData;
	}
}

export default async function TimelinePage() {
	try {
		// Đọc dữ liệu từ file JSON
		const timelineData = await readTimelineFile();

		return <ClientTimelinePage events={timelineData.events} />;
	} catch (error) {
		console.error("Error in Timeline page:", error);
		// Trả về phiên bản fallback nếu có lỗi
		return <ClientTimelinePage events={[]} />;
	}
}
