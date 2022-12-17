import { DalleAi } from "../model/model.dalleai";

export interface DalleAiInterface {
    generateImage(dalleAi: DalleAi): any;
}