import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Post } from './Post'
@Entity('admin')
export class Admin {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	username: string

	@Column()
	password: string

	@OneToMany(() => Post, (post) => post.author, { cascade: true })
	content_access: Post[]
}
