import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'db.sqlite',
  autoLoadEntities: true,
  synchronize: true,
};
export const myDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
});
