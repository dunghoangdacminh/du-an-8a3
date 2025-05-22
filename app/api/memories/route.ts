import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import type { MemoryInput } from "@/lib/models/memory"

// API route to get all memories
export async function GET() {
	try {
		const client = await clientPromise
		const db = client.db("graduation")

		// Get all memories, sorted by newest first
		const memories = await db.collection("memories").find({}).sort({ _id: -1 }).toArray()

		return NextResponse.json({ memories })
	} catch (error) {
		console.error("Error in GET /api/memories:", error)
		return NextResponse.json(
			{ error: "Failed to fetch memories", details: error instanceof Error ? error.message : String(error) },
			{ status: 500 },
		)
	}
}

// API route to add a new memory
export async function POST(request: Request) {
	try {
		const memoryData: MemoryInput = await request.json()

		const client = await clientPromise
		const db = client.db("graduation")

		// Insert the new memory
		const result = await db.collection("memories").insertOne(memoryData)

		// Return the newly created memory with its ID
		const newMemory = {
			...memoryData,
			_id: result.insertedId,
		}

		return NextResponse.json(newMemory, { status: 201 })
	} catch (error) {
		console.error("Error in POST /api/memories:", error)
		return NextResponse.json(
			{ error: "Failed to add new memory", details: error instanceof Error ? error.message : String(error) },
			{ status: 500 },
		)
	}
}
