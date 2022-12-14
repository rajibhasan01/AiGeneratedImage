// External import
import fs from "fs";
import https from "https";

// Internal import
import { Post } from "../../model/model.post";
import { openai } from "./../../utilities/service.config";
import { DbPost } from "../../providers/database/post/db.post";
import { PostInterface } from "./../../interfaces/IPostService";
import { alphNumericName } from "./../../utilities/generateUniqueName";

const dbPost = DbPost.getInstance();


export class PostService implements PostInterface {
  public static postService: PostService;
  private constructor() {}
  public static getInstance() {
    if (!PostService.postService) {
      PostService.postService = new PostService();
    }
    return PostService.postService;
  }
  public async generateImage(postData: Post) {
    try {
      return new Promise(async (resolve, reject) => {

        const prompt = postData.prompt;
        const n = Number(postData.imgCount);
        const size = postData.imgSize;

        const response:any = await openai.createImage({
          prompt,
          n,
          size
        }).catch((error) => {
          reject(error.message);
        });
        const datas = response?.data?.data;
        postData.imgUrl = [];
        if (typeof datas !== "undefined"){
          for(const data of datas){
            const fileName = await this.downloadFile(data?.url).catch((error) => {
              reject(error.message);
            });
            if (fileName){
              postData.imgUrl.push(fileName);
            }
          };
        }

        if(postData.imgUrl.length !== 0){
          await dbPost
          .generateImage(postData)
          .then((res) => resolve("Generate image Successfully"))
          .catch((err) => reject("Failed to genearate image. Please try again"));
        }
      }).catch((error) => {
        throw error;
      });
    } catch (error) {
      throw error;
    }
  }

  public async downloadFile(url: any){

      try{
        return new Promise(async(resolve, reject) => {
          const name = alphNumericName();
          const path = `./uploaded-image/${name}.jpg`;
          const filePath = fs.createWriteStream(path);
          const Request = https.get(url, (response) => {
            response.pipe(filePath);

            filePath.on('finish', () => {
              resolve(name);
            });
          }).on('error', (err) => {
            fs.unlink(path, (error => {
              if(error){
                reject(error);
              }
            }));

            if(err){
              reject(err);
            }
          })
    }).catch((error) => {
      throw error;
    })
  }  catch(error){
    throw error;
  }
 }
}
