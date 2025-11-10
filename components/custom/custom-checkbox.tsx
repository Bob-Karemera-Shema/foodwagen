"use client";

import clsx from "clsx";
import { IconType } from "react-icons";

interface CustomCheckboxProps {
    label: string;
    Icon: IconType
    checked: boolean;
    setCheckedAction: () => void;
}
export const CustomCheckbox = ({
    label,
    Icon,
    checked,
    setCheckedAction,
}: CustomCheckboxProps) => {
    return (
        <button
            type="button"
            onClick={setCheckedAction}
            className={clsx(
                "py-2.5 px-6 rounded-[8px] flex items-center gap-2.5 text-[#757575] text-lg border-none",
                {
                    "bg-[#f17228]/10 text-[#f17228]": checked,
                }
            )}
        >
            <Icon className="font-black" />
            <span className="font-bold">{label}</span>
        </button>
    );
};
