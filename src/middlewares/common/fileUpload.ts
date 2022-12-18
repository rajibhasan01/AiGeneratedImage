// External import
import fs from "fs";
import multer from "multer";

const fileStorage = multer.memoryStorage();

export const fileUpload = multer({
  storage: fileStorage,
  limits: {
    fileSize: 15000000,
  },
  fileFilter(req: any, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please select jpg or png Image"));
    }
    cb(undefined, true);
  },
});

export const writeFileToLocalStorage = async (req: any, res: any, next: any) => {
    let hasError: any;
    try{
        if(typeof req.file !== 'undefined'){
            const image = req.file;
            const imagePath = `/uploadedImage/${new Date()
            .getTime()
            .toString()}_${image.originalname.replace(
            /(?:\.(?![^.]+$)|[^\w.])+/g,
            '-'
            )}`;

            const fileContents = Buffer.from(image.buffer, 'base64');
            fs.writeFile(`uploaded-image/${imagePath}`, fileContents, (err) => {
            if (err) throw err;
            });
        } else {
            throw new Error('Please attached a file!');
        }
    } catch (error){
        hasError = error;
    } finally {
        if(hasError){
            next(hasError);
        } else {
            next();
        }
    }
};
