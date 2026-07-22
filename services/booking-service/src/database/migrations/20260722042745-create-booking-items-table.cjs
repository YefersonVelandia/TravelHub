"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("booking_items", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
      },

      booking_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "bookings",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      product_type: {
        type: Sequelize.ENUM("HOTEL", "ACTIVITY", "PACKAGE", "TRANSPORT"),
        allowNull: false,
      },

      product_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      unit_price: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },

      total_amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },

      start_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },

      end_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
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

    await queryInterface.addIndex("booking_items", ["booking_id"], {
      name: "idx_booking_items_booking_id",
    });

    await queryInterface.addIndex("booking_items", ["product_type", "product_id"], {
      name: "idx_booking_items_product_type_product_id",
    });

    // Restricciones

    await queryInterface.sequelize.query(`
      ALTER TABLE booking_items
      ADD CONSTRAINT chk_booking_items_quantity
      CHECK (quantity > 0);
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE booking_items
      ADD CONSTRAINT chk_booking_items_unit_price
      CHECK (unit_price >= 0);
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE booking_items
      ADD CONSTRAINT chk_booking_items_total_amount
      CHECK (total_amount >= 0);
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE booking_items
      ADD CONSTRAINT chk_booking_items_date_range
      CHECK (end_date >= start_date);
    `);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("booking_items");

    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_booking_items_product_type";');
  },
};
