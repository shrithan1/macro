import { z } from "zod";
/**
 * Schema for transferring SPL tokens to another address.
 */
export declare const TransferTokenSchema: z.ZodObject<{
    recipient: z.ZodString;
    mintAddress: z.ZodString;
    amount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    amount: number;
    recipient: string;
    mintAddress: string;
}, {
    amount: number;
    recipient: string;
    mintAddress: string;
}>;
