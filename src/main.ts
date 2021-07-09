import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { grpcClientOptions } from './grpcClient.options';

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
  );
  app.enableCors({
    origin: false,
  });

  app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);
  await app.startAllMicroservices();
  const port = 3131;
  console.log('app about to listen at port::::', port);
  await app.listen(port, '0.0.0.0'); //Fastify listens only on the localhost 127.0.0.1, adding 0.0.0.0 to accept connections on other hosts.
}
bootstrap();
