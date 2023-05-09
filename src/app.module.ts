import AppConfig from '@app/config';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { TodoModule } from '@modules/todo/todo.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from '@utils/validation.utils';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      cache: true,
      load: [AppConfig],
      validate: validateEnv,
    }),
    PrismaModule,
    TodoModule,
  ],
})
export class AppModule {}
