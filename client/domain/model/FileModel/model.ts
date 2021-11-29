import { IsBoolean, IsDate, IsNotEmpty, IsString } from "class-validator";

class FileModel {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;

  @IsString()
  @IsNotEmpty()
  bucket: string;

  @IsBoolean()
  @IsNotEmpty()
  resizable: boolean;

  @IsBoolean()
  @IsNotEmpty()
  downloadable: boolean;

  @IsString()
  @IsNotEmpty()
  filePath: string;

  @IsString()
  @IsNotEmpty()
  filename: string;
}

export default FileModel;
