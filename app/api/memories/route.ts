import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

// Đường dẫn đến thư mục data và file JSON
const dataDir = path.join(process.cwd(), "data")
const dataFilePath = path.join(dataDir, "memory-board.json")

// Cấu trúc dữ liệu mặc định khi tạo file mới
const defaultData = {
	memories: [],
}

// Hàm đảm bảo thư mục data tồn tại
function ensureDataDirectoryExists() {
	if (!fs.existsSync(dataDir)) {
		try {
			fs.mkdirSync(dataDir, { recursive: true })
			console.log(`Created directory: ${dataDir}`)
		} catch (error) {
			console.error(`Error creating directory ${dataDir}:`, error)
			throw new Error(`Could not create data directory: ${error}`)
		}
	}
}

// Hàm đảm bảo file JSON tồn tại
function ensureDataFileExists() {
	if (!fs.existsSync(dataFilePath)) {
		try {
			// Đảm bảo thư mục tồn tại trước
			ensureDataDirectoryExists()

			// Tạo file với dữ liệu mặc định
			fs.writeFileSync(dataFilePath, JSON.stringify(defaultData, null, 2), "utf8")
			console.log(`Created file: ${dataFilePath}`)
		} catch (error) {
			console.error(`Error creating file ${dataFilePath}:`, error)
			throw new Error(`Could not create data file: ${error}`)
		}
	}
}

// Hàm đọc dữ liệu từ file JSON
function readMemoriesFile() {
	try {
		// Đảm bảo file tồn tại
		ensureDataFileExists()

		const fileData = fs.readFileSync(dataFilePath, "utf8")
		return JSON.parse(fileData)
	} catch (error) {
		console.error("Error reading memories file:", error)

		// Nếu có lỗi khi đọc file (ví dụ: file bị hỏng), trả về dữ liệu mặc định
		return defaultData
	}
}

// Hàm ghi dữ liệu vào file JSON
function writeMemoriesFile(data: any) {
	try {
		// Đảm bảo thư mục tồn tại
		ensureDataDirectoryExists()

		fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8")
		return true
	} catch (error) {
		console.error("Error writing memories file:", error)
		return false
	}
}

// API route để lấy tất cả memories
export async function GET() {
	try {
		const data = readMemoriesFile()
		return NextResponse.json(data)
	} catch (error) {
		console.error("Error in GET /api/memories:", error)
		return NextResponse.json(
			{ error: "Failed to fetch memories", details: error instanceof Error ? error.message : String(error) },
			{ status: 500 },
		)
	}
}

// API route để thêm memory mới
export async function POST(request: Request) {
	try {
		const newMemory = await request.json()
		const data = readMemoriesFile()

		// Tìm ID lớn nhất hiện tại
		const maxId = data.memories.reduce((max: number, memory: any) => (memory.id > max ? memory.id : max), 0)

		// Thêm memory mới với ID tăng dần
		const memoryWithId = {
			...newMemory,
			id: maxId + 1,
		}

		// Thêm vào đầu mảng để hiển thị mới nhất trước
		data.memories.unshift(memoryWithId)

		// Ghi lại vào file
		const success = writeMemoriesFile(data)

		if (!success) {
			throw new Error("Failed to write to memories file")
		}

		return NextResponse.json(memoryWithId, { status: 201 })
	} catch (error) {
		console.error("Error in POST /api/memories:", error)
		return NextResponse.json(
			{ error: "Failed to add new memory", details: error instanceof Error ? error.message : String(error) },
			{ status: 500 },
		)
	}
}
