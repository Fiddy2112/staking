import { Network, Alchemy } from "alchemy-sdk";
import express from "express";
import cros from "cors";
import dotenv from "dotenv";
const app = express();
const port = 5001 || process.env.PORT;
dotenv.config();

app.use(cros());
app.use(express.json());

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const settings = {
  apiKey: ALCHEMY_API_KEY,
  network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(settings);

app.get("/getwalletbalance", async (req, res) => {
  try {
    // Get all outbound transfers for a provided address
    const response = await alchemy.core.getTokenBalances(
      "0x994b342dd87fc825f66e51ffa3ef71ad818b6893"
    );
    console.log(response);
    return res.status(200).json(response);
  } catch (err) {
    console.log(`Something went wrong ${err}`);
    return res.status(400).json();
  }
});

async function main() {
  const latestBlock = await alchemy.core.getBlockNumber();
  console.log("The latest block number is", latestBlock);
}

// main();
app.listen(port, () => {
  main();
  console.log("Listening for API Calls on " + port);
});
