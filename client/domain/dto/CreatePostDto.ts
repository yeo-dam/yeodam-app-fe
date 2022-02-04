import { PickType } from "helper/mappedTypes";
import PostModel from "~domain/model/PostModel";

class CreatePostDto extends PickType(PostModel, ["title", "description"]) {}

export default CreatePostDto;
