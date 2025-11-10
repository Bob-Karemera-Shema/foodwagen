"use client";
import React from "react";
import { Input } from "../ui/input";
import {
    FormItem,
    FormControl,
    FormMessage,
    useFormField,
} from "../ui/form";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    ariaLabel: string;
    placeholder?: string;
}
export const CustomInput: React.FC<CustomInputProps> = ({
    ariaLabel,
    className,
    placeholder,
    type = "text",
    ...field
}) => {
    const { error } = useFormField();
    const id = `#food-${ariaLabel.toLowerCase()}`;

    return (
        <FormItem>
            <FormControl>
                <Input
                    {...field}
                    id={id}
                    name={field.name}
                    type={type}
                    aria-label={ariaLabel}
                    data-error={!!error}
                    placeholder={placeholder || "Type here..."}
                    className={className}
                />
            </FormControl>
            <FormMessage className="text-xs" />
        </FormItem>
    );
};