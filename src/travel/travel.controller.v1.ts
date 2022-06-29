import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthenticatedUser, Roles } from 'nest-keycloak-connect';
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
  @Roles({ roles: ['realm:admin', 'realm:user'] })
  async createTravel(
    @AuthenticatedUser() user: any,
    @Body() createTravelDto: CreateTravelDto,
  ): Promise<Travel> {
    return this.travelService.create(createTravelDto, user);
  }

  @Get()
  @Roles({ roles: ['realm:admin', 'realm:user'] })
  async getTravels(@AuthenticatedUser() user: any): Promise<Travel[]> {
    return this.travelService.findAll(user);
  }

  @Get(':id')
  @Roles({ roles: ['realm:admin', 'realm:user'] })
  async getTravel(@Param() params: FindTravelParams): Promise<Travel> {
    return this.travelService.findOne(params.id);
  }

  @Patch(':id')
  @Roles({ roles: ['realm:admin', 'realm:user'] })
  async updateTravel(
    @Param() params: FindTravelParams,
    @Body() updateTravelDto: UpdateTravelDto,
  ): Promise<Travel> {
    return this.travelService.updateOne(params.id, updateTravelDto);
  }

  @Delete(':id')
  @Roles({ roles: ['realm:admin', 'realm:user'] })
  async deleteTravel(@Param() params: FindTravelParams): Promise<Travel> {
    return this.travelService.deleteOne(params.id);
  }
}
