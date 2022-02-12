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
import { Exclude, Type } from "class-transformer";
import TransformDate from "helper/TransformDate";
import TagModel from "../TagModel";
import { observable } from "mobx";

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

  @ValidateNested({ each: true })
  @Type(() => TagModel)
  @IsOptional()
  tags?: TagModel[];

  // TODO : 여러 count 추가 : LikeCount, CommentCount, isReported 등등

  @observable
  @Exclude()
  isFront: boolean;

  @Exclude()
  setFront = (data: boolean) => {
    this.isFront = data;
    return this.isFront;
  };
}

export default PostModel;
