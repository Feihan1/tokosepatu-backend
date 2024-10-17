import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';

require('dotenv').config();

const sequelizeConfig: SequelizeModuleOptions = {
  dialect: process.env.DB_DIALECT as Dialect, // 'postgres'
  host: process.env.DB_HOST, // Alamat host database
  port: parseInt(process.env.DB_PORT, 10), // Port database
  username: process.env.DB_USERNAME, // Username database
  password: process.env.DB_PASSWORD, // Password database
  database: process.env.DB_NAME, // Nama database
  autoLoadModels: true,
  synchronize: true, // Hati-hati, ini akan menyinkronkan tabel di database
  logging: false,
  sync: {
    force: false, // WARNING: Jika true, tabel akan dihapus dan dibuat ulang setiap kali server dinyalakan
    alter: { drop: true }
  },
  define: {
    timestamps: true, // Menggunakan timestamp
    underscored: true, // Menggunakan format snake_case untuk kolom
  },
};

export const getJwtSecret = (): string | undefined => {
  return process.env.JWT_TOKEN; // Mengambil secret token dari variabel lingkungan
};

export default sequelizeConfig;
