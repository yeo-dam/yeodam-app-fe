import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
import PostModel from "../PostModel/model";

class DiaryModel {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @Type(() => PostModel)
  @IsNotEmpty()
  posts: PostModel[];

  @IsDate()
  @IsNotEmpty()
  createAt: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}

export default DiaryModel;
