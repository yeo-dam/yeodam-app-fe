import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import PostEntity from "~data/entity/PostEntity";
import ImageFileModel from "~domain/model/ImageFileModel/model";
import PlaceModel from "~domain/model/PlaceModel";
import UserModel from "~domain/model/UserModel";
import CommentModel from "~domain/model/CommentModel";
import { Type } from "class-transformer";
import TransformDate from "helper/transformDate";

class PostModel implements PostEntity {
  @IsString()
  @IsNotEmpty()
  id: string;

  @ValidateNested()
  @Type(() => UserModel)
  @IsNotEmpty()
  user: UserModel;

  @ValidateNested()
  @Type(() => PlaceModel)
  @IsNotEmpty()
  place: PlaceModel;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDate()
  @TransformDate()
  @IsNotEmpty()
  createdAt: Date;

  @IsDate()
  @TransformDate()
  @IsOptional()
  updatedAt?: Date;

  @ValidateNested({ each: true })
  @Type(() => ImageFileModel)
  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty()
  images: ImageFileModel[];

  @ValidateNested({ each: true })
  @Type(() => CommentModel)
  @IsArray()
  @IsOptional()
  comments?: CommentModel[];
}

export default PostModel;
