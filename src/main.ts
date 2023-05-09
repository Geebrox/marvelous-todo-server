import AppConfig from '@app/config';
import { AppModule } from '@app/module';
import fastifyMultipart from '@fastify/multipart';
import { PrismaService } from '@modules/prisma/prisma.service';
import { Logger, ValidationPipe } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter as Adapter,
  type NestFastifyApplication as App,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<App>(
    AppModule,
    new Adapter({ bodyLimit: 10 * 1024 * 1024 * 1024 })
  );
  const appConfig = app.get<ConfigType<typeof AppConfig>>(AppConfig.KEY);
  const { port, clientHost } = appConfig;

  app
    .useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      })
    )
    .setGlobalPrefix('/api')
    .register(fastifyMultipart, {
      addToBody: true,
      limits: { fileSize: 10 * 1024 * 1024 },
    });

  app.enableCors({ origin: [clientHost] });

  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(port, '0.0.0.0');
  const mode = process.env.NODE_ENV || 'development';

  Logger.log(
    `🚀 Server is running in ${mode} mode on port ${port}`,
    'Bootstrap'
  );
}

bootstrap();
