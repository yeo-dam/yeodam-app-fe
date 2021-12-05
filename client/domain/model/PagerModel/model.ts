import { IsNotEmpty, IsNumber } from "class-validator";
export default class PagerModel {
  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsNumber()
  @IsNotEmpty()
  count: number;

  @IsNumber()
  @IsNotEmpty()
  limit: number;

  @IsNumber()
  @IsNotEmpty()
  offset: number;
}
