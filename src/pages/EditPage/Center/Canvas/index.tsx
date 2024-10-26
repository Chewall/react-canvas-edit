import styles from "./index.module.less";
import useEditStore, { addCmp } from "@/store/editStore.ts";
import Cmp from "@/pages/EditPage/Center/Cmp";

export default function Canvas() {
    const { canvas } = useEditStore();
    const { cmps, style } = canvas;

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        const dragCmp = JSON.parse(e.dataTransfer.getData("drag-cmp"));
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

        addCmp(dragCmp);
    };

    const allowDraop = (e) => {
        e.preventDefault();
    };

    return (
        <div
            id="canvas"
            className={styles.main}
            style={canvas.style}
            onDrop={onDrop}
            onDragOver={allowDraop}
        >
            {cmps.map((item, index) => (
                <Cmp key={item.key} cmp={item} index={index} />
            ))}
        </div>
    );
}
