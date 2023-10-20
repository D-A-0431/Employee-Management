const router = require("express").Router();
const authRouter = require("./authRouters");

router.use("/auth",authRouter);

module.exports = router;