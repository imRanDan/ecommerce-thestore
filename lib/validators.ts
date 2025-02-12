import { z } from "zod";
import { fortmatNumberWithDecimal } from "./utils";

const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(fortmatNumberWithDecimal(Number(value))),
    "Price must have exactly two decimal places"
  );

// This will be the schema for inserting producgs
export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  category: z.string().min(3, "Category must be at least 3 characters"),
  brand: z.string().min(3, "Brand must be at least 3 characters"),
  description: z.string().min(3, "Description must be at least 3 characters"),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, "Product must have at least 1 image"),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});

// This will be the schema for signing users in
export const signInFormScheme = z.object({
  email: z.string().email("Invalid email addresss"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

//This will be the schema for signing up to the app
export const signUpFormSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email addresss"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirmed Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
