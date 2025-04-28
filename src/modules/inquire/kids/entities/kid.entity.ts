import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'kid-inquire' })
export class KidInquireEntity extends Model {
	@Column({
		type: DataType.UUID,
		primaryKey: true,
		defaultValue: DataType.UUIDV4,
		allowNull: false
	})
	declare id: string;

	@Column({ allowNull: false, type: DataType.STRING })
	declare first_name: string;

	@Column({
		allowNull: false,
		type: DataType.STRING,
		validate: { isEmail: true }
	})
	declare email: string;

	@Column({ allowNull: false, type: DataType.STRING })
	declare phone_number: string;

	@Column({ allowNull: false, type: DataType.DATEONLY })
	declare date: Date;

	@Column({ allowNull: false, type: DataType.INTEGER })
	declare people_quantity: number;

	@Column({ allowNull: false, type: DataType.STRING })
	declare masterclass_type: string;

	@Column({ allowNull: false, type: DataType.TEXT })
	declare show_type: string;

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
