import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'contact_us' })
export class ContactUsEntity extends Model {
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
		validate: { isEmail: { msg: 'Enter email in correct format' } }
	})
	declare email: string;

	@Column({ allowNull: false, type: DataType.STRING })
	declare phone_number: string;

	@Column({ allowNull: false, type: DataType.STRING })
	declare getting_touch: string;

	@Column({ allowNull: false, type: DataType.TEXT })
	declare your_message: string;
}
