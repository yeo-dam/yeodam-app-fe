import PlaceType from "domain/enum/PlaceType";

export default interface Entity {
  id: string;
  type: PlaceType;
  name: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
}
