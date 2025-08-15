import { getUsers } from "@/lib/users";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React from "react";
import { Button } from "./ui/button";
import { PencilIcon } from "lucide-react";
import DeleteUserButton from "./DeleteUserButton";
import UserForm from "./UserForm";

const UserTable = async () => {
  const users = await getUsers();
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Email</TableHead>
            <TableHead>Nama Pengguna</TableHead>
            <TableHead>Dibuat pada</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.email}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.createdAt?.toLocaleString()}</TableCell>
              <TableCell className="justify-end flex">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant={"ghost"} className="cursor-pointer">
                      <PencilIcon className="size-3.5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Apakah anda yakin?</DialogTitle>
                      <DialogDescription>
                        Dengan menekan tombol ini, Anda akan menghapus pengguna
                        secara permanen. Ini tidak dapat dibatalkan.
                      </DialogDescription>
                      <UserForm user={user} />
                    </DialogHeader>
                  </DialogContent>
                </Dialog>

                <DeleteUserButton userId={user.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default UserTable;
