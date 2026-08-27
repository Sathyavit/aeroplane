import mongoose from "mongoose";

mongoose.connect(
"mongodb://sathya_db_user:Sathya12345@ac-vegkojf-shard-00-00.geospr9.mongodb.net:27017,ac-vegkojf-shard-00-01.geospr9.mongodb.net:27017,ac-vegkojf-shard-00-02.geospr9.mongodb.net:27017/?ssl=true&replicaSet=atlas-18kfn7-shard-0&authSource=admin&appName=SkyWingsCluster")
.then(() => {
  console.log("✅ MongoDB Connected Successfully");
  process.exit();
})
.catch((err) => {
  console.log("❌ MongoDB Error");
  console.log(err);
  process.exit();
});