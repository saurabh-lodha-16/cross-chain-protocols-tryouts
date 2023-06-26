/* eslint-disable no-process-exit */
const hre = require("hardhat");

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function main() {
  // We get the contract to deploy
  const SendAckReceiverImplementation = await hre.ethers.getContractFactory(
    "SendAckReceiverImplementation"
  );
  const contractInstance = await SendAckReceiverImplementation.deploy(
    "0xC249632c2D40b9001FE907806902f63038B737Ab"
  );

  await contractInstance.waitForDeployment();
  console.log(
    "SendAckReceiverImplementation Contract deployed at:",
    await contractInstance.getAddress()
  );

  await sleep(30000);

  await hre.run("verify:verify", {
    contract:
      "contracts/Axelar/SendAckReceiverImplementation.sol:SendAckReceiverImplementation",
    address: await contractInstance.getAddress(),
    constructorArguments: ["0xC249632c2D40b9001FE907806902f63038B737Ab"],
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
