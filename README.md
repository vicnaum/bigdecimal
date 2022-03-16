BigDecimal
===========

This library was made to simplify the Web3 development by extending BigNumber package from ethers.js with Decimals property and overriding the corresponding math.

Put simply - now you don't need parseEthers, formatEthers, and convert numbers/strings/bignumbers to each other.

BigDecimal structure/features:
1) inheriting BigNumber - so you don't need to change anything in your code - and can pass BigDecimal wherever you had BigNumber before
2) BigDecimal.decimals property - stores how many decimals this number has. Default is 18
3) BigDecimal.value property - stores the numeric value of the bignumber with decimals applied - for human-readable display and use anywhere where you would use a simple number

Usage
---------

You can look in the `test` folder for all possible use-cases of BigDecimal.

And the source code `src.ts/BigDecimal.ts` also has very verbose comments on usage.

For now it only supports multiplication, division, addition and subtraction.

```javascript
// You can create BigDecimal with Number, with string, or with BigNumber.
// You can pass the number of decimals as the second argument. If nothing is passed - default is 18

const fiveEthers = new BigDecimal(5) // Same as BigNumber.from(5 with 18 zeroes) or parseEther(5)

const hundredUSDC = new BigDecimal("100", 6) // Same as BigNumber.from(100 with 6 zeroes) or parseUnits(100, 6)

const meaning = new BigDecimal(BigNumber.from(42), 0) // 42 with 0 decimals

const half = hundredUSDC.mul(0.5) // equals 50 USDC with 6 decimals

const fivePercent = new Bigdecimal(0.05) // equals 0.05 * 1e18

const multiplication = hundredUSDC.mul(fivePercent) // equals 5 USDC with 6 decimals

const division = hundredUSDC.div(half) // equals 200 USDC with 6 decimals

console.log(hundredUSDC) // outputs 100 - human readable number with decimals applied to it

hundredUSDC.decimals // equals 6
```

License
-------

MIT License
