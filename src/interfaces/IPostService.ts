import { Post } from "./../model/model.post";

export interface PostInterface {
    generateImage(postData: Post): any;
}