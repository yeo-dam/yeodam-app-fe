import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import PostEntity from "data/entity/PostEntity";
import PlaceType from "domain/enum/PlaceType";
import ImageFileModel from "../ImageFileModel/model";
import PlaceModel from "../PlaceModel";
import UserModel from "../UserModel";
import CommentModel from "../CommentModel";
import { Type } from "class-transformer";

class PostModel implements PostEntity {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  user: UserModel;

  @IsEnum(PlaceModel)
  @IsNotEmpty()
  place: PlaceModel;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  @IsEnum(PlaceType)
  @IsNotEmpty()
  placeType: PlaceType;

  @Type(() => ImageFileModel)
  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty()
  images: ImageFileModel[];

  @Type(() => CommentModel)
  @IsArray()
  @IsOptional()
  comments?: CommentModel[];
}

export default PostModel;
