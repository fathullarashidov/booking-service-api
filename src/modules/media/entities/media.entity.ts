import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'media' })
export class MediaEntity extends Model {
	@Column({
		type: DataType.UUID,
		primaryKey: true,
		defaultValue: DataType.UUIDV4
	})
	declare id: string;

	@Column({ type: DataType.STRING, allowNull: false })
	declare originalName: string;

	@Column({ type: DataType.STRING, allowNull: false })
	declare fileName: string;

	@Column({ type: DataType.STRING, allowNull: false })
	declare path: string;

	@Column({ type: DataType.INTEGER, allowNull: false })
	declare size: number;

	@Column({ type: DataType.STRING, allowNull: false })
	declare mimeType: string;
}
