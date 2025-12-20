import { SQLDatabase } from "encore.dev/storage/sqldb";

export default new SQLDatabase("db3", {
  migrations: "./migrations",
});
