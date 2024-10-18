import { SequelizeModuleOptions } from '@nestjs/sequelize';
declare const sequelizeConfig: SequelizeModuleOptions;
export declare const getJwtSecret: () => string | undefined;
export default sequelizeConfig;
