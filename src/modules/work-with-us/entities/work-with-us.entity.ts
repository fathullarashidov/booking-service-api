import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'work_with_us' })
export class WorkWithUs extends Model {
	@Column({
		primaryKey: true,
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4
	})
	declare id: string;

	@Column({ allowNull: false })
	declare first_name: string;

	@Column({ allowNull: false })
	declare phone_number: string;

	@Column({ allowNull: false })
	declare email: string;

	@Column({ type: 'TEXT', allowNull: false })
	declare cover_letter: string;

	@Column({ allowNull: false })
	declare resume: string;
}
