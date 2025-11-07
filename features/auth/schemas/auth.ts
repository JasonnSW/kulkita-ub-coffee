import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Email tidak valid.",
  }),
  password: z.string().min(8, {
    message: "Password minimal 8 karakter.",
  }),
});

export const registerSchema = z
  .object({
    username: z.string().min(2, {
      message: "Nama minimal 2 karakter.",
    }),
    email: z.string().email({
      message: "Email tidak valid.",
    }),
    password: z.string().min(8, {
      message: "Password minimal 8 karakter.",
    }),
    // confirmPassword: z.string().min(8, {
    //   message: "Konfirmasi password minimal 8 karakter.",
    // }),
    // phone: z.string().optional(),
  })
  // .refine((data) => data.password === data.confirmPassword, {
  //   message: "Password tidak sama.",
  //   path: ["confirmPassword"],
  // })

export const codeFormSchema = z.object({
  unitCode: z.string().min(5, {
    message: "Kode unit minimal 5 karakter.",
  }),
})

export const inviteFormSchema = z.object({
  inviteCode: z.string().min(5, {
    message: "Kode undangan minimal 5 karakter.",
  }),
})

export const unitSchema = z.object({
  unitName: z.string().min(2, {
    message: "Nama unit minimal 2 karakter.",
  }),
  address: z.string().min(5, {
    message: "Alamat minimal 5 karakter.",
  }),
  contactPerson: z.string().min(2, {
    message: "Nama kontak minimal 2 karakter.",
  }),
  contactPhone: z.string().min(10, {
    message: "Nomor telepon minimal 10 karakter.",
  }),
})