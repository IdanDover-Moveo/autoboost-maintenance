import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { whitelistIP } from './whitelist-ip.script';

@Module({})
export class DatabaseModule {
  static async forRootAsync(): Promise<DynamicModule> {
    // Perform your IP whitelisting logic
    const configService = new ConfigService();
    await whitelistIP(configService);

    // Now initialize MongooseModule
    return {
      module: DatabaseModule,
      imports: [
        MongooseModule.forRootAsync({
          imports: [],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            uri: configService.get<string>('MONGO_URL'),
          }),
        }),
      ],
    };
  }
}
