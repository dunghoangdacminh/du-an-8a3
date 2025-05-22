import type { ObjectId } from "mongodb"

export interface Memory {
	_id?: ObjectId
	id?: number
	name: string
	message: string
	avatar: string
	date: string
}

export interface MemoryInput {
	name: string
	message: string
	avatar: string
	date: string
}
