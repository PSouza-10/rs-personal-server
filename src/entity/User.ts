import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	CreateDateColumn,
} from 'typeorm'
import { Anamnesis } from './Anamnesis'

@Entity('user')
export class User {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	firstName: string

	@Column()
	lastName: string

	@Column()
	email: string

	@Column()
	password: string

	@Column({ nullable: true })
	phone: string

	@Column({ type: 'date', nullable: true })
	birth

	@Column({ default: false })
	emailVerified: boolean

	@Column({ type: 'jsonb', nullable: true })
	anamnesis: Anamnesis

	@CreateDateColumn()
	createdAt

	@UpdateDateColumn()
	updatedAt
}
