import BaseRepository, { ConstructorParameter } from "./Repository";

interface MeRepository {}

export default class MeRepositoryImpl
  extends BaseRepository
  implements MeRepository
{
  private static _Instance: MeRepositoryImpl;
  static GetInstace(args: ConstructorParameter) {
    if (!MeRepositoryImpl._Instance) {
      MeRepositoryImpl._Instance = new MeRepositoryImpl(args);
    }
    return MeRepositoryImpl._Instance;
  }

  private constructor(args: ConstructorParameter) {
    super(args);
  }

  /** User <--> User (One to One) **/
  async follow() {}

  async unfollow() {}

  /** User <--> Post (One to Many) **/
  // TODO : Map에 데이터 추가
  // TODO : 복수의 이미지 추가

  /** 유저 ID로 Post 불러오기 **/
  // TODO : 다양한 쿼리 추가되어야 함
  async createPost() {}

  async findPosts() {}

  async updatePost() {}

  async deletePost() {}

  /** User <--> Place (One to Many) **/
  // TODO : 다양한 필터 추가되어야 할 것
  async findPlaces() {}

  // 장소를 클릭했을 때 부를 것
  async findPlaceById() {}

  /** User <--> Notification (One to Many) **/
  async findNotifications() {}

  async deleteNotificationById() {}

  /** User <--> Likes <--> Post (Many to Many) **/
  async addLikes() {}

  async deleteLikes() {}

  /** User <--> Comments <--> Post (Many to Many) **/
  // 댓글 달기
  async addComment() {}

  // 댓글 수정하기
  async updateComment() {}

  // 댓글 삭제하기
  async deleteComment() {}

  // 댓글 신고하기
  async reportComment() {}

  // TODO : 대댓글 달기. 클라에선 코멘트 ID만 전송해주면 된다. 관계 설정하고 처리해주는 건 백엔드 몫. 단, 유즈케이스는 분리하는게 맞아보임.
  async addNestedComment() {}
}
