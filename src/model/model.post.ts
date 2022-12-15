export class Post {
  imgUrl: any;
  prompt: string;
  imgCount: number;
  imgSize: any;
  createdAt: Date;

  private static post: Post;

  private constructor() {
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
  }

  public static getInstance() {
    if (!Post.post) {
      Post.post = new Post();
    }

    return Post.post;
  }
}
