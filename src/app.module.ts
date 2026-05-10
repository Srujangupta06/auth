import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_DB_URI'),
        connectionFactory: (conn) => {
          conn.on('connected', () => {
            console.log('DB CONNECTION: SUCCESSFUL');
          });

          conn.on('disconnected', () => {
            console.log('DB CONNECTION: DISCONNECTED');
          });

          conn.on('error', (err: string) => {
            console.log('DB CONNECTION: ERROR', err);
          });
          return conn;
        },
      }),
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
