import { BigNumber } from "../src.ts/bignumber";
import { BigDecimal } from "../src.ts/BigDecimal";
import { MaxUint256 } from "@ethersproject/constants"
import { parseEther } from "@ethersproject/units"

describe("BigDecimal test", () => {

  describe("Constructor tests", () => {
    it("BigNumber", () => {
      const value = MaxUint256;
      const bd = new BigDecimal(value);
      console.log(bd);
    });
    
    it("String (dec)", () => {
      const value = "115792089237316195423570985008687907853269984665640564039457584007913129639935";
      const bd = new BigDecimal(value);
      console.log(bd);
    });
  
    it("String (hex)", () => {
      const value = "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
      const bd = new BigDecimal(value);
      console.log(bd);
    });

    it("String (parseString = true)", () => {
      const value = "1500600.123456";
      const bd = new BigDecimal(value, 6, true);
      console.log(bd);
    });

    it("Number", () => {
      const value = 10;
      const bd = new BigDecimal(value);
      console.log(bd);
    });

    it("Large Number", () => {
      const value = 1000000000;
      const bd = new BigDecimal(value);
      console.log(bd);
    });

    it("Fractional Number", () => {
      const value = 0.012345;
      const bd = new BigDecimal(value);
      console.log(bd);
    });

    it("With 6 decimals", () => {
      // 100 USDC (6 decimals)
      const bd = new BigDecimal(100, 6);
      console.log(bd);
    })
  });

  describe("toDecimals tests", () => {
    it("From 18 to 6 decimals", () => {
      const a = new BigDecimal(100);
      const result = a.toDecimals(6);
      console.log(result);
    });

    it("From 6 to 18 decimals", () => {
      const a = new BigDecimal(100, 6);
      const result = a.toDecimals(18);
      console.log(result);
    });

    it("From 6 to 6 decimals", () => {
      const a = new BigDecimal(100, 6);
      const result = a.toDecimals(6);
      console.log(result);
    });
  });

  describe("setDecimals tests", () => {
    it("From 18 to 6 decimals", () => {
      const a = new BigDecimal(100);
      const result = a.setDecimals(6);
      console.log(result);
    });

    it("From 6 to 18 decimals", () => {
      const a = new BigDecimal(100, 6);
      const result = a.setDecimals(18);
      console.log(result);
    });

    it("From 6 to 6 decimals", () => {
      const a = new BigDecimal(100, 6);
      const result = a.setDecimals(6);
      console.log(result);
    });
  });

  describe("Multiplication tests", () => {
    it("Same decimals (18 and 18)", () => {
      const a = new BigDecimal(10);
      const b = new BigDecimal(2);
      const result = a.mul(b);
      console.log(result);
    });

    it("Different decimals (18 and 0)", () => {
      const a = new BigDecimal(10);
      const b = new BigDecimal(2, 0);
      const result = a.mul(b);
      console.log(result);
    });

    it("Different decimals (0 and 18)", () => {
      const a = new BigDecimal(10, 0);
      const b = new BigDecimal(2);
      const result = a.mul(b);
      console.log(result);
    });

    it("Different decimals (6 and 18)", () => {
      const a = new BigDecimal(100, 6);
      const b = new BigDecimal(0.5);
      const result = a.mul(b);
      console.log(result);
    });

    it("With a number", () => {
      const a = new BigDecimal(100, 6);
      const b = 0.5;
      const result = a.mul(b);
      console.log(result);
    });

    it("With a BigNumber", () => {
      const a = new BigDecimal(10);
      const b = parseEther("2");
      const result = a.mul(b);
      console.log(result);
    });

    it("With a BigNumber with 6 decimals", () => {
      const a = new BigDecimal(0.5);
      const b = BigNumber.from("100000000");
      const result = a.mul(b, 6);
      console.log(result);
    });

    it("With a String", () => {
      const a = new BigDecimal(10);
      const b = "2000000000000000000";
      const result = a.mul(b);
      console.log(result);
    });

    it("With a String with 6 decimals", () => {
      const a = new BigDecimal(0.5);
      const b = "100000000";
      const result = a.mul(b, 6);
      console.log(result);
    });
  });

  describe("Division tests", () => {
    it("Same decimals (18 and 18)", () => {
      const a = new BigDecimal(10);
      const b = new BigDecimal(2);
      const result = a.div(b);
      console.log(result);
    });

    it("Same decimals (18 and 18), under 1", () => {
      const a = new BigDecimal(1);
      const b = new BigDecimal(2);
      const result = a.div(b);
      console.log(result);
    });

    it("Different decimals (18 and 0)", () => {
      const a = new BigDecimal(10);
      const b = new BigDecimal(2, 0);
      const result = a.div(b);
      console.log(result);
    });

    it("Different decimals (0 and 18)", () => {
      const a = new BigDecimal(10, 0);
      const b = new BigDecimal(2);
      const result = a.div(b);
      console.log(result);
    });

    it("Different decimals (6 and 18)", () => {
      const a = new BigDecimal(100, 6);
      const b = new BigDecimal(0.5);
      const result = a.div(b);
      console.log(result);
    });

    it("With a number", () => {
      const a = new BigDecimal(100, 6);
      const b = 0.5;
      const result = a.div(b);
      console.log(result);
    });

    it("With a BigNumber", () => {
      const a = new BigDecimal(10);
      const b = parseEther("2");
      const result = a.div(b);
      console.log(result);
    });

    it("With a BigNumber with 6 decimals", () => {
      const a = new BigDecimal(0.5);
      const b = BigNumber.from("100000000");
      const result = a.div(b, 6);
      console.log(result);
    });

    it("With a String", () => {
      const a = new BigDecimal(10);
      const b = "2000000000000000000";
      const result = a.div(b);
      console.log(result);
    });

    it("With a String with 6 decimals", () => {
      const a = new BigDecimal(0.5);
      const b = "100000000";
      const result = a.div(b, 6);
      console.log(result);
    });
  });

  describe("Addition tests", () => {
    it("Both positive 18 decimals numbers", () => {
      const a = new BigDecimal(10);
      const b = new BigDecimal(2);
      const result = a.add(b);
      console.log(result);
    });

    it("First negative number", () => {
      const a = new BigDecimal(-1);
      const b = new BigDecimal(5);
      const result = a.add(b);
      console.log(result);
    });

    it("Second negative number", () => {
      const a = new BigDecimal(3);
      const b = new BigDecimal(-5);
      const result = a.add(b);
      console.log(result);
    });

    it("Both numbers are negative", () => {
      const a = new BigDecimal(-1);
      const b = new BigDecimal(-2);
      const result = a.add(b);
      console.log(result);
    });

    it("Different decimals (6 and 18) - should throw", () => {
      const a = new BigDecimal(2, 6);
      const b = new BigDecimal(3);
      try {
        //@ts-ignore
        const result = a.add(b);
      } catch (e) {
        console.log(e)
      }
    });
  });

  describe("Subtraction tests", () => {
    it("Both positive 18 decimals numbers", () => {
      const a = new BigDecimal(10);
      const b = new BigDecimal(2);
      const result = a.sub(b);
      console.log(result);
    });

    it("First negative number", () => {
      const a = new BigDecimal(-1);
      const b = new BigDecimal(5);
      const result = a.sub(b);
      console.log(result);
    });

    it("Second negative number", () => {
      const a = new BigDecimal(3);
      const b = new BigDecimal(-5);
      const result = a.sub(b);
      console.log(result);
    });

    it("Both numbers are negative", () => {
      const a = new BigDecimal(-1);
      const b = new BigDecimal(-2);
      const result = a.sub(b);
      console.log(result);
    });

    it("Different decimals (6 and 18) - should throw", () => {
      const a = new BigDecimal(2, 6);
      const b = new BigDecimal(3);
      try {
        //@ts-ignore
        const result = a.sub(b);
      } catch (e) {
        console.log(e)
      }
    });
  });

  describe("abs tests", () => {
    it("abs of negative", () => {
      const a = new BigDecimal(-10);
      const result = a.abs();
      console.log(result);
    });
    it("abs of positive", () => {
      const a = new BigDecimal(10);
      const result = a.abs();
      console.log(result);
    });
  })
});