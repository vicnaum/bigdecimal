import { BigNumber, BigNumberish } from './bignumber';
export declare class BigDecimal extends BigNumber {
    value: number;
    decimals: number;
    constructor(value: BigNumberish, decimals?: number);
    mul(b: BigDecimal | BigNumberish, b_decimals?: number): BigDecimal;
    div(b: BigDecimal | BigNumberish, b_decimals?: number): BigDecimal;
    add(b: BigDecimal | BigNumberish, b_decimals?: number): BigDecimal;
    sub(b: BigDecimal | BigNumberish, b_decimals?: number): BigDecimal;
    toDecimals(newDecimals?: number): BigDecimal;
}
//# sourceMappingURL=BigDecimal.d.ts.map