import { connectDatabase } from "./database";

const connection = await connectDatabase();
await connection.close();
console.log("Database is ready.");
