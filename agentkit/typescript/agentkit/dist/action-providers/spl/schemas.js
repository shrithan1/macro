"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferTokenSchema = void 0;
const zod_1 = require("zod");
/**
 * Schema for transferring SPL tokens to another address.
 */
exports.TransferTokenSchema = zod_1.z
    .object({
    recipient: zod_1.z.string().describe("The recipient's Solana address"),
    mintAddress: zod_1.z.string().describe("The SPL token's mint address"),
    amount: zod_1.z.number().positive().describe("Amount of tokens to transfer"),
})
    .describe("Transfer SPL tokens to another Solana address");
