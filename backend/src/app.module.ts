import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaAppointmentsRepository } from './repositories/prisma/prisma-appointments-repository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: 'AppointmentsRepository',
      useClass: PrismaAppointmentsRepository,
    },
    AppService,
  ],
})
export class AppModule {}
