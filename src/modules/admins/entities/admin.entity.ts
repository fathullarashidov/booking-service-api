import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'admins' })
export class AdminEntity extends Model {
	@Column({
		type: DataType.UUID,
		primaryKey: true,
		defaultValue: DataType.UUIDV4
	})
	declare id: string;

	@Column({ allowNull: false, type: DataType.STRING, unique: true })
	declare username: string;

	@Column({ allowNull: false, type: DataType.STRING })
	declare password: string;
}
