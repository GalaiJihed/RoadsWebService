import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import routes from "./routes";
import UserController from "./controller/UserController";
import AddTagController from "./controller/AddTagController";
import * as multer from "multer";

//Connects to the Database -> then starts the express

const storage = multer.diskStorage({
  destination : function(req,file,cb)
{
  cb(null,'../uploads/');
},
filename:function(req,file,cb)
{
  cb(null,file.originalname);

}
});
const upload=multer({storage:storage})
const storage1 = multer.diskStorage({
  destination : function(req,file,cb)
{
  cb(null,'../tagImages/');
},
filename:function(req,file,cb)
{
  cb(null,file.originalname);

}
});
const upload1=multer({storage:storage1})
createConnection()
  .then(async connection => {
    // Create a new express application instance
    const app = express();

    // Call midlewares
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    //Set all routes from routes folder
    app.use("/", routes);
    app.post('/uploadtag',upload1.single('filedata'),async(req,res)=>{
      const{filename :image} = req.file

      let id =req.body.id;

     
      AddTagController.updatePictureTag(image,id);
      console.log(image);
      return res.send("SUCCESS");
    })
    app.use('/images',express.static('../tagImages/'));


    app.post('/upload',upload.single('filedata'),async(req,res)=>{
      const{filename :image} = req.file
      let name =req.body.name;
    //  UserController.updatePicture(image,name);
     
      console.log(image);
      return res.send("SUCCESS");
    })
    app.use('/images',express.static('../uploads/'));
    app.listen(3000, () => {
      console.log("Server started on port 3000!");
    });
  })
  .catch(error => console.log(error));