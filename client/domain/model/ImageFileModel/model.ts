import FileModel from "../FileModel/model";
import { IsNotEmpty, IsNumber } from "class-validator";

class ImageFileModel extends FileModel {
  @IsNumber()
  @IsNotEmpty()
  width: number;

  @IsNumber()
  @IsNotEmpty()
  height: number;
}

export default ImageFileModel;
