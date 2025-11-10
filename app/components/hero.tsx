import Image from "next/image";
import { OrderCard } from "./order-card";

export const Hero = () => {
    return (
        <section className="bg-food-light-orange overflow-hidden w-full h-[628px] grid grid-cols-1 lg:grid-cols-2">
            <article className="w-full h-full flex flex-col justify-center gap-8 px-4 lg:ml-30">
                <div className="rounded-2xl text-background">
                    <h1 className="font-bold text-[88px]">Are you starving?</h1>
                    <h6 className="text-[22px]">Within a few clicks, find meals that are accessible near you</h6>
                </div>
                <OrderCard />
            </article>
            <article className="relative hidden lg:block w-full h-full">
                <Image
                    src="/hero-img.png"
                    alt="plate of food"
                    width={2804}
                    height={2804}
                    className="w-[497px] h-[497px] absolute top-[28%] left-1/4"
                />
            </article>
        </section>
    );
}