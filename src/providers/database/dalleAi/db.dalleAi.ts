// External import
import { MongoClient, ObjectId } from "mongodb";

// Internal import
import { DalleAi } from "../../../model/model.dalleai";
import { ConfigService } from "../../../utilities/service.config";

const config = ConfigService.getInstance().getConfig();

export class DbDalleAi {
  private static dbDalleAi: DbDalleAi;
  private collectionName: string;

  constructor() {
    this.collectionName = "dalleAi";
  }
  /**
   * getInstance
   */
  public static getInstance() {
    if (!DbDalleAi.dbDalleAi) {
      DbDalleAi.dbDalleAi = new DbDalleAi();
    }
    return DbDalleAi.dbDalleAi;
  }
  /**
   * DB Connection
   */
  private async getDbConnection() {
    const dbConnection = await new MongoClient(config.mongo.url).connect();
    return dbConnection;
  }
  /**
   * createPost
   */
  public async generateImage(post: DalleAi) {
    try {
      return await new Promise(async (resolve, reject) => {
        const dbConn = await this.getDbConnection();
        const db = dbConn.db(config.mongo.dbName);
        const dbCollection = db.collection(this.collectionName);
        post.createdAt = new Date();

        const result = await dbCollection.insertOne(post).catch(error => {
          reject(error);
        });
        await dbConn.close();
        if (result) {
          resolve(result);
        } else {
          reject(result);
        }
      }).catch((error) => {
        console.log("Error in CreatePost method of DbPost class: ", error);
        throw error;
      });
    } catch (error) {
      console.log(
        "Error in CreatePost method of DbPost class: ",
        error.message
      );
      throw error;
    }
  }

  public async getImageInfo(imgId: any) {
    try {
      return await new Promise(async (resolve, reject) => {
        const dbConn = await this.getDbConnection();
        const db = dbConn.db(config.mongo.dbName);
        const dbCollection = db.collection(this.collectionName);
        const result = await dbCollection.findOne({_id: new ObjectId(imgId)}).catch(error => {
          reject(error);
        });
        await dbConn.close();
        if (result) {
          resolve(result);
        } else {
          reject(result);
        }
      }).catch((error) => {
        console.log("Error in getPost method of DbPost class: ", error);
        throw error;
      });
    } catch (error) {
      console.log(
        "Error in getPost method of DbPost class: ",
        error.message
      );
      throw error;
    }
  }
}
