const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const socket = require("./src/socketSetup/socketSetup");
const index = require("./index");

dotenv.config({ path: ".env" });

const port = process.env.PORT || 8000;
const prisma = new PrismaClient();

async function connectToDB() {
  try {
    await prisma.$connect();
    console.log("Successsful connection to db");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
}

connectToDB();

// Start server
const PORT = process.env.PORT || 5000;
const socketApp = index.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});

socket(socketApp, prisma);
