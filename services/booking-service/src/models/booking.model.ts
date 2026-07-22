import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/database.js";

export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  REFUNDED = "REFUNDED",
  PARTIALLY_PAID = "PARTIALLY_PAID",
  FAILED = "FAILED",
}

interface BookingAttributes {
  id: string;
  locator: string;
  customerId: string;
  createdByUserId?: string | null;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  subtotal: number;
  taxes: number;
  totalAmount: number;
  paidAmount: number;
  currency: string;
  passengerQuantity: number;
  roomQuantity: number;
  observations?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface BookingCreationAttributes extends Optional<
  BookingAttributes,
  "id" | "createdByUserId" | "observations" | "ipAddress" | "userAgent" | "createdAt" | "updatedAt"
> {}

class Booking
  extends Model<BookingAttributes, BookingCreationAttributes>
  implements BookingAttributes
{
  declare id: string;
  declare locator: string;
  declare customerId: string;
  declare createdByUserId: string | null;
  declare status: BookingStatus;
  declare paymentStatus: PaymentStatus;
  declare subtotal: number;
  declare taxes: number;
  declare totalAmount: number;
  declare paidAmount: number;
  declare currency: string;
  declare passengerQuantity: number;
  declare roomQuantity: number;
  declare observations: string | null;
  declare ipAddress: string | null;
  declare userAgent: string | null;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Booking.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    locator: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    customerId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "customer_id",
    },

    createdByUserId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: "created_by_user_id",
    },

    status: {
      type: DataTypes.ENUM(...Object.values(BookingStatus)),
      allowNull: false,
    },

    paymentStatus: {
      type: DataTypes.ENUM(...Object.values(PaymentStatus)),
      allowNull: false,
      field: "payment_status",
    },

    subtotal: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },

    taxes: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
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

    paidAmount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
      field: "paid_amount",
      validate: {
        min: 0,
      },
    },

    currency: {
      type: DataTypes.CHAR(3),
      allowNull: false,
    },

    passengerQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "passenger_quantity",
      validate: {
        min: 1,
      },
    },

    roomQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: "room_quantity",
      validate: {
        min: 0,
      },
    },

    observations: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    ipAddress: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "ip_address",
    },

    userAgent: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "user_agent",
    },
  },

  {
    sequelize,
    tableName: "bookings",
    timestamps: true,
    underscored: true,
  },
);

export default Booking;
