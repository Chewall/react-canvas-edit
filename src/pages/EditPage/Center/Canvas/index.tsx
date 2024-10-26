// import {_Style} from "@/store/editStoreTypes";
import styles from "./index.module.less";
import useEditStore from "@/store/editStore.ts";
import Cmp from "@/pages/EditPage/Center/Cmp";

export default function Canvas() {
  const {canvas, addCmp} = useEditStore();
  const {cmps, style } = canvas

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        // 1. 获取拖拽组件的相关信息
        const dragCmp = JSON.parse(e.dataTransfer.getData("drag-cmp"));
        // 2. 获取鼠标的位置
        const endX = e.pageX;
        const endY = e.pageY;

        const canvasDomPos = {
            top: 114,
            left: (document.body.clientWidth - style.width) / 2,
        };

        let disX = endX - canvasDomPos.left;
        let disY = endY - canvasDomPos.top;

        dragCmp.style.left = disX - dragCmp.style.width / 2;
        dragCmp.style.top = disY - dragCmp.style.height / 2;

        // 3. 把组件存到state store中
        addCmp(dragCmp);
    };

    const allowDraop = (e) => {
        e.preventDefault();
    };

    return (
      <div id="canvas" className={styles.main}
           style={canvas.style}
           onDrop={onDrop}
           onDragOver={allowDraop}
      >
          {cmps.map((item, index) => (
              <Cmp key={item.key} cmp={item} index={index}></Cmp>
          ))}
      </div>
  );

}
