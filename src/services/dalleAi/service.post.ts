// External import
import fs, { createReadStream } from "fs";
import https from "https";

// Internal import
import { DalleAi } from "../../model/model.dalleai";
import { openai } from "../../utilities/service.config";
import { DbDalleAi } from "../../providers/database/dalleAi/db.dalleAi";
import { DalleAiInterface } from "../../interfaces/IDalleAiService";
import { alphNumericName } from "../../utilities/generateUniqueName";

const dbDalleAi = DbDalleAi.getInstance();


export class DalleAiService implements DalleAiInterface {
  public static dalleAiService: DalleAiService;
  private constructor() {}
  public static getInstance() {
    if (!DalleAiService.dalleAiService) {
      DalleAiService.dalleAiService = new DalleAiService();
    }
    return DalleAiService.dalleAiService;
  }
  public async generateImage(postData: DalleAi) {
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
          await dbDalleAi
          .generateImage(postData)
          .then((res) => resolve(res))
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
      const name = alphNumericName() + '.png';
      const path = `./uploaded-image/dalleImage/${name}`;
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

 public async getImageList(imgId: any){
  try{
    return new Promise(async(resolve, reject) => {
      const result = await dbDalleAi.getImageInfo(imgId).catch((error) => {
        reject(error);
      });

      if(result){
        resolve(result);
      } else {
        reject('Not found');
      }

    }).catch((err) => {
      throw err;
    })

  }catch(error){
    throw error;
  }
 }

 public async generateImageVariations(postData: DalleAi) {
  try {
    return new Promise(async (resolve, reject) => {

      const filePath:any = fs.createReadStream('/home/rajibhasan/Desktop/Ai_Art/server/uploaded-image/uploadedImage/1671366651357_111A8963.jpg');
      const n = Number(postData.imgCount);
      const size = postData.imgSize;

      const response:any = await openai.createImageVariation(
        filePath,
        n,
        size
      ).catch((error) => {
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
        await dbDalleAi
        .generateImage(postData)
        .then((res) => resolve(res))
        .catch((err) => reject("Failed to genearate image variations. Please try again"));
      }
    }).catch((error) => {
      throw error;
    });
  } catch (error) {
    throw error;
  }
}

}
