/* eslint-disable no-process-exit */
const hre = require("hardhat");

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function main() {
  // We get the contract to deploy
  const SendAckSender = await hre.ethers.getContractFactory("SendAckSender");
  const contractInstance = await SendAckSender.deploy(
    "0xBF62ef1486468a6bd26Dd669C06db43dEd5B849B",
    "0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6"
  );

  await contractInstance.waitForDeployment();
  console.log(
    "SendAckSender Contract deployed at:",
    await contractInstance.getAddress()
  );

  await sleep(30000);

  await hre.run("verify:verify", {
    contract: "contracts/Axelar/SendAckSender.sol:SendAckSender",
    address: await contractInstance.getAddress(),
    constructorArguments: [
      "0xBF62ef1486468a6bd26Dd669C06db43dEd5B849B",
      "0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6",
    ],
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
