import { MigrationInterface, QueryRunner } from 'typeorm'

export class createSpecificUserInfo1617129962133 implements MigrationInterface {
	name = 'createSpecificUserInfo1617129962133'

	public async up(queryRunner: QueryRunner): Promise<void> {
		// await queryRunner.query(
		// 	`ALTER TABLE "user" ADD "emailVerified" boolean NOT NULL DEFAULT false`
		// )
		await queryRunner.query(`ALTER TABLE "user" ADD "anamnesis" jsonb`)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "anamnesis"`)
		// await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "emailVerified"`)
	}
}
