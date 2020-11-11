import { Router } from "express";
import AddTagController from "../controller/AddTagController";

const router=Router();

router.post("/addtag", AddTagController.newtag);
router.patch("/edit/:id([0-9]+)", AddTagController.editTag);
router.delete("/deleteTag/:id([0-9]+)", AddTagController.deleteTag);
router.post("/findtagsuser", AddTagController.searchTagByaddress);
router.post("/alltag",AddTagController.GetAllTag)
router.post("/gettagbyid",AddTagController.getOneById)
router.post("/getbylatlng",AddTagController.getOneByLatLng)


export default router;