"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { codeFormSchema, inviteFormSchema } from "../schemas/auth";
import { useCodeForm, useInviteForm } from "../hooks/use-auth";

export function JoinUnitForm() {
  const { mutate: codeFormSubmit, isPending: isCodePending } = useCodeForm();

  const { mutate: inviteFormSubmit, isPending: isInvitePending } =
    useInviteForm();

  const codeForm = useForm<z.infer<typeof codeFormSchema>>({
    resolver: zodResolver(codeFormSchema),
    defaultValues: {
      unitCode: "",
    },
  });

  const inviteForm = useForm<z.infer<typeof inviteFormSchema>>({
    resolver: zodResolver(inviteFormSchema),
    defaultValues: {
      inviteCode: "",
    },
  });

  function onCodeSubmit(values: z.infer<typeof codeFormSchema>) {
    codeFormSubmit(values);
  }

  function onInviteSubmit(values: z.infer<typeof inviteFormSchema>) {
    inviteFormSubmit(values);
  }

  return (
    <Tabs defaultValue="code" className="w-full mt-4">
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value="code">Kode Unit</TabsTrigger>
        <TabsTrigger value="invite">Kode Undangan</TabsTrigger>
      </TabsList>
      <TabsContent value="code">
        <Form {...codeForm}>
          <form
            onSubmit={codeForm.handleSubmit(onCodeSubmit)}
            className="space-y-4"
          >
            <FormField
              control={codeForm.control}
              name="unitCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kode Unit Operasional</FormLabel>
                  <FormControl>
                    <Input placeholder="UNIT-JBR-001" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isCodePending}>
              {isCodePending ? "Memproses..." : "Gabung Unit"}
            </Button>
          </form>
        </Form>
      </TabsContent>
      <TabsContent value="invite">
        <Form {...inviteForm}>
          <form
            onSubmit={inviteForm.handleSubmit(onInviteSubmit)}
            className="space-y-4"
          >
            <FormField
              control={inviteForm.control}
              name="inviteCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kode Undangan</FormLabel>
                  <FormControl>
                    <Input placeholder="INV-XXXXX-XXXXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isInvitePending}>
              {isInvitePending ? "Memproses..." : "Gunakan Undangan"}
            </Button>
          </form>
        </Form>
      </TabsContent>
    </Tabs>
  );
}
