import { Module } from '@nestjs/common';
import { RaresService } from './rares.service';
import { RaresController } from './rares.controller';

@Module({
  controllers: [RaresController],
  providers: [RaresService],
})
export class RaresModule {}
