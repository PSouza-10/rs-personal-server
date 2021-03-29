export type NodeType =
	| 'Title'
	| 'Paragraph'
	| 'Image'
	| 'List'
	| 'Table'
	| 'Video'
export interface ListData {
	content?: string[] | string | string[][]
	numbered?: boolean
	type: 'List'
}

export interface TableData {
	content?: any
	type: 'Table'
}

export interface TitleData {
	content?: string
	textSize?: number
	type: 'Title'
}

export interface ParagraphData {
	content?: string
	type: 'Paragraph'
}

export interface ImageData {
	content?: string
	type: 'Image'
	srcType?: 'file' | 'link'
	service_id: string
	size?: string[]
}

export interface VideoData {
	content?: string
	type: 'Video'
}

export type NodeData =
	| TitleData
	| ParagraphData
	| ImageData
	| ListData
	| TableData
	| VideoData

export interface PostComponent {
	idx: number
	id: string
	data: NodeData
}
