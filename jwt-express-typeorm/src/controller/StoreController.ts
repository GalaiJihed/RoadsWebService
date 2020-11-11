import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { Store } from "../entity/Store";

class StoreController{

static listAll = async (req: Request, res: Response) => {
  //Get users from database
  const storeRepository = getRepository(Store);
  const stores = await storeRepository.find()

  //Send the users object
  console.log(stores)
  res.send(stores);
};
}

export default StoreController;