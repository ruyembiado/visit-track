import { Link } from '@inertiajs/react';
import { BookUser, LayoutGrid, Users, FileText } from 'lucide-react';

import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';

import AppLogo from './app-logo';

import { usePage } from '@inertiajs/react';

const globalItems: NavItem[] = [
    { title: 'Dashboard', href: dashboard(), icon: LayoutGrid },
    { title: 'Visitor`s Logbook', href: '/visitors', icon: BookUser },
    { title: 'Reporting', href: '/reporting', icon: FileText },
];

const sharedAdminItems: NavItem[] = [
    { title: 'Users', href: '/users', icon: Users },
];

function getAdminItems(role: string): NavItem[] {
    const adminRoles = ['admin', 'superadmin'];
    if (adminRoles.includes(role)) {
        return sharedAdminItems;
    }

    return [];
}

const getFooterItems: NavItem[] = [
    { title: 'Users', href: '/users', icon: Users },
];

export function AppSidebar() {
    const { role } = usePage().props as any;

    const mainNavItems: NavItem[] = [
        ...globalItems,
        // ...getAdminItems(role),
    ];

    const footerNavItems: NavItem[] = [
        // ...getFooterItems,
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
