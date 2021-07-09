import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import * as fs from "fs";
import { credentials, ServerCredentials } from '@grpc/grpc-js';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'hero',
    protoPath: join(__dirname, './hero/hero.proto'),
    credentials: credentials.createSsl(
      fs.readFileSync(join(process.cwd(), "certificates", "ca-cert.pem")), 
      fs.readFileSync(join(process.cwd(), "certificates", "server-key.pem")), 
      fs.readFileSync(join(process.cwd(), "certificates", "server-cert.pem")))
    // credentials: ServerCredentials.createSsl(
    //     fs.readFileSync(join(process.cwd(), 'certificates', 'ca-cert.pem')),
    //     [
    //       {
    //         private_key: fs.readFileSync(
    //           join(process.cwd(), 'certificates', 'server-key.pem'),
    //         ),
    //         cert_chain: fs.readFileSync(
    //           join(process.cwd(), 'certificates', 'server-cert.pem'),
    //         ),
    //       },
    //     ],
    //     true,
    //   )
  },
};
