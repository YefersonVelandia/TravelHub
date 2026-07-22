import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/database.js";

interface IdempotencyKeyAttributes {
  id: string;
  key: string;
  bookingId: string;
  expiresAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CreationAttributes extends Optional<
  IdempotencyKeyAttributes,
  "id" | "expiresAt" | "createdAt" | "updatedAt"
> {}

class IdempotencyKey extends Model<IdempotencyKeyAttributes, CreationAttributes> {
  declare id: string;
  declare key: string;
  declare bookingId: string;
  declare expiresAt: Date | null;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

IdempotencyKey.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    key: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },

    bookingId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "booking_id",

      unique: true,
    },

    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "expires_at",
    },
  },
  {
    sequelize,
    tableName: "idempotency_keys",
    timestamps: true,
    underscored: true,
  },
);

export default IdempotencyKey;
