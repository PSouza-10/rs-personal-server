import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	CreateDateColumn,
	ManyToOne,
} from 'typeorm'
import { Post } from './Post'
import { User } from './User'

@Entity('comment')
export class Comment {
	@PrimaryGeneratedColumn()
	id: number

	@Column('text')
	text: string

	@ManyToOne(() => User)
	author: User
	@ManyToOne(() => Post, (post) => post.comments)
	post: Post
	@CreateDateColumn()
	createdAt

	@UpdateDateColumn()
	updatedAt
}
