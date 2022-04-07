import { ref } from "vue";
import PageModal from "@/components/page-modal";

type CallbackFn = (item?: any) => void;

export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
    const pageModalRef = ref<InstanceType<typeof PageModal>>();
    const defaultInfo = ref({});
    const handleNewData = (createTitle?: string) => {
        defaultInfo.value = {};
        if (pageModalRef.value) {
            pageModalRef.value.dialogVisible = true;
            pageModalRef.value!.title = createTitle || "新建用户";
        }
        newCb && newCb();
    };
    const handleEditData = (item: any, editName?: string) => {
        defaultInfo.value = { ...item };
        if (pageModalRef.value) {
            pageModalRef.value.dialogVisible = true;
            pageModalRef.value!.title = editName || "编辑用户";
        }
        editCb && editCb(item);
    };
    return [pageModalRef, defaultInfo, handleNewData, handleEditData];
}
