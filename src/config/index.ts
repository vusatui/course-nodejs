import dotenv from "dotenv";

dotenv.config();

export default {
    expressPort: process.env.EXPRESS_PORT,
    api: {
      v1: {
        prefix: process.env.API_V1_PREFIX,
      },
    },
};
