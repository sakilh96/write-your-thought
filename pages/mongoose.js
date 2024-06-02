import mongoose from 'mongoose';

const connectionString = 'mongodb://localhost:27017/wyt';

const mongoConnect = () => {
  mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
  const connection = mongoose.connection;

  connection.on("error", (err) => {
    // console.error("MongoDB connection error:", err);
  });
  
  connection.once("open", () => {
    // console.log("MongoDB database connection established successfully");
  });
};

export default mongoConnect;
