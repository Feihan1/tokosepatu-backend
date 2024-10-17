import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';

require('dotenv').config();

const sequelizeConfig: SequelizeModuleOptions = {
  dialect: process.env.DB_DIALECT as Dialect,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadModels: true,
  synchronize: true,
  logging: false,
  dialectOptions: {
    ssl: {
      require: true, // Enable SSL for Supabase connection
      rejectUnauthorized: false, // This is important for Supabase
    },
  },
  sync: {
    force: false,
    alter: { drop: false },
  },
  define: {
    timestamps: true,
    underscored: true,
  },
};

export const getJwtSecret = (): string | undefined => {
  return process.env.JWT_TOKEN; // Mengambil secret token dari variabel lingkungan
};

export default sequelizeConfig;
