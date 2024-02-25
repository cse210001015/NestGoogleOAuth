import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleModule } from './auth/google.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [GoogleModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
