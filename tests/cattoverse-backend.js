const anchor = require("@project-serum/anchor");
const { SystemProgram } = require("@solana/web3.js");

// describe('cattoverse-backend', () => {

//   // Configure the client to use the local cluster.
//   anchor.setProvider(anchor.Provider.env());

//   it('Is initialized!', async () => {
//     // Add your test here.
//     const program = anchor.workspace.CattoverseBackend;
//     const tx = await program.rpc.initialize();
//     console.log("Your transaction signature", tx);
//   });
// });

const main = async () => {
  console.log("🚀 Starting test...");

  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  // Reference to our solana program
  const program = anchor.workspace.CattoverseBackend;

  // Create a base account to start things off
  const baseAccount = anchor.web3.Keypair.generate();

  const tx = await program.rpc.initialize({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [baseAccount],
  });

  console.log("Your transaction signature", tx);

  // Fetching data from the account
  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log("Gif Count", account.totalGifs.toString());

  // Adding a new gif to the system
  await program.rpc.addGif(
    "https://media.giphy.com/media/ICOgUNjpvO0PC/giphy.gif",
    {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
      },
    }
  );

  // Calling fetch again to get the newest data.
  account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log("Gif Count", account.totalGifs.toString());
  console.log("Gif List", account.gifList);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

runMain();
