import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'feedbacks' })
export class FeedbackEntity extends Model {
	@Column({
		type: DataType.UUID,
		primaryKey: true,
		defaultValue: DataType.UUIDV4,
		allowNull: false
	})
	declare id: string;

	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	declare first_name: string;

	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	declare last_name: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
		validate: { isEmail: true }
	})
	declare email: string;

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		validate: { min: 1, max: 10 }
	})
	declare rate: number;

	@Column({
		type: DataType.TEXT,
		allowNull: true
	})
	declare additional_info: string;
}
