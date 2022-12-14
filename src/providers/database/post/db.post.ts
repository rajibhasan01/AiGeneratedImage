// External import
import { MongoClient } from "mongodb";

// Internal import
import { Post } from "../../../model/model.post";
import { ConfigService } from "../../../utilities/service.config";

const config = ConfigService.getInstance().getConfig();

export class DbPost {
  private static dbPost: DbPost;
  private collectionName: string;

  constructor() {
    this.collectionName = "post";
  }
  /**
   * getInstance
   */
  public static getInstance() {
    if (!DbPost.dbPost) {
      DbPost.dbPost = new DbPost();
    }
    return DbPost.dbPost;
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
  public async generateImage(post: Post) {
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
}
