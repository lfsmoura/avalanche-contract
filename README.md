# Avalanche contract repo

This repo is created based on `https://github.com/ava-labs/avalanche-smart-contract-quickstart`.

## Development logs

### Installing avalanche

I installed avalanche and created a subnet:

```
creating subnet lfsmoura
Enter your subnet's ChainId. It can be any positive integer.
ChainId: 12345
Select a symbol for your subnet's native token
Token symbol: LEO
✔ Low disk use    / Low Throughput    1.5 mil gas/s (C-Chain's setting)
✔ Airdrop 1 million tokens to the default address (do not use in production)
✔ No
Successfully created genesis
```

### Creating contract repo

* I copied `https://github.com/ava-labs/avalanche-smart-contract-quickstart` repo to start my project.
* I created an `.env` file to hold local variables initially.
* I modified `hardhat.config.ts` file to use my local network
* I tested hardhat with `balances` task:
```
    $ npx hardhat balances --network local
    0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC has balance 1000000000000000000000000
    0x9632a79656af553F58738B0FB750320158495942 has balance 0
    0x55ee05dF718f1a5C1441e76190EB1a19eE2C9430 has balance 0
    0x4Cf2eD3665F6bFA95cE6A11CFDb7A2EF5FC1C7E4 has balance 0
    0x0B891dB1901D4875056896f28B6665083935C7A8 has balance 0
    0x01F253bE2EBF0bd64649FA468bF7b95ca933BDe2 has balance 0
    0x78A23300E04FB5d5D2820E23cc679738982e1fd5 has balance 0
    0x3C7daE394BBf8e9EE1359ad14C1C47003bD06293 has balance 0
    0x61e0B3CD93F36847Abbd5d40d6F00a8eC6f3cfFB has balance 0
    0x0Fa8EA536Be85F32724D57A37758761B86416123 has balance 0
    Done in 7.49s.
```