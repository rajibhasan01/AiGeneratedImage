// External import
import { validationResult } from "express-validator";

// Internal import
import { DalleAi } from "../../model/model.dalleai";
import { DalleAiService } from "../../services/dalleAi/service.post";
import { ConfigService } from "../../utilities/service.config";


const dalleAiService = DalleAiService.getInstance();
const config = ConfigService.getInstance().getConfig();


// Home page
export const homePage = async (req:any, res:any, next:any) => {

  let images:any = [];
  let searchText = '';
  try{
    if(req?.session?.imgId){
      const result: any = await dalleAiService.getImageList(req?.session?.imgId).catch((error) => {
        throw error;
      });
      if(result){
        images = result?.imgUrl;
        searchText = ' - ' + result?.prompt;
      }
    }
  } catch (error) {
    req.session.error = error;
  } finally {
    const success = req?.session?.success !== undefined ? req.session.success : null;
    delete req?.session?.success;
    const error = req?.session?.error !== undefined ? req.session.error : null;
    delete req?.session?.error;
    delete req?.session?.imgId;

    res.render('pages/dalleai/home.ejs', {
      url: config.baseUrl,
      searchText,
      title: 'Brain Craft AI Generated Image Service',
      formPanelTitle: 'AI Image Generator Box',
      images,
      success,
      error,
    });
  }
}

/**
 * Generate Image from prompt
 */

export const generateImage = async (req: Request & { body: DalleAi } & {session: any}, res: any) => {
  const data: DalleAi = req.body;

  try {
    const error = validationResult(req).formatWith(({ msg }) => msg);
    const hasError = !error.isEmpty();
    if (hasError) {
      // res.status(422).json({ status: 422, message: error.array().join(', ') });
      req.session.error = error.array().join(', ');
    } else {
      const result: any = await dalleAiService.generateImage(data).catch((err) => {
        throw err;
      });
      if (result) {
        req.session.success = 'Image Generated Successfully.';
        req.session.imgId = result.insertedId;
      } else {
        req.session.error = "Failed to generate image, try again.";
      }
    }
  } catch (error) {
    // res.status(400).json({status: 403, message: "Select different words" });
    req.session.error = "Failed to generate image, try again.";
  } finally{
    res.redirect('/');
  }
};

/**
 * Generate image variations
 */

export const generateImageVariation = async (req: any, res: any) => {
  res.send("Ok");
}