import { genUserMockObject } from "../UserModel/mock";

export const genCommentMockObject = () => {
  return {
    id: String(Math.random() * 1000),
    content: "강남은 언제왔다갔냠 쥐도새도모르게....쉑쉑 가격대비 별루",
    user: genUserMockObject(),
  };
};
