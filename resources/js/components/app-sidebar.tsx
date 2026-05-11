import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen, DollarSign, FileText, Folder, GraduationCap,
    LayoutGrid, Mail, ShoppingBag, Tag, Tags, Users, Zap,
} from 'lucide-react';
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
import type { NavItem, SharedData } from '@/types';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    { title: 'Dashboard', href: dashboard(), icon: LayoutGrid },
];

const adminOverviewItems: NavItem[] = [
    { title: 'Tableau de bord', href: '/admin', icon: LayoutGrid },
];

const adminContentItems: NavItem[] = [
    { title: 'Actions',    href: '/admin/actions',   icon: Zap },
    { title: 'Programmes', href: '/admin/programs',  icon: GraduationCap },
    { title: 'Produits',   href: '/admin/products',  icon: ShoppingBag },
    { title: 'Projets',    href: '/admin/projects',  icon: Folder },
];

const adminPublicationItems: NavItem[] = [
    { title: 'Articles',   href: '/admin/blog',        icon: BookOpen },
    { title: 'Catégories', href: '/admin/categories',  icon: Tags },
    { title: 'Tags',       href: '/admin/tags',         icon: Tag },
];

const adminCommunityItems: NavItem[] = [
    { title: 'Dons',       href: '/admin/donations',  icon: DollarSign },
    { title: 'Bénévoles',  href: '/admin/volunteers', icon: Users },
    { title: 'Messages',   href: '/admin/messages',   icon: Mail },
];

const adminSiteItems: NavItem[] = [
    { title: 'Page Mission',  href: '/admin/pages/about',  icon: FileText },
    { title: 'Page Valeurs',  href: '/admin/pages/values', icon: FileText },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const isAdmin = auth.user.role === 'admin' || auth.user.role === 'editor';

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
                <NavMain items={mainNavItems} label="Général" />
                {isAdmin && (
                    <>
                        <NavMain items={adminOverviewItems}    label="Admin" />
                        <NavMain items={adminContentItems}     label="Contenu" />
                        <NavMain items={adminPublicationItems} label="Publication" />
                        <NavMain items={adminCommunityItems}   label="Communauté" />
                        <NavMain items={adminSiteItems}        label="Pages du site" />
                    </>
                )}
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
