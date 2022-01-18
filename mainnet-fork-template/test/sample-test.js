const { expect, use } = require("chai");
const { ethers } = require("hardhat");

const { solidity } = require("ethereum-waffle");
use(solidity);

const DAIAddress = "0x6b175474e89094c44da98b954eedeac495271d0f";
const USDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

describe("DeFi", () => {
  const INITIAL_AMOUNT = "100";
  const SWAP_AMOUNT = "10";
///npx ganache-cli --fork https://mainnet.infura.io/v3/f241986c0e2d4dd6a6412570b53d19d8 --unlock 0x503828976D22510aad0201ac7EC88293211D23Da


  let owner, whale;
  let DAI_TokenContract, USDC_TokenContract, DeFi_Instance;
  let DAI_decimals, USDC_decimals;

  before(async function () {
    [owner, addr1, addr2, addr3, addr4, addr5] = await ethers.getSigners();
    whale = await ethers.getSigner(
      "0x503828976D22510aad0201ac7EC88293211D23Da"
    );
    console.log("owner account is ", owner.address);

    DAI_TokenContract = await ethers.getContractAt("ERC20", DAIAddress);
    USDC_TokenContract = await ethers.getContractAt("ERC20", USDCAddress);

    DAI_decimals = await DAI_TokenContract.decimals();
    USDC_decimals = await USDC_TokenContract.decimals();
    
    const DeFi = await ethers.getContractFactory("DeFi");
    DeFi_Instance = await DeFi.deploy();
  });

  it("should transfer from whale to owner succeeded", async function () {
    const initialBalance = await DAI_TokenContract.balanceOf(whale.address);
    const sendAmount = await DAI_TokenContract
      .connect(whale).transfer(
        owner.address, 
        ethers.utils.parseEther(INITIAL_AMOUNT, DAI_decimals));
   expect(await DAI_TokenContract.balanceOf(owner.address) > 0).to.be.true;
  });

  it("should send DAI to contract and check transfer succeeded", async () => {
    await DAI_TokenContract.connect(owner).transfer(
      DeFi_Instance.address,
      ethers.utils.parseEther("1", DAI_decimals));

    expect(await DAI_TokenContract.balanceOf(DeFi_Instance.address))
    .to.be.equal(ethers.utils.parseEther("1", DAI_decimals));
  });

  it("should swap DAI for USDC", async () => {
    const BeforeAmount = await DAI_TokenContract.balanceOf(owner.address)
    const transferValue = ethers.utils.parseUnits("1", DAI_decimals);
    const tx = await DeFi_Instance.connect(owner).swapDAItoUSDC(
      transferValue
    )
    await tx.wait();
    
    expect(Number(await DAI_TokenContract.balanceOf(owner.address)) > 0).to.be.true;
    expect(Number(await USDC_TokenContract.balanceOf(owner.address))).to.be.greaterThan(0);
  })
});