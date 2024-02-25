import { Module } from '@nestjs/common';
import config from '../config';
import { ConfigModule } from '@nestjs/config';
import { GoogleService } from './google.service';
import { GoogleController } from './google.controller';
import { UserModule } from 'src/users/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    JwtModule.register({
      signOptions: { expiresIn: '600s' },
    }),
    UserModule,
  ],
  providers: [GoogleService],
  controllers: [GoogleController],
})
export class GoogleModule {}
