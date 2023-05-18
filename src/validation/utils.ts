import { z } from "zod";

export const numeric = () => z.string().regex(/^\d+$/);
export const alphaNumeric = () => z.string().regex(/^[a-zA-Z0-9]*$/);
export const objectId = () => z.string().regex(/^[0-9a-fA-F]{24}$/);
