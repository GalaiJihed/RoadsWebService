import { Request, Response } from "express";

import { getRepository } from "typeorm";
import { Tag } from "../entity/Tag";

import { validate } from "class-validator";
import { User } from "../entity/User";

class AddTagController{

  static editTag = async (req: Request, res: Response) => {
//Get the ID from the url
const id = req.params.id;

//Get values from the body
const { route, description,ville } = req.body;

//Try to find user on database
const tagRepository = getRepository(Tag);
let tag;
try {
  tag = await tagRepository.findOneOrFail(id);
} catch (error) {
  //If not found, send a 404 response
  res.status(404).send(" not found");
  return;
}

//Validate the new values on model
tag.route = route;
tag.description = description;
tag.ville = ville;


//Try to safe, if fails, that means username already in use
try {
  await tagRepository.save(tag);
} catch (e) {
  res.status(409).send("Not Found");
  return;
}
//After all send a 204 (no content, but accepted) response
res.status(204).send();
};

static GetAllTag = async (req: Request, res: Response) => {
  //Get users from database
  const tagRepository = getRepository(Tag);
  const tags = await tagRepository.find({
    select: ["id", "latitude","picture", "longitude","description","route","createdAt","ville","titre"] //We dont want to send the passwords on response
  });

  //Send the users object
  res.send(tags);
};



static updatePictureTag = async (picture,id ) => {
  //Get the ID from the url
  console.log("id : "+id);

  //Get the user from database
  const userRepository = getRepository(Tag);

    const tag = await  userRepository.findOne({ id:id }); 
    tag.picture=picture;
    await  userRepository.save(tag);
    //const user = await userRepository.findOneOrFail(username, {
     //  select: ["username", "id", "role"] //We dont want to send the password on response
    // });
 

};

static getOneById = async (req:Request,res:Response) => {
  //Get the ID from the url
  
  let { id } = req.body;
  console.log("Tag : "+id);

  //Get the user from database
  const userRepository = getRepository(Tag);
  try {
    const user = await  userRepository.findOne({ id }); 
    //const user = await userRepository.findOneOrFail(username, {
     //  select: ["username", "id", "role"] //We dont want to send the password on response
    // });
    res.send(user);
  } catch (error) {
    res.status(404).send("Tag not found");
  }
};

static getOneByLatLng = async (req: Request, res: Response) => {
  //Get the ID from the url
  let { longitude,latitude } = req.body;
  
    console.log("longitude : "+longitude+"latitude : "+latitude);

  //Get the user from database
  const tagRepository = getRepository(Tag);
  try {
    const tag = await  tagRepository.findOneOrFail({latitude,longitude} ); 
    //const user = await userRepository.findOneOrFail(username, {
     //  select: ["username", "id", "role"] //We dont want to send the password on response
    // });
    res.send(tag);
  } catch (error) {
    res.status(404).send("Tag not found");
  }
};


static newtag = async(req:Request , res:Response)=>{
    let {route,description,picture,longitude,latitude,user,ville,titre} =req.body;
    let tag=new Tag();
    tag.route=route;
    tag.description=description;
    tag.picture=picture;
    tag.longitude=longitude;
    tag.latitude=latitude;
    tag.user=user;
    tag.ville=ville;
    tag.titre=titre;
    const tagRepository = getRepository(Tag);
    let id = 0 
    try {
      await tagRepository.save(tag).then(tag1 => {
        console.log('tag  has been saved. tag  id is:',  id = tag1.id);
        });
      res.send({
        message: 'Success',
        status: 201,
        id
      });
     
    } catch (e) {
      res.status(409).send("Check fiels! there is a probleme");
      return;
    }
    
  };

static searchTagByaddress = async(req:Request,res:Response)=> {
    //Get the ID from the url
    let { user } = req.body;
    console.log("user : "+user);
  
    //Get the user from database
    const userRepository = getRepository(Tag);
    try {
      const users = await  userRepository.find({ user }); 
      //const user = await userRepository.findOneOrFail(username, {
       //  select: ["username", "id", "role"] //We dont want to send the password on response
      // });
      res.send(users);
    } catch (error) {
      res.status(404).send("Tag not found");
    }

};

static deleteTag = async (req: Request, res: Response) => {
  //Get the ID from the url
  const id = req.params.id;

  const userRepository = getRepository(Tag);
  let tag: Tag;
  try {
    tag = await userRepository.findOneOrFail(id);
  } catch (error) {
    res.status(404).send("User not found");
    return;
  }
  userRepository.delete(id);

  //After all send a 204 (no content, but accepted) response
  res.status(204).send();
};
};
export default AddTagController;