import { Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import UserModel from "../UserModel/model";

class CommentModel {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @Type(() => UserModel)
  @IsNotEmpty()
  user: UserModel;

  // TODO : 변경사항
}

export default CommentModel;
