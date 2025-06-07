import crypto from "crypto";

export const cryptPassword = (password: string): string => {
   const salt = crypto.randomBytes(32).toString("hex");
   const hash = crypto.createHmac("sha256", salt);
   hash.update(password);
   return hash.digest("hex");
}