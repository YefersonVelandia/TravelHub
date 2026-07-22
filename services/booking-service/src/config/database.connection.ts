import { sequelize } from "./database.js";

export const connectDatabase = async (): Promise<void> => {
  try {
    await sequelize.authenticate();

    console.log("✅ Database connection established");
  } catch (error) {
    console.error("❌ Database connection failed");

    if (error instanceof Error) {
      console.error(error.message);
    }

    process.exit(1);
  }
};
