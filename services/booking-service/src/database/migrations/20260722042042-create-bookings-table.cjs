"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("bookings", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
      },

      locator: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },

      customer_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },

      created_by_user_id: {
        type: Sequelize.UUID,
        allowNull: true,
      },

      status: {
        type: Sequelize.ENUM("PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"),
        allowNull: false,
      },

      payment_status: {
        type: Sequelize.ENUM("PENDING", "PAID","FAILED", "PARTIALLY_PAID", "REFUNDED"),
        allowNull: false,
      },

      subtotal: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },

      taxes: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },

      total_amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },

      paid_amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },

      currency: {
        type: Sequelize.CHAR(3),
        allowNull: false,
      },

      passenger_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      room_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      observations: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      ip_address: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      user_agent: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // Índices

    await queryInterface.addIndex("bookings", ["customer_id"], {
      name: "idx_bookings_customer_id",
    });

    await queryInterface.addIndex("bookings", ["status"], {
      name: "idx_bookings_status",
    });

    await queryInterface.addIndex("bookings", ["created_at"], {
      name: "idx_bookings_created_at",
    });

    // Restricciones

    await queryInterface.addConstraint("bookings", {
      fields: ["passenger_quantity"],
      type: "check",
      name: "chk_booking_passenger_quantity",
      where: {
        passenger_quantity: {
          [Sequelize.Op.gt]: 0,
        },
      },
    });

    await queryInterface.addConstraint("bookings", {
      fields: ["room_quantity"],
      type: "check",
      name: "chk_booking_room_quantity",
      where: {
        room_quantity: {
          [Sequelize.Op.gte]: 0,
        },
      },
    });

    await queryInterface.addConstraint("bookings", {
      fields: ["subtotal"],
      type: "check",
      name: "chk_booking_subtotal",
      where: {
        subtotal: {
          [Sequelize.Op.gte]: 0,
        },
      },
    });

    await queryInterface.addConstraint("bookings", {
      fields: ["taxes"],
      type: "check",
      name: "chk_booking_taxes",
      where: {
        taxes: {
          [Sequelize.Op.gte]: 0,
        },
      },
    });

    await queryInterface.addConstraint("bookings", {
      fields: ["total_amount"],
      type: "check",
      name: "chk_booking_total_amount",
      where: {
        total_amount: {
          [Sequelize.Op.gte]: 0,
        },
      },
    });

    await queryInterface.addConstraint("bookings", {
      fields: ["paid_amount"],
      type: "check",
      name: "chk_booking_paid_amount",
      where: {
        paid_amount: {
          [Sequelize.Op.gte]: 0,
        },
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("bookings");

    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_bookings_status";');

    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_bookings_payment_status";');
  },
};
