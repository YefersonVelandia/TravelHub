import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/database.js";

export enum ProductType {
  HOTEL = "HOTEL",
  ACTIVITY = "ACTIVITY",
  PACKAGE = "PACKAGE",
  TRANSPORT = "TRANSPORT",
}

interface BookingItemAttributes {
  id: string;
  bookingId: string;
  productType: ProductType;
  productId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  startDate: Date;
  endDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface BookingItemCreationAttributes extends Optional<
  BookingItemAttributes,
  "id" | "createdAt" | "updatedAt"
> {}

class BookingItem extends Model<BookingItemAttributes, BookingItemCreationAttributes> {
  declare id: string;
  declare bookingId: string;
  declare productType: ProductType;
  declare productId: string;
  declare description: string;
  declare quantity: number;
  declare unitPrice: number;
  declare totalAmount: number;
  declare startDate: Date;
  declare endDate: Date;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

BookingItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    bookingId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "booking_id",
    },

    productType: {
      type: DataTypes.ENUM(...Object.values(ProductType)),
      allowNull: false,
      field: "product_type",
    },

    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "product_id",
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },

    unitPrice: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      field: "unit_price",
      validate: {
        min: 0,
      },
    },

    totalAmount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      field: "total_amount",
      validate: {
        min: 0,
      },
    },

    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "start_date",
    },

    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "end_date",
    },
  },
  {
    sequelize,

    tableName: "booking_items",

    timestamps: true,

    underscored: true,
  },
);

export default BookingItem;
