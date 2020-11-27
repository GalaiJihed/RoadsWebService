import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../entity/User";

class UserController{

static listAll = async (req: Request, res: Response) => {
  //Get users from database
  const userRepository = getRepository(User);
  const users = await userRepository.find({
    select: ["id", "username", "role"] //We dont want to send the passwords on response
  });

  //Send the users object
  res.send(users);
};

/*static getOneById = async (req: Request, res: Response) => {
  //Get the ID from the url
  const id: number = req.params.id;

  //Get the user from database
  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOneOrFail(id, {
      select: ["id", "username", "role"] //We dont want to send the password on response
    });
  } catch (error) {
    res.status(404).send("User not found");
  }
};*/


static getOneByUsername = async (req: Request, res: Response) => {
  //Get the ID from the url
  let { username } = req.body;
  console.log("Username : "+username);

  //Get the user from database
  const userRepository = getRepository(User);
  try {
    const user = await  userRepository.findOne({ username }); 
    //const user = await userRepository.findOneOrFail(username, {
     //  select: ["username", "id", "role"] //We dont want to send the password on response
    // });
    res.send(user);
  } catch (error) {
    res.status(404).send("USER not found");
  }
};

static editUserr = async (req: Request, res: Response) => {
  //Get the ID from the url
  const id = req.params.id;
  
  //Get values from the body
  const { username, email,address,picture,phoneNumber } = req.body;
  
  //Try to find user on database
  const tagRepository = getRepository(User);
  let user;
  try {
    user = await tagRepository.findOneOrFail(id);
  } catch (error) {
    //If not found, send a 404 response
    res.status(404);
    return;
  }
  
  //Validate the new values on model
  user.username = username;
  user.email = email;
  user.address = address;
  user.picture = picture;
  user.phoneNumber=phoneNumber;
  //Try to safe, if fails, that means username already in use
  try {
    await tagRepository.save(user);
  } catch (e) {
    res.status(409).send("Not Found");
    return;
  }
  //After all send a 204 (no content, but accepted) response
  res.status(204).send();
  };
  
static updatePicture = async (picture,username ) => {
  //Get the ID from the url
  console.log("Username : "+username);

  //Get the user from database
  const userRepository = getRepository(User);

    const user = await  userRepository.findOne({ username:username }); 
    user.picture=picture;
    await  userRepository.save(user);
    //const user = await userRepository.findOneOrFail(username, {
     //  select: ["username", "id", "role"] //We dont want to send the password on response
    // });
 

};








static newUser = async (req: Request, res: Response) => {
  //Get parameters from the body
  let { username, password, role,address,picture,email,phoneNumber,birthDate } = req.body;
  console.log(username, password, role,address,picture,email,phoneNumber,birthDate)
  let user = new User();
  user.username = username;
  user.password = password;
  user.role = role;
  user.address = address;
  user.picture = picture;
  user.email = email;
  user.phoneNumber = phoneNumber;
  user.birthDate = birthDate;
  //Validade if the parameters are ok
  const errors = await validate(user);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  //Hash the password, to securely store on DB
  user.hashPassword();

  //Try to save. If fails, the username is already in use
  const userRepository = getRepository(User);
  try {
    await userRepository.save(user);
  } catch (e) {
    res.status(409).send("username already in use");
    return;
  }

  //If all ok, send 201 response
  res.status(201).send("User created");
};

static editUser = async (req: Request, res: Response) => {
  //Get the ID from the url
  const id = req.params.id;

  //Get values from the body
  const { username, role } = req.body;

  //Try to find user on database
  const userRepository = getRepository(User);
  let user;
  try {
    user = await userRepository.findOneOrFail(id);
  } catch (error) {
    //If not found, send a 404 response
    res.status(404).send("User not found");
    return;
  }

  //Validate the new values on model
  user.username = username;
  user.role = role;
  const errors = await validate(user);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  //Try to safe, if fails, that means username already in use
  try {
    await userRepository.save(user);
  } catch (e) {
    res.status(409).send("username already in use");
    return;
  }
  //After all send a 204 (no content, but accepted) response
  res.status(204).send();
};

static deleteUser = async (req: Request, res: Response) => {
  //Get the ID from the url
  const id = req.params.id;

  const userRepository = getRepository(User);
  let user: User;
  try {
    user = await userRepository.findOneOrFail(id);
  } catch (error) {
    res.status(404).send("USER DELETED");
    return;
  }
  userRepository.delete(id);

  //After all send a 204 (no content, but accepted) response
  res.status(204).send();
};
};

export default UserController;