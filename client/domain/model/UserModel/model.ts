import { Type } from "class-transformer";
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import UserEntity from "data/entity/UserEntity";
import ProviderType from "domain/enum/ProviderType";
import UserMbtiType from "domain/enum/UserMbtiType";
import ImageFileModel from "../ImageFileModel";

export default class UserModel implements UserEntity {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsEnum(UserMbtiType)
  @IsNotEmpty()
  userType: UserMbtiType;

  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @IsEnum(ProviderType)
  @IsOptional()
  providerType?: ProviderType;

  @Type(() => ImageFileModel)
  @IsOptional()
  avatar?: ImageFileModel;
}
