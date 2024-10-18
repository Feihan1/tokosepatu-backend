"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJwtSecret = void 0;
require('dotenv').config();
const sequelizeConfig = {
    dialect: process.env.DB_DIALECT,
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
            require: true,
            rejectUnauthorized: false,
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
const getJwtSecret = () => {
    return process.env.JWT_TOKEN;
};
exports.getJwtSecret = getJwtSecret;
exports.default = sequelizeConfig;
//# sourceMappingURL=db.config.js.map