import { Button } from "@/components/ui/button";
import UserTable from "@/components/ui/UserTable";
import { UserPlus2Icon } from "lucide-react";

export default async function Home() {
  return (
    <div className="flex flex-col gap-4 mx-auto max-w-7xl p-4 md:p-24">
      <h1 className="text-2xl font-bold">List Pengguna</h1>
      <div className="flex justify-end">
        <Button className="cursor-pointer">
          Tambah Pengguna
          <UserPlus2Icon />
        </Button>
      </div>
      <UserTable />
    </div>
  );
}
