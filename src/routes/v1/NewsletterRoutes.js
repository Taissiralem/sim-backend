const { Router } = require("express");
const NewsletterController = require("../../controllers/Newslettercontroller");
const router = Router();

router.get("/", NewsletterController.getAllNewsletters);
router.post("/create", NewsletterController.createNewsletter);
router.get("/count", NewsletterController.countAllNewsletters);
module.exports = router;
