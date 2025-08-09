"use client";

// Zod and Hook
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Other Imports
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
import { createUser, updateUser } from "@/lib/users";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { User } from "@/db/schema";

interface UserFormProps {
  user?: User;
}

export default function UserForm({ user }: UserFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = z.object({
    username: z.string().min(2).max(50),
    email: z.string().email(),
  });
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const userData = {
        ...values,
        password: "123456",
      };

      if (user) {
        await updateUser({ ...userData, id: user.id });
      } else {
        await createUser(userData);
      }

      form.reset();
      await createUser(userData);
      toast.success(`Pengguna berhasil ${user ? "diubah" : "ditambahkan"}!`);
      router.refresh();
      setIsLoading(false);
    } catch (error) {
      console.log(
        "Nama pengguna sudah ditambahkan, silakan pakai nama lain!",
        error
      );
      toast.error(
        `Nama pengguna sudah ${
          user ? "diubah" : "ditambahkan"
        }. Silakan coba beberapa saat lagi.`
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3.5">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Pengguna</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Pengguna</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} className="cursor-pointer" type="submit">
          {isLoading
            ? "Menambahkan..."
            : `${user ? "Ubah" : "Tambah"} Pengguna`}
        </Button>
      </form>
    </Form>
  );
}
