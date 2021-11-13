const anchor = require("@project-serum/anchor");

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

  anchor.setProvider(anchor.Provider.env());
  const program = anchor.workspace.CattoverseBackend;
  const tx = await program.rpc.initialize();

  console.log("Your transaction signature", tx);
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
