import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'show-for-kids' })
export class ShowForKidsEntity extends Model {
	@Column({
		type: DataType.UUID,
		primaryKey: true,
		defaultValue: DataType.UUIDV4,
		allowNull: false
	})
	declare id: string;

	@Column({ allowNull: false, type: DataType.STRING })
	declare title: string;

	@Column({ allowNull: false, type: DataType.TEXT })
	declare description: string;
}
