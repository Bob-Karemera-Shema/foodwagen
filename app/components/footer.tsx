import Link from "next/link";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";

const footerGroups = [
    {
        title: "Company",
        links: ["About Us", "Team", "Careers", "Blog"]
    },
    {
        title: "Contact",
        links: ["Help & Support", "Partner with us", "Ride with us"]
    },
    {
        title: "Legal",
        links: ["Terms & Conditions", "Refund & Cancellation", "Privacy Policy", "Cookie Policy"]
    }
];

const socialMedia = [
    {
        name: "instagram",
        Icon: <FaInstagram />
    },
    {
        name: "facebook",
        Icon: <FaFacebook />
    },
    {
        name: "x",
        Icon: <FaTwitter />
    }
];

export const Footer = () => {
    return (
        <footer className="mt-12 bg-foreground text-background px-4 sm:px-8 lg:px-30">
            <section className="space-y-[63px]">
                <article className="grid grid-cols-1 lg:grid-cols-2 justify-between">
                    <div className="flex flex-wrap justify-between mt-10">
                        {
                            footerGroups.map((group, i) => (
                                <div key={group.title + i} className="space-y-10">
                                    <h6 className="font-bold text-lg">{group.title}</h6>
                                    <div className="flex flex-col gap-4">
                                        {
                                            group.links.map((link, i) => (
                                                <Link key={link + i} href="#" className="text-[#f5f5f5]">
                                                    {link}
                                                </Link>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <div className="space-y-[43px] mt-10 lg:ml-50">
                        <div className="space-y-10">
                            <p className="font-bold uppercase text-[#f5f5f5] text-lg">Follow Us</p>
                            <div className="flex items-center gap-4">
                                {
                                    socialMedia.map((media, i) => {
                                        const { name, Icon } = media;
                                        return (
                                            <Link key={name + i} href="#" alt={name} className="text-[#f5f5f5]">
                                                {Icon}
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <div className="space-y-10">
                            <p className="font-bold text-lg text-[#bbbbbb]">
                                Receive exclusive offers in your mailbox
                            </p>
                            <div></div>
                        </div>
                    </div>
                </article>

                <article className="space-y-4 pb-4">
                    <Separator />
                    <div className="flex flex-col md:flex-row justify-between gap-2.5 text-[#f5f5f5]">
                        <div className="flex items-center gap-2.5">
                            <p className="text-[15px]">All rights Reserved</p>
                            <p>&copy;</p>
                            <p>Your Company, {new Date().getFullYear()}</p>
                        </div>

                        <div className="flex items-center gap-2 text-[15px]">
                            <p>Made with 💛 by</p>
                            <p className="font-bold">Themewagon</p>
                        </div>
                    </div>
                </article>
            </section>
        </footer>
    );
}