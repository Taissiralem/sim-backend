const cron = require("node-cron");
const User = require("../models/user");

exports.resetPoint = cron.schedule("0 0 1 1 *", async () => {
  try {
    const users = await User.find({}).select("_id");
    const updateOps = users.map((user) => {
      return {
        updateOne: {
          filter: {
            _id: user._id,
          },
          update: {
            $set: {
              "level.points": 0,
              "level.name": "bronze",
            },
          },
        },
      };
    });

    await User.bulkWrite(updateOps);
  } catch (err) {
    console.error(err);
  }
});


