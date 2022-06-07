import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Travel {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  destination: string;

  @Prop({
    enum: ['breakfast', 'half-board', 'full-board', 'all-inclusive'],
    default: 'breakfast',
  })
  board: string;

  @Prop({ required: true, max: 10 })
  traveler: number;
}

export const TravelSchema = SchemaFactory.createForClass(Travel);

export type TravelDocument = Travel & Document;
