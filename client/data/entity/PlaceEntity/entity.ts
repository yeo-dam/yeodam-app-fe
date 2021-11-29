import PlaceType from "domain/enum/PlaceType";

export default interface Entity {
  id: string;
  type: PlaceType;
}
