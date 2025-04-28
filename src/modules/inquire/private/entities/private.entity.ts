import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'private-inquire' })
export class PrivateInquireEntity extends Model {
	@Column({
		type: DataType.UUID,
		primaryKey: true,
		defaultValue: DataType.UUIDV4,
		allowNull: false
	})
	declare id: string;

	@Column({ allowNull: false, type: DataType.STRING })
	declare first_name: string;

	@Column({ allowNull: false, type: DataType.STRING })
	declare last_name: string;

	@Column({
		allowNull: false,
		type: DataType.STRING,
		validate: { isEmail: true }
	})
	declare email: string;

	@Column({ allowNull: false, type: DataType.STRING })
	declare phone_number: string;

	@Column({ allowNull: false, type: DataType.STRING })
	declare company_name: string;

	@Column({ allowNull: false, type: DataType.DATEONLY })
	declare date: Date;

	@Column({ allowNull: false, type: DataType.TIME })
	declare start_time: Date;

	@Column({ allowNull: false, type: DataType.TIME })
	declare end_time: Date;

	@Column({ allowNull: false, type: DataType.STRING })
	declare event_type: string;

	@Column({ allowNull: false, type: DataType.INTEGER })
	declare people_quantity: number;

	@Column({ allowNull: false, type: DataType.TEXT })
	declare additional_info: string;

	@Column({ allowNull: false, type: DataType.TEXT })
	declare status:
		| 'in process'
		| 'declined'
		| 'cancelled'
		| 'confirmed'
		| 'pending'
		| 'completed'
		| 'archived';
}
