import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'work_with_us' })
export class WorkWithUs extends Model {
	@Column({
		type: DataType.UUID,
		primaryKey: true,
		defaultValue: DataType.UUIDV4
	})
	declare id: string;

	@Column({ allowNull: false })
	declare first_name: string;

	@Column({ allowNull: false })
	declare phone_number: string;

	@Column({ allowNull: false })
	declare email: string;

	@Column({ type: DataType.TEXT, allowNull: false })
	declare cover_letter: string;

	@Column({ allowNull: false })
	declare originalName: string;

	@Column({ allowNull: false })
	declare fileName: string;

	@Column({ allowNull: false })
	declare path: string;

	@Column({ type: DataType.INTEGER, allowNull: false })
	declare size: number;

	@Column({ allowNull: false })
	declare mimeType: string;
}
