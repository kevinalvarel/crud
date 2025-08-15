import { Button } from "@/components/ui/button";
import UserTable from "@/components/UserTable";
import { UserPlus2Icon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserForm from "@/components/UserForm";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <div className="flex flex-col gap-4 mx-auto max-w-7xl p-4 md:p-24">
      <h1 className="text-2xl font-bold">CATAT NAMA PENGGUNA</h1>
      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="cursor-pointer">
              Tambah Pengguna
              <UserPlus2Icon />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Masukkan nama dan email pengguna</DialogTitle>
              <DialogDescription>
                Silakan masukkan detail pengguna baru yang ingin Anda tambahkan.
              </DialogDescription>
              <UserForm />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <UserTable />
    </div>
  );
}
