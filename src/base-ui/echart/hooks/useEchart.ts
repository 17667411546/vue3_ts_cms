import * as echart from "echarts";
import china from "../data/china.json";

echart.registerMap("china", china);
export default function (el: HTMLElement) {
    const echartInstance = echart.init(el);
    const setOptions = (options: echart.EChartsOption) => {
        echartInstance.setOption(options);
    };
    const updateSize = () => {
        echartInstance.resize();
    };
    window.addEventListener("resize", () => {
        echartInstance.resize();
    });
    return {
        echartInstance,
        setOptions,
        updateSize
    };
}
