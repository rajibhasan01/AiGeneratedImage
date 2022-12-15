// External import
import { validationResult } from "express-validator";

// Internal import
import { Post } from "../../model/model.post";
import { PostService } from "../../services/post/service.post";
import { ConfigService } from "../../utilities/service.config";

const postService = PostService.getInstance();
const config = ConfigService.getInstance().getConfig();


export const homePage = async (req:any, res:any, next:any) => {

  let images:any = [];
  try{
    if(req?.session?.imgId){
      const result: any = await postService.getImageList(req?.session?.imgId).catch((error) => {
        throw error;
      });
      if(result){
        images = result?.imgUrl;
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
      title: 'Brain Craft AI Generated Image Service',
      formPanelTitle: 'AI Image Generator Box',
      images,
      success,
      error,
    });
  }
}

/**
 * Create Post
 */

export const generateImage = async (req: Request & { body: Post } & {session: any}, res: any) => {
  const data: Post = req.body;

  try {
    const error = validationResult(req).formatWith(({ msg }) => msg);
    const hasError = !error.isEmpty();
    if (hasError) {
      res.status(422).json({ status: 422, message: error.array().join(', ') });
    } else {
      const result: any = await postService.generateImage(data).catch((err) => {
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
