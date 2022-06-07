import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTravelDto, FindTravelParams, UpdateTravelDto } from './dto';
import { Travel } from './travel.schema';
import { TravelService } from './travel.service';

@Controller({
  version: '1',
  path: 'travel',
})
export class TravelControllerV1 {
  constructor(private travelService: TravelService) {}

  @Post()
  async createTravel(
    @Body() createTravelDto: CreateTravelDto,
  ): Promise<Travel> {
    return this.travelService.create(createTravelDto);
  }

  @Get()
  async getTravels(): Promise<Travel[]> {
    return this.travelService.findAll();
  }

  @Get(':id')
  async getTravel(@Param() params: FindTravelParams): Promise<Travel> {
    return this.travelService.findOne(params.id);
  }

  @Patch(':id')
  async updateTravel(
    @Param() params: FindTravelParams,
    @Body() updateTravelDto: UpdateTravelDto,
  ): Promise<Travel> {
    return this.travelService.updateOne(params.id, updateTravelDto);
  }

  @Delete(':id')
  async deleteTravel(@Param() params: FindTravelParams): Promise<Travel> {
    return this.travelService.deleteOne(params.id);
  }
}
