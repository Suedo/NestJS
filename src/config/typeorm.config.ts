import { TypeOrmModuleOptions } from '@nestjs/TypeOrm';
import * as config from 'config';

const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_PORT || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  // Initial startup can be true, to allow TypeOrm get DB tables up properly, and then onwards, freeze it by making it 'false'
  synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
};
