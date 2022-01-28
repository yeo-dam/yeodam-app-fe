import { Transform } from "class-transformer";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import PlaceType from "../../enum/PlaceType";

class PlaceModel {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsEnum(PlaceType)
  @IsNotEmpty()
  type: PlaceType;

  @IsString()
  @IsNotEmpty()
  address: string;
}

export default PlaceModel;
