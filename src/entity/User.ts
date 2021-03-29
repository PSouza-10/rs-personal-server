import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	CreateDateColumn,
	OneToOne,
} from 'typeorm'

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

	@CreateDateColumn()
	createdAt

	@UpdateDateColumn()
	updatedAt
}
