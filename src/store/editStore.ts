import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import {EditStoreState, EditStoreAction, ICanvas, ICmp, Style} from "./editStoreTypes";
import {getOnlyKey} from "@/utils";
import {enableMapSet} from "immer";

enableMapSet(); // 添加这行代码启用对 Map 和 Set 的支持
const useEditStore = create(
    immer<EditStoreState & EditStoreAction>((set) => ({
      canvas: getDefaultCanvas(),
      assembly: new Set(),
    }))
);

export const clearCanvas = ()=>{
  useEditStore.setState((draft)=>{
    draft.canvas = getDefaultCanvas()
    draft.assembly.clear()
  })
}

export const addCmp = (_cmp: ICmp) => {
  useEditStore.setState((draft) => {
    draft.canvas.cmps.push({..._cmp, key: getOnlyKey()});
    draft.assembly = new Set([draft.canvas.cmps.length-1]);
  });
};


export const saveCanvas = async (
    id: number | null,
    type: string,
    successCallback: (id: number) => void
) => {
  // const canvas = useEditStore.getState().canvas;
  // const res: any = await Axios.post(saveCanvasEnd, {
  //   id,
  //   title: canvas.title,
  //   content: JSON.stringify(canvas),
  //   type,
  // });

  // successCallback(res?.id);
  console.log("Debug__111 :", 111)
};

export const fetchCanvas = async (id: number) => {
  // const res: any = await Axios.get(getCanvasByIdEnd + id);
  //
  // if (res) {
  //   useEditStore.setState((draft) => {
  //     draft.canvas = JSON.parse(res.content);
  //     draft.canvas.title = res.title;
  //   });
  // }
  console.log("Debug__id :", id)
};

// ! 选中组件
// 全部选中
export const setAllCmpsSelected = () => {
  useEditStore.setState((draft) => {
    let len = draft.canvas.cmps.length;
    draft.assembly = new Set(Array.from({length: len}, (a, b) => b));
  });
};

// 选中多个
// 如果再次点击已经选中的组件，则取消选中
export const setCmpsSelected = (indexes: Array<number>) => {
  useEditStore.setState((draft) => {
    if (indexes)
      indexes.forEach((index) => {
        if (draft.assembly.has(index)) {
          // 取消这个组件的选中
          draft.assembly.delete(index);
        } else {
          // 选中
          draft.assembly.add(index);
        }
      });
  });
};

// 选中单个
// 如果index为-1，则取消选中
export const setCmpSelected = (index: number) => {
  if (index === -1) {
    useEditStore.setState((draft) => {
      if (draft.assembly.size > 0) {
        draft.assembly.clear();
      }
    });
  } else if (index > -1) {
    useEditStore.setState((draft) => {
      draft.assembly = new Set([index]);
    });
  }
};

// ! 修改组件属性
// 根据改变的量来修改
/*export const updateAssemblyCmpsByDistance = (newStyle: Style) => {
  useEditStore.setState((draft) => {
    draft.assembly.forEach((index) => {
      const cmp = draft.canvas.cmps[index];
      for (const key in newStyle) {
        cmp.style[key] += newStyle[key];
      }
    });
  });
};*/

export const updateAssemblyCmpsByDistance = (newStyle: Style) => {
  useEditStore.setState((draft) => {
    draft.assembly.forEach((index) => {
      const cmp = draft.canvas.cmps[index];
      let invalid = false

      for (const key in newStyle) {
        // 使用类型断言
        const styleKey = key as keyof Style;
        // 确保类型安全
        if (typeof cmp.style[styleKey] === 'number' && typeof newStyle[styleKey] === 'number') {
          if (
              (styleKey === "width" || styleKey === "height") &&
              cmp.style[styleKey] + newStyle[styleKey] < 2
          ) {
            invalid = true;
            break;
          }
          cmp.style[styleKey] += newStyle[styleKey] as number;
        } else {
          cmp.style[styleKey] = newStyle[styleKey];
        }
        if (!invalid) {
          draft.canvas.cmps[index] = cmp;
        }
      }
    });
  });
};



export default useEditStore;

function getDefaultCanvas(): ICanvas {
  return {
    title: "未命名",
    // 页面样式
    style: {
      width: 320,
      height: 568,
      backgroundColor: "#ffffff",
      backgroundImage: "",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    },
    // 组件
    cmps: [],
  };
}
