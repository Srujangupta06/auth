import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { userAccountStatus, userRole } from '../enum/user.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    type: String,
    trim: true,
    default:null, 
  })
  firstName: string;

  @Prop({
    type: String,
    trim: true,
    required: true,
  })
  lastName: string;

  @Prop({
    type: String,
    trim: true,
    required: true,
    unique:true,
    lowercase:true,
    index:true,
    sparse:true,
  })
  email: string;

  @Prop({
    required:true,
    type:String,
    minLength:8,
    trim:true,
  })
  password: string;

  @Prop({
    type:String,
    enum:userRole,
    default:userRole.USER
  }) 
  role: userRole; 

  @Prop({
    type:String,
    enum:userAccountStatus,
    default:userAccountStatus.ACTIVE
  })
  accountStatus: userAccountStatus
}

export const UserSchema = SchemaFactory.createForClass(User);
