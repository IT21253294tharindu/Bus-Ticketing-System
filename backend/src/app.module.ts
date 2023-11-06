import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './controllers/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './config/guards/auth.guard';
import { BusRouteModule } from './controllers/bus-route/bus-route.module';
import { BusModule } from './controllers/bus/bus.module';
import { TimeTableModule } from './controllers/time-table/time-table.module';
import { BusSheduleModule } from './controllers/bus-shedule/bus-shedule.module';
import { UserModule } from './controllers/user/user.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule,
    BusRouteModule,
    BusModule,
    TimeTableModule,
    BusSheduleModule,
    UserModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
  ],
  controllers: [AppController],
  //providers: [AppService],
  providers: [AppService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
