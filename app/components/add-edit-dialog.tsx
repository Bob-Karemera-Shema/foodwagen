"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Meal } from "@/lib/types";
import { AddEditForm } from "./add-edit-form";
import { ReactNode, useState } from "react";

type AddEditDialogProps = {
    readonly meal?: Meal;
    readonly trigger: ReactNode;
};

export function AddEditDialog({ meal, trigger }: AddEditDialogProps) {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="max-w-[934px] w-full rounded-3xl flex flex-col items-center gap-5 p-10">
                <DialogHeader>
                    <DialogTitle className="font-bold text-2xl sm:text-3xl lg:text-[40px] text-[#ff9a0e]">{meal ? "Edit meal" : "Add a meal"}</DialogTitle>
                </DialogHeader>

                <AddEditForm meal={meal} onSuccessAction={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    )
}