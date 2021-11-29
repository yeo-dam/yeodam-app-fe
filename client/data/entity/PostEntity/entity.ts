import PlaceType from "domain/enum/PlaceType";
import CommentEntity from "../CommentEntity";
import ImageFileEntity from "../ImageFileEntity";

export default interface Entity {
  id: string;
  user: {
    id: string;
  };
  place: {
    id: string;
  };
  title: string;
  description: string;
  createdAt: Date;
  updatedAt?: Date;
  placeType: PlaceType;
  images: ImageFileEntity[];
  comments?: CommentEntity[];
}
