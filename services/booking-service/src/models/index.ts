import Booking from "./booking.model.js";
import BookingItem from "./booking-item.model.js";
import IdempotencyKey from "./idempotency-key.model.js";

// Booking -> BookingItem
Booking.hasMany(BookingItem, {
  foreignKey: "bookingId",
  as: "items",
});

BookingItem.belongsTo(Booking, {
  foreignKey: "bookingId",
  as: "booking",
});

// Booking -> IdempotencyKey
Booking.hasOne(IdempotencyKey, {
  foreignKey: "bookingId",
  as: "idempotencyKey",
});

IdempotencyKey.belongsTo(Booking, {
  foreignKey: "bookingId",
  as: "booking",
});

export { Booking, BookingItem, IdempotencyKey };
