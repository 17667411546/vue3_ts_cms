<template>
    <div class="base-echart">
        <div ref="echartDivRef" :style="{ width, height }"></div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, withDefaults, watchEffect } from "vue";
import { EChartsOption } from "echarts";
import useEchart from "../hooks/useEchart";

const echartDivRef = ref<HTMLElement>();
//定义props
//设置默认值
const props = withDefaults(
    defineProps<{
        width?: string;
        height?: string;
        options: EChartsOption;
    }>(),
    {
        width: "100%",
        height: "360px"
    }
);

onMounted(() => {
    const { setOptions } = useEchart(echartDivRef.value!);
    watchEffect(() => {
        setOptions(props.options);
    });
});
</script>

<style scoped></style>
