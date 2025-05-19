import { promises as fs } from "fs"
import path from "path"
import ClientTimelinePage from "@/components/client-timeline-page"

// Đường dẫn đến file JSON
const timelineFilePath = path.join(process.cwd(), "data", "timeline.json")

// Dữ liệu mặc định cho timeline
const defaultTimelineData = {
  events: [
    {
      month: "Tháng 9",
      title: "Khai Giảng",
      description: "Ngày đầu tiên của năm học mới, gặp lại bạn bè sau kỳ nghỉ hè.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      month: "Tháng 10",
      title: "Ngày Phụ Nữ Việt Nam",
      description: "Các bạn nam đã chuẩn bị thiệp và quà tặng cho cô giáo nhân ngày 20/10.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      month: "Tháng 11",
      title: "Ngày Nhà Giáo Việt Nam",
      description: "Tổ chức văn nghệ và tặng hoa tri ân thầy cô giáo.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      month: "Tháng 12",
      title: "Kiểm Tra Học Kỳ I & Noel",
      description: "Tháng của những bài kiểm tra cuối kỳ I và không khí Giáng sinh.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      month: "Tháng 1-2",
      title: "Tết Nguyên Đán",
      description: "Nghỉ Tết và đón năm mới cùng gia đình.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      month: "Tháng 3",
      title: "Ngày Quốc Tế Phụ Nữ",
      description: "Các bạn nam đã tặng hoa và thiệp cho các bạn nữ trong lớp nhân ngày 8/3.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      month: "Tháng 4",
      title: "Hoạt Động Ngoài Trời",
      description:
        "Lớp mình đã tham gia một chuyến dã ngoại ngắn để thư giãn trước khi bước vào giai đoạn ôn tập cuối năm.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      month: "Tháng 5",
      title: "Tổng Kết - Bế Giảng",
      description: "Kết thúc năm học với lễ bế giảng và trao thưởng.",
      image: "/placeholder.svg?height=400&width=600",
    },
  ],
}

// Hàm đảm bảo thư mục data tồn tại
async function ensureDataDirectoryExists() {
  const dataDir = path.join(process.cwd(), "data")
  try {
    await fs.access(dataDir)
  } catch (error) {
    await fs.mkdir(dataDir, { recursive: true })
    console.log(`Created directory: ${dataDir}`)
  }
}

// Hàm đảm bảo file JSON tồn tại
async function ensureFileExists(filePath: string, defaultData: any) {
  try {
    await fs.access(filePath)
  } catch (error) {
    // Đảm bảo thư mục data tồn tại
    await ensureDataDirectoryExists()

    // Tạo file với dữ liệu mặc định
    await fs.writeFile(filePath, JSON.stringify(defaultData, null, 2), "utf8")
    console.log(`Created file: ${filePath}`)
  }
}

// Hàm đọc file JSON với xử lý lỗi
async function readTimelineFile() {
  try {
    // Đảm bảo file tồn tại
    await ensureFileExists(timelineFilePath, defaultTimelineData)

    // Đọc và parse file JSON
    const fileData = await fs.readFile(timelineFilePath, "utf8")
    const data = JSON.parse(fileData)

    // Đảm bảo events là một mảng
    return {
      events: Array.isArray(data.events) ? data.events : defaultTimelineData.events,
    }
  } catch (error) {
    console.error(`Error reading ${timelineFilePath}:`, error)
    return defaultTimelineData
  }
}

export default async function TimelinePage() {
  try {
    // Đọc dữ liệu từ file JSON
    const timelineData = await readTimelineFile()

    return <ClientTimelinePage events={timelineData.events} />
  } catch (error) {
    console.error("Error in Timeline page:", error)
    // Trả về phiên bản fallback nếu có lỗi
    return <ClientTimelinePage events={[]} />
  }
}
