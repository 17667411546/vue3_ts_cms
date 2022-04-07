<template>
    <div class="rose-echart">
        <base-echart :options="options"></base-echart>
    </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import BaseEchart from "@/base-ui/echart";
import { ISeries } from "../types";

const props = defineProps<{
    roseData: ISeries[];
}>();
const options = computed(() => {
    return {
        legend: {
            top: "bottom"
        },
        tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        series: [
            {
                name: "类别数据",
                type: "pie",
                radius: [15, 110],
                center: ["50%", "50%"],
                roseType: "area",
                itemStyle: {
                    borderRadius: 5
                },
                data: props.roseData
            }
        ]
    };
});
</script>

<style scoped></style>
