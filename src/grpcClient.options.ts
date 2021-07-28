import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import * as fs from 'fs';
import { ServerCredentials } from '@grpc/grpc-js';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'hero',
    protoPath: join(__dirname, './hero/hero.proto'),
    credentials: ServerCredentials.createSsl(
      fs.readFileSync(join(process.cwd(), 'certificates', 'ca.cert')),
      [
        {
          private_key: fs.readFileSync(
            join(process.cwd(), 'certificates', 'service.key'),
          ),
          cert_chain: fs.readFileSync(
            join(process.cwd(), 'certificates', 'service.pem'),
          ),
        },
      ],
      true,
    ),
  },
};
