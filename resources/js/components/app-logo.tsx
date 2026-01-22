import { Users } from 'lucide-react';
import { Icon } from './ui/icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                <Icon iconNode={Users} className="h-5 w-5 dark:text-black" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    VisitTrack
                </span>
            </div>
        </>
    );
}
