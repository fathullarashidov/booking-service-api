import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table
} from 'sequelize-typescript';
import { EventEntity } from '@/modules/event/entities/event.entity';

@Table({ tableName: 'book' })
export class BookEntity extends Model {
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

	@Column({ allowNull: false, type: DataType.INTEGER })
	declare people_quantity: number;

	@ForeignKey(() => EventEntity)
	@Column({
		type: DataType.UUID,
		allowNull: false
	})
	declare eventId: string;

	@BelongsTo(() => EventEntity)
	declare event: EventEntity;
}
