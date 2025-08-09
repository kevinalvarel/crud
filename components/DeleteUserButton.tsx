"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Trash2Icon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteUser } from "@/lib/users";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface DeleteUserButtonProps {
  userId: string;
}

export default function DeleteUserButton({ userId }: DeleteUserButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteUser(userId);
      setIsOpen(false);
      router.refresh();
      toast.success("Pengguna berhasil dihapus");
    } catch (error) {
      console.log("Gagal mengapus", error);
      toast.error("Gagal menghapus pengguna");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant={"destructive"} className="cursor-pointer">
            <Trash2Icon className="size-3.5" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apakah anda yakin?</DialogTitle>
            <DialogDescription>
              Dengan menekan tombol ini, Anda akan menghapus pengguna secara
              permanen. Ini tidak dapat dibatalkan.
            </DialogDescription>
            <Button
              disabled={isLoading}
              variant="destructive"
              className="mt-4 cursor-pointer"
              onClick={handleDelete}
            >
              {isLoading ? "Menghapus..." : "Hapus Pengguna"}
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
