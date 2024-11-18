import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class RegisterInput {
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @Field()
  password: string;

  @IsString()
  @Field()
  fullName: string;
}
