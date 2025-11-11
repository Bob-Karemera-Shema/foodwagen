"use client"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Meal } from "@/lib/types";
import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/api";
import { toast } from "sonner";
import { useMeals } from "@/lib/hooks";

type DeleteDialogProps = {
    readonly meal?: Meal;
    readonly trigger: ReactNode;
};

export function DeleteDialog({ meal, trigger }: DeleteDialogProps) {
    const { reload } = useMeals();
    const [open, setOpen] = useState(false);

    const onDelete = async () => {
        if (!meal) return;

        try {
            await apiRequest<Meal>(`/Food/${meal.id}`, "DELETE");

            toast("Food successfully deleted");
            reload();
            setOpen(false);
        }
        catch (err) {
            const message = err instanceof Error ? err.message : "Unexpected error! Please try again.";
            toast(message);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="max-w-[934px] w-full rounded-3xl flex flex-col items-center gap-5 p-10">
                <DialogHeader>
                    <DialogTitle className="font-bold text-2xl sm:text-3xl lg:text-[40px] text-[#ff9a0e]">
                        Delete Meal
                    </DialogTitle>
                </DialogHeader>

                <DialogDescription className="text-muted-foreground">
                    Are you sure you want to delete this meal? Actions cannot be reversed.
                </DialogDescription>

                <DialogFooter className="w-full grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    <Button
                        type="button"
                        className="rounded-[14px] py-[21px] px-12 bg-linear-to-r from-[#ffb126] to-[#ff9a0e]"
                        onClick={onDelete}
                    >
                        Yes
                    </Button>
                    <DialogClose asChild>
                        <Button
                            variant="outline"
                            className="rounded-[14px] border border-[#ffba26] py-[21px] px-12"
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}