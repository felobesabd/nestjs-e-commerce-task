import { diskStorage } from "multer";
import { v4 as uuid } from "uuid";

export const localOpts = {
  storage: diskStorage({
    destination: "./uploads/category",
    filename: (req, file, cb) => {
      // console.log('file-orig' + file.originalname);
      const name = file.originalname.split('.')[0];
      const fileExctension = file.originalname.split('.')[1];
      const newFileName = `category-${uuid()}-${Date.now()}.png`;

      cb(null, newFileName);
    }
  }),
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      return cb(null, true);
    }
    return cb(null, false)
  }
}