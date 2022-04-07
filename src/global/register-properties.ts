import { App } from "vue";
import { formatUtcString, formatTimestamp } from "@/utils/date-format";

export default function registerProperties(app: App) {
    app.config.globalProperties.$filters = {
        formatTime(value: string) {
            return formatUtcString(value);
        },
        formatTimestamp(value: number) {
            return formatTimestamp(value);
        }
    };
}
