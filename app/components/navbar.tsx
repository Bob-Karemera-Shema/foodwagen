import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Navbar = () => {
    return (
        <nav className="w-full h-fit py-4 px-4 sm:px-8 lg:px-55 bg-background shadow-lg shadow-[#ffba26] flex justify-between items-center">
            <div className="flex items-center gap-[11.5px]">
                <Image src="/logo.png" alt="FoodWagen logo" width={28} height={30} priority />
                <p className="text-[31.11px] tracking-[-2.5%] leading-[120%] font-bold">
                    <span className="text-food-dark-orange">Food</span>
                    <span className="text-food-light-orange">Wagen</span>
                </p>
            </div>
            <Button type="button" className="shadow-sm shadow-[#ffba26] bg-linear-to-r from-[#ffba26] to-[#ff9a0e] rounded-[14px] py-3 px-6">
                Add Meal
            </Button>
        </nav>
    );
}