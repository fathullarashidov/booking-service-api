import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table
} from 'sequelize-typescript';
import { MasterclassEntity } from '@/modules/masterclass/entities/masterclass.entity';
import { ShowForKidsEntity } from '@/modules/show-for-kids/entities/show-for-kid.entity';

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

	@Column({ allowNull: false, type: DataType.STRING })
	declare date: string;

	@Column({ allowNull: false, type: DataType.INTEGER })
	declare people_quantity: number;

	@Column({ allowNull: false, type: DataType.TEXT })
	declare status:
		| 'in process'
		| 'declined'
		| 'cancelled'
		| 'confirmed'
		| 'pending'
		| 'completed'
		| 'archived';

	@ForeignKey(() => MasterclassEntity)
	@Column({
		type: DataType.UUID,
		allowNull: false
	})
	declare masterclassId: string;

	@BelongsTo(() => MasterclassEntity)
	declare masterclass: MasterclassEntity;

	@ForeignKey(() => ShowForKidsEntity)
	@Column({
		type: DataType.UUID,
		allowNull: false
	})
	declare showForKidsId: string;

	@BelongsTo(() => ShowForKidsEntity)
	declare showForKids: ShowForKidsEntity;
}
