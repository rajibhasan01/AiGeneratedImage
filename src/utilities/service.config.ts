// External import
import { Configuration, OpenAIApi } from "openai";

// Internal import
import { config } from "../../config";

export class ConfigService{
    private static configInstance : ConfigService;
    private constructor(){};

    static getInstance(){
        if(!ConfigService.configInstance){
            ConfigService.configInstance = new ConfigService();
        }
        return ConfigService.configInstance;
    }

    public getConfig(){
        return config;
    }
};

const configuration = new Configuration({
    apiKey: "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"
  });

export const openai = new OpenAIApi(configuration);