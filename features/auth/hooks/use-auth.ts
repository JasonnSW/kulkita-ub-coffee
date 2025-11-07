import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { register, createUnit, codeForm, InviteForm } from "../services/auth";
import { loginAction } from "../actions/auth";

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: loginAction,
    onSuccess: () => {
      toast.success("Selamat datang kembali di Kulkita");
      router.push("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
}

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: register,
    onSuccess: (data: any) => {
      toast.success(data.message);
      router.push("/auth");
    },
    onError: () => {
      toast.error("Terjadi kesalahan saat membuat akun");
    },
  });
}

export function useCreateUnit() {
  const router = useRouter();

  return useMutation({
    mutationFn: createUnit,
    onSuccess: () => {
      toast.success("Anda telah berhasil membuat unit Mitra baru");
      router.push("/dashboard");
    },
    onError: () => {
      toast.error("Terjadi kesalahan saat membuat unit Mitra");
    },
  });
}

export function useCodeForm() {
  const router = useRouter();

  return useMutation({
    mutationFn: codeForm,
    onSuccess: () => {
      toast.success("Anda telah berhasil membuat kode baru");
      router.push("/dashboard");
    },
    onError: () => {
      toast.error("Terjadi kesalahan saat membuat kode");
    },
  });
}

export function useInviteForm() {
  const router = useRouter();

  return useMutation({
    mutationFn: InviteForm,
    onSuccess: () => {
      toast.success("Anda telah berhasil membuat undangan baru");
      router.push("/dashboard");
    },
    onError: () => {
      toast.error("Terjadi kesalahan saat membuat undangan");
    },
  });
}
