import { BigNumber, BigNumberish } from './bignumber';
import { parseFixed } from './fixednumber';

// This library is supposed to help with Ethereum units conversion
// It is an extension (wrapper) of the BigNumber, with some decimals logic involved
// All standard math functions are performed taking decimals into account
// After creating an instance of BigDecimal you can access:
//    - rawValue (original BigNumber)
//    - decimals (number of decimals in this number)
//    - value (normalized value, based on these decimals)
//
//    e.g. Original BigNumber is 1d18 (1d18 means 1 with 18 zeroes as decimal places = 1e18)
//         then decimals will be 18
//         and value will be 1.0 (a simple js float number)
export class BigDecimal extends BigNumber {
  public value: number;
  public decimals: number;

  // BigDecimal accepts any BigNumber | string | number as an argument
  // and the number of decimals (default = 18).
  // If the argument is BigNumber - decimals are assigned to it:
  //    e.g. BN(1 000 000) with 6 decimals becomes a value of 1.0
  // If the argument is string - there are two options, depending on parseString:
  //    1) parseString = false: decimals are either assigned to it
  //    e.g. BigDecimal("1000000", 6) is BN("1000000") with value of 1.0
  //    2) parseString = true: string is parsed and converted to bignumber with decimals specified.
  //    e.g. BigDecimal("1.5", 6) becomes BN("1500000") with value of 1.5
  // If the argument is a number - it is converted to BigNumber with specified number of decimals
  //    e.g. 1.0 as a number with 6 decimals becomes BN(1 000 000)
  constructor(value: BigNumberish, decimals: number = 18, parseString: boolean = false) {
    switch (typeof value) {
      case 'object':
        super({}, value instanceof BigNumber ? value.toHexString() : BigNumber.from(value).toHexString());
        this.decimals = decimals;
        this.value = parseFloat(this.toString()) / Math.pow(10, decimals);
        break;
      case 'string':
        if (parseString) {
          super({}, parseFixed(value, decimals).toHexString());
          this.decimals = decimals;
          this.value = parseFloat(value);
        } else {
          super({}, BigNumber.from(value).toHexString());
          this.decimals = decimals;
          this.value = parseFloat(this.toString()) / Math.pow(10, decimals);
        }
        break;
      case 'number':
        super({}, parseFixed(value.toLocaleString('fullwide', { useGrouping: false, maximumSignificantDigits: 21}), decimals).toHexString());
        this.decimals = decimals;
        this.value = value;
        break;
      default:
        throw new Error('Not supported type');
    }
    Object.freeze(this);
  }

  // When multiplying - we preserve decimals from the first operand (a) in the result
  // Multiplication is done with decimals in mind (so 2d18 * 3d18 = 6d18)
  // You can also multiply by any number, BigNumber or string
  // If operand B is not BigDecimal - then you can specify decimals of operand B (default = 18)
  mul(b: BigDecimal | BigNumberish, b_decimals: number = 18): BigDecimal {
    const b_BD = b instanceof BigDecimal ? b : new BigDecimal(b, b_decimals);

    const result_BN = super.mul(b_BD).div(BigNumber.from(10).pow(b_BD.decimals));
    return new BigDecimal(result_BN, this.decimals);
  }

  // When dividing - we preserve decimals from the first operand (a) in the result
  // Division is done with decimals in mind (so 8d18 / 2d18 = 4d18)
  // You can also divide by BigNumber, number or string
  // If operand B is not BigDecimal - then you can specify decimals of operand B (default = 18)
  div(b: BigDecimal | BigNumberish, b_decimals: number = 18): BigDecimal {
    const b_BD = b instanceof BigDecimal ? b : new BigDecimal(b, b_decimals);

    const result_BN = super.mul(BigNumber.from(10).pow(b_BD.decimals)).div(b_BD);
    return new BigDecimal(result_BN, this.decimals);
  }

  // When performing addition - operands must have the same decimals
  // Otherwise it's like mixing oranges and apples - something is definitely wrong.
  // You can also perform addition with a BigNumber, number or string
  // If operand B is not BigDecimal - then you can specify decimals of operand B (default = 18)
  add(b: BigDecimal | BigNumberish, b_decimals: number = 18): BigDecimal {
    const b_BD = b instanceof BigDecimal ? b : new BigDecimal(b, b_decimals);

    if (this.decimals != b_BD.decimals) {
      throw 'Cannot add with different decimals';
    }

    const result_BN = super.add(b_BD);
    return new BigDecimal(result_BN, this.decimals);
  }

  // When performing subtraction - operands must have the same decimals
  // Otherwise it's like mixing oranges and apples - something is definitely wrong.
  // You can also perform subtraction with a BigNumber, number or string
  // If operand B is not BigDecimal - then you can specify decimals of operand B (default = 18)
  sub(b: BigDecimal | BigNumberish, b_decimals: number = 18): BigDecimal {
    const b_BD = b instanceof BigDecimal ? b : new BigDecimal(b, b_decimals);

    if (this.decimals != b_BD.decimals) {
      throw 'Cannot subtract with different decimals';
    }

    const result_BN = super.sub(b_BD);
    return new BigDecimal(result_BN, this.decimals);
  }

  // Converts decimals, retaining the value
  // (but rawValue changes to correspond to new decimals)
  //    e.g. 1d6.toDecimals(18) becomes 1d18
  toDecimals(newDecimals: number = 18): BigDecimal {
    if (newDecimals == this.decimals) return this;
    if (newDecimals > this.decimals) {
      const decimalsDiff = newDecimals - this.decimals;
      const result_BN = super.mul(BigNumber.from(10).pow(decimalsDiff));
      return new BigDecimal(result_BN, newDecimals);
    } else {
      const decimalsDiff = this.decimals - newDecimals;
      const result_BN = super.div(BigNumber.from(10).pow(decimalsDiff));
      return new BigDecimal(result_BN, newDecimals);
    }
  }

  // Converts decimals, retaining the value
  // (but rawValue changes to correspond to new decimals)
  //    e.g. 1d6.toDecimals(18) becomes 1d18
  setDecimals(newDecimals: number = 18): BigDecimal {
    if (newDecimals == this.decimals) return this;
    return new BigDecimal(this, newDecimals);
  }
}
