import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table
} from 'sequelize-typescript';
import { MediaEntity } from '@/modules/media/entities/media.entity';
import { ArrayMinSize, IsArray, IsString } from 'class-validator';

@Table({ tableName: 'events' })
export class EventEntity extends Model {
	@Column({
		type: DataType.UUID,
		primaryKey: true,
		defaultValue: DataType.UUIDV4,
		allowNull: false
	})
	declare id: string;

	@ForeignKey(() => MediaEntity)
	@Column({
		type: DataType.UUID,
		allowNull: false
	})
	declare mediaId: string;

	@BelongsTo(() => MediaEntity)
	declare media: MediaEntity;

	@Column({ allowNull: false, type: DataType.STRING })
	declare type: string;

	@Column({
		type: DataType.DECIMAL(10, 2),
		allowNull: false,
		get() {
			return parseFloat(this.getDataValue('cost'));
		}
	})
	declare cost: number;

	@Column({ allowNull: false, type: DataType.STRING })
	declare date: string;

	@Column({ allowNull: false, type: DataType.STRING })
	declare time: string;

	@Column({ allowNull: false, type: DataType.TEXT })
	declare main_title: string;

	@Column({ allowNull: false, type: DataType.TEXT })
	declare main_description: string;

	@Column({ allowNull: false, type: DataType.TEXT })
	declare card_title: string;

	@Column({
		type: DataType.ARRAY(DataType.TEXT),
		allowNull: false,
		defaultValue: []
	})
	@IsArray()
	@IsString({ each: true })
	@ArrayMinSize(1)
	declare paragraph: string[];

	@Column({ allowNull: false, type: DataType.TEXT })
	declare motivation: string;

	@Column({ allowNull: true, type: DataType.BOOLEAN, defaultValue: true })
	declare is_visible: boolean;
}
