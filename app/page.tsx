import { promises as fs } from "fs"
import path from "path"
import ClientHomePage from "@/components/client-home-page"

// Đường dẫn đến các file JSON
const memoriesFilePath = path.join(process.cwd(), "data", "memory-board.json")
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
      month: "Tháng 11",
      title: "Ngày Nhà Giáo Việt Nam",
      description: "Tổ chức văn nghệ và tặng hoa tri ân thầy cô giáo.",
      image: "/placeholder.svg?height=400&width=600",
    },
  ],
}

// Dữ liệu mặc định cho memories
const defaultMemoriesData = {
  memories: [],
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
async function readJsonFile(filePath: string, defaultData: any) {
  try {
    // Đảm bảo file tồn tại
    await ensureFileExists(filePath, defaultData)

    // Đọc và parse file JSON
    const fileData = await fs.readFile(filePath, "utf8")
    return JSON.parse(fileData)
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error)
    return defaultData
  }
}

export default async function Home() {
  try {
    // Đọc dữ liệu từ các file JSON
    const memoriesData = await readJsonFile(memoriesFilePath, defaultMemoriesData)
    const timelineData = await readJsonFile(timelineFilePath, defaultTimelineData)

    // Đảm bảo memories là một mảng
    const memories = Array.isArray(memoriesData.memories) ? memoriesData.memories : []

    // Đảm bảo events là một mảng
    const events = Array.isArray(timelineData.events) ? timelineData.events : []

    // Lấy 2 lưu bút mới nhất để hiển thị trên trang chủ
    const latestMemories = memories.slice(0, 2)

    // Lấy 2 sự kiện đầu tiên từ timeline
    const featuredEvents = events.slice(0, 2)

    return <ClientHomePage latestMemories={latestMemories} featuredEvents={featuredEvents} />
  } catch (error) {
    console.error("Error in Home page:", error)
    // Trả về phiên bản fallback nếu có lỗi
    return <ClientHomePage latestMemories={[]} featuredEvents={[]} />
  }
}
