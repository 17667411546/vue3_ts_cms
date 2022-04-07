import { useStore } from "@/store";
export function usePermission(pageName: string, hanleName: string) {
    const store = useStore();
    const { permissions } = store.state.login;
    const verifyPermission = `system:${pageName}:${hanleName}`;
    return permissions.includes(verifyPermission);
}
