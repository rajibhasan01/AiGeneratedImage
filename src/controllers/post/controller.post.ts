// External import
import { validationResult } from "express-validator";

// Internal import
import { Post } from "../../model/model.post";
import { PostService } from "../../services/post/service.post";

const postService = PostService.getInstance();

/**
 * Create Post
 */

export const generateImage = async (req: Request & { body: Post }, res: any) => {
  const data: Post = req.body;

  try {
    const error = validationResult(req).formatWith(({ msg }) => msg);
    const hasError = !error.isEmpty();
    if (hasError) {
      res.status(422).json({ error: error.array() });
    } else {
      const result = await postService.generateImage(data).catch((err) => {
        throw err;
      });
      if (result) {
        res.status(200).json({
          status: 200,
          message: "Generate image successfully"
        });
      } else {
        res.status(400).json({status: 403, message: "Select different words" });
      }
    }
  } catch (error) {
    res.status(400).json({status: 403, message: "Select different words" });
  }
};
