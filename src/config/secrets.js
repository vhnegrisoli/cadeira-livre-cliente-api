const env = process.env;
export const MONGO_DB_CONNECTION =
  env.NODE_ENV == "development"
    ? "mongodb://localhost:27017/dashboard_realtime"
    : env.MONGO_DB_CONNECTION;
export const RABBIT_MQ_CONNECTION =
  env.NODE_ENV == "development"
    ? "amqp://localhost:5672"
    : env.RABBIT_MQ_CONNECTION;
export const APPLICATION_SECRET =
  env.NODE_ENV == "development"
    ? "Y2FkZWlyYS1saXZyZS11c3VhcmlvLWFwaS1kZXNlbnZvbHZpbWVudG8="
    : env.APPLICATION_SECRET;
