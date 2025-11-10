import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export function CustomPopover({
    children,
    trigger,
    className
}: {
    readonly children: React.ReactNode;
    readonly trigger: React.ReactNode;
    readonly className: string;
}) {
    return (
        <Popover >
            <PopoverTrigger asChild>
                {trigger}
            </PopoverTrigger>
            <PopoverContent className={className} side="left" sideOffset={15} >
                {children}
            </PopoverContent>
        </Popover>
    );
}