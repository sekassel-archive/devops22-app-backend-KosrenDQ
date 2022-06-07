import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTravelDto, UpdateTravelDto } from './dto';
import { Travel, TravelDocument } from './travel.schema';

@Injectable()
export class TravelService {
  private logger: Logger = new Logger(TravelService.name);

  constructor(
    @InjectModel(Travel.name) private travelModel: Model<TravelDocument>,
  ) {
    this.logger.log('TravelService initialized');
  }

  async create(createTravelDto: CreateTravelDto): Promise<Travel> {
    return this.travelModel.create(createTravelDto);
  }

  async findAll(): Promise<Travel[]> {
    return this.travelModel.find().exec();
  }

  async findOne(id: string): Promise<Travel> {
    const doc: TravelDocument = await this.travelModel
      .findOne({ _id: id })
      .exec();

    if (!doc) {
      throw new NotFoundException();
    }
    return doc;
  }

  async updateOne(
    id: string,
    updateTravelDto: UpdateTravelDto,
  ): Promise<Travel> {
    const doc: TravelDocument = await this.travelModel
      .findOne({ _id: id })
      .exec();

    if (!doc) {
      throw new NotFoundException();
    }

    return this.travelModel.findOneAndUpdate({ _id: id }, updateTravelDto, {
      new: true,
    });
  }

  async deleteOne(id: string): Promise<Travel> {
    const doc: TravelDocument = await this.travelModel
      .findOne({ _id: id })
      .exec();

    if (!doc) {
      throw new NotFoundException();
    }

    return this.travelModel.findOneAndDelete({ _id: id }).exec();
  }
}
