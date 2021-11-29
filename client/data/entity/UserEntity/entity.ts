import ProviderType from "enum/ProviderType";
import UserMbtiType from "enum/UserMBTIType";
import ImageFileEntity from "../ImageFileEntity";

export default interface Entity {
  id: string;
  name: string;
  email: string;
  password: string;
  userType: UserMbtiType;
  createdAt: Date;
  providerType?: ProviderType;
  avatar?: ImageFileEntity;
}
