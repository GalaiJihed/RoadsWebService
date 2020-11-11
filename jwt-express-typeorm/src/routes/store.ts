import { Router } from "express";
import StoreContoller from "../controller/StoreController";

const router=Router();

router.post("/stores",StoreContoller.listAll);


export default router;



