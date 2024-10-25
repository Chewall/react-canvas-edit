// file: src/request/list.ts
import {common, myAxios} from "./index";

// 定义 successCallback 和 failedCallback 的具体类型
type SuccessCallback = (result: { status: number; data: { code: number; result: any } }) => void;
type FailedCallback = () => void;

// 定义虚拟数据的接口
interface ListItem {
  id: number;
  type: string; // 页面、模板页面
  title: string;
  content: string;
}

// 构造虚拟数据
const mockTemplateList: ListItem[] = [];
for (let i = 1; i <= 10; i++) {
  mockTemplateList.push({
    id: i,
    type: i % 2 === 0 ? 'template' : 'content', // 偶数为模板页，奇数为页面
    title: `模板 ${i}`,
    content: `这是模板内容 ${i}`
  });
}

// 查询页面列表
export function getCanvasList(
    values: any,
    successCallback: SuccessCallback,
    failedCallback?: FailedCallback
) {
  successCallback({ status: 200, data: { code: 200, result: mockTemplateList } });
}

// 修改 getTemplateList 函数，直接返回虚拟数据
export function getTemplateList(
    values: any,
    successCallback: SuccessCallback,
    failedCallback?: FailedCallback
) {
  successCallback({ status: 200, data: { code: 200, result: mockTemplateList } });
}

// 删除
export function deleteCanvas(
    values: {id: number},
    successCallback: Function,
    failedCallback?: Function
) {
  myAxios.post("/api/web/content/delete", values).then((res) => {
    common(res, successCallback);
  });
}
