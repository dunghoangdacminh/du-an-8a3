export interface Memory {
	_id?: string; // Changed from ObjectId to string
	id?: number;
	name: string;
	message: string;
	avatar: string;
	date: string;
}

export interface MemoryInput {
	name: string;
	message: string;
	avatar: string;
	date: string;
}
