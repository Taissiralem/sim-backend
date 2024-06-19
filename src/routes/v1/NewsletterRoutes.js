const { Router } = require("express");
const NewsletterController = require("../../controllers/Newslettercontroller");
const adminAuthAndRoleCheck = require("../../middlewares/authcheck");
const router = Router();

router.get("/", adminAuthAndRoleCheck, NewsletterController.getAllNewsletters);
router.post("/create", NewsletterController.createNewsletter);
router.get("/count", NewsletterController.countAllNewsletters);
module.exports = router;
