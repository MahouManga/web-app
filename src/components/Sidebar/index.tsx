'use server';

import { validateRequest } from '@/lib/auth';
import SidebarBase from './sidebar'
import SidebarHeader from './header';

export default async function Sidebar({ children }: { children: React.ReactNode }) {
    const { user } = await validateRequest();
    return (
        <SidebarBase user={user}>
            {children}
        </SidebarBase>
    );
}