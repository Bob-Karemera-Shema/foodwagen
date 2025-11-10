import { CustomPopover } from "@/components/custom/custom-popover";
import { Button } from "@/components/ui/button";
import { Meal } from "@/lib/types";
import { MoreVertical, Star, Tag } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";

type MealCardProps = {
    meal: Meal;
}

export const MealCard = ({ meal }: MealCardProps) => {
    return (
        <div className="rounded-2xl space-y-7 bg-background">
            {/* Image and badge container */}
            <div className="relative w-full min-h-[300px] rounded-2xl overflow-hidden">
                <div className="absolute z-2 top-6 left-6 w-[114px] h-[42px] rounded-[8px] py-2 px-4 bg-[#f17228] text-background flex items-center gap-2.5">
                    <Tag className="w-[18px] h-[22px] font-black" />
                    <span className="font-bold">${meal.Price}</span>
                </div>
                <Image src={meal.avatar} alt={meal.name + " image"} fill />
            </div>

            {/* Extra details */}
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 relative overflow-hidden rounded-xl">
                        <Image src={meal.logo} alt="restaurant logo" fill />
                    </div>

                    <div className="space-y-1">
                        <h6 className="font-bold text-[#424242]">{meal.name}</h6>
                        <div className="flex items-center gap-2 text-[#ffb30e]">
                            <Star className="w-[25px] h-[23px]" fill="#ffb30e" />
                            <span>{meal.rating}</span>
                        </div>
                    </div>
                </div>

                <CustomPopover
                    trigger={
                        <Button size="icon" variant="ghost" aria-label="User options">
                            <MoreVertical className="text-[#424242]" />
                        </Button>
                    }
                    className="shadow-lg w-full rounded-[5px] relative top-1 left-4 border border-[#edeef1] bg-background text-xs font-medium"
                >
                    <Button
                        variant="ghost"
                        className="flex items-center justify-start w-full cursor-pointer text-[#425466] hover:text-[#425466]/80"
                    >
                        Edit
                    </Button>

                    <Button
                        variant="ghost"
                        className="flex items-center justify-start w-full cursor-pointer text-[#FF3B30] hover:text-[#ff3b30]/80"
                    >
                        Delete
                    </Button>
                </CustomPopover>
            </div>

            {/* Restaurant opening status */}
            <div
                className={
                    clsx(
                        "rounded-2xl py-2 px-4 font-bold w-fit",
                        {
                            "bg-[#79B93C33] text-[#79B93C]": meal.open,
                            "bg-[#F1722833] text-[#F17228]": !meal.open
                        }
                    )
                }
            >
                { meal.open ? "Open" : "Closed" }
            </div>
        </div>
    );
}