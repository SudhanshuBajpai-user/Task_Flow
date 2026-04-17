const mongoose=require("mongoose");

const connectDB = async () => {
  try {
    console.log("URI:", process.env.MONGO_URI); // 👈 ADD THIS

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected:", conn.connection.host);
  } catch (err) {
    console.error("❌ DB Error:", err.message);
    process.exit(1);
  }
};

module.exports=connectDB;