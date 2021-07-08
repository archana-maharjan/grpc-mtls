import { ClientOptions, Transport } from '@nestjs/microservices';
import { ServerCredentials } from 'grpc';
import { join } from 'path';
import * as fs from "fs";

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'hero',
    protoPath: join(__dirname, './hero/hero.proto'),
    // credentials: ServerCredentials.createInsecure()
    credentials: ServerCredentials.createSsl(
        fs.readFileSync(join(process.cwd(), 'certificates', 'server-cert.pem')),
        [
          {
            private_key: fs.readFileSync(
              join(process.cwd(), 'certificates', 'server-key.pem'),
            ),
            cert_chain: fs.readFileSync(
              join(process.cwd(), 'certificates', 'ca-cert.pem'),
            ),
          },
        ],
        true,
      )
  },
};
