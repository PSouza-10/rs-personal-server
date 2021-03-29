import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	CreateDateColumn,
	ManyToOne,
} from 'typeorm'
import { PostComponent } from '../types'
import { Admin } from './Admin'
import { Comment } from './Comment'

@Entity('post')
export class Post {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	title: string

	@Column()
	description: string

	@Column({
		type: 'jsonb',
	})
	data: PostComponent[]

	@Column({ nullable: true })
	tags: string

	@Column({ default: false })
	public: boolean

	@Column({
		type: 'jsonb',
		default: {
			url: '',
			srcId: 0,
		},
		nullable: true,
	})
	thumbnail: {
		url?: string
		srcId?: string
		data?: string
	}

	@Column({ nullable: true, default: false })
	requires_membership: boolean

	@Column({ type: 'jsonb', nullable: true })
	comments: Comment[]

	@Column({ default: 0 })
	likes: number

	@ManyToOne(() => Admin, (admin) => admin.content_access)
	author: Admin

	@CreateDateColumn()
	createdAt

	@UpdateDateColumn()
	updatedAt
}
