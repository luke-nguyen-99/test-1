import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'user',
  timestamps: true,
})
export class User {
  @Prop({ unique: true })
  email: string;
  @Prop({ select: false })
  password: string;
  @Prop()
  role: string;
  @Prop()
  name: string;
  @Prop()
  phone: string;
  @Prop()
  address: string;
  @Prop()
  description: string;
  @Prop()
  point: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
