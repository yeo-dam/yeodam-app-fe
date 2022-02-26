import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";
import CommentEntity from "~data/entity/CommentEntity";
import UserModel from "../UserModel/model";

class CommentModel implements CommentEntity {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @Type(() => UserModel)
  @IsNotEmpty()
  user: UserModel;

  @IsDate()
  @IsNotEmpty()
  createDateTime: Date;
}

export default CommentModel;
