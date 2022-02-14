import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import PlaceType from "../../enum/PlaceType";

class PlaceModel {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(PlaceType)
  @IsNotEmpty()
  type: PlaceType;

  @IsNumber()
  @IsNotEmpty()
  latitude: number;
  @IsNumber()
  @IsNotEmpty()
  longitude: number;
}

export default PlaceModel;
