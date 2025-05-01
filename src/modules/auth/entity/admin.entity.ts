import { BeforeCreate, Column, Model, Table } from 'sequelize-typescript';
import * as bcrypt from 'bcryptjs';

@Table({ tableName: 'admins' })
export class Admin extends Model {
	@Column({ primaryKey: true, autoIncrement: true })
	declare id: number;

	@Column({ unique: true, allowNull: false })
	declare username: string;

	@Column({ allowNull: false })
	declare password: string;

	@BeforeCreate
	static async hashPassword(admin: Admin) {
		admin.password = await bcrypt.hash(admin.password, 10);
	}
}
