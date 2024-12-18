import useEditStore, {updateAssemblyCmpsByDistance} from "@/store/editStore";
import styles from "./index.module.less";
import {throttle} from "lodash";
import StretchDots from "@/pages/EditPage/Center/EditBox/StretchDots";
import useZoomStore from "@/store/zoomStore.ts";

export default function EditBox() {
  const cmps = useEditStore((state) => state.canvas.cmps);
  const assembly = useEditStore((state) => state.assembly);

  const zoom = useZoomStore((state) => state.zoom);
  const onMouseDownOfCmp = (e) => {
    let startX = e.pageX;
    let startY = e.pageY;

    const move = throttle((e) => {
      const x = e.pageX;
      const y = e.pageY;

      let disX = x - startX;
      let disY = y - startY;

      updateAssemblyCmpsByDistance({top: disY, left: disX});


      startX = x;
      startY = y;
    }, 50);

    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };

  const size = assembly.size;
  if (size === 0) {
    return null;
  }

  let top = 9999,
    left = 9999,
    bottom = -9999,
    right = -9999;

  assembly.forEach((index) => {
    const cmp = cmps[index];
    top = Math.min(top, cmp.style.top);
    left = Math.min(left, cmp.style.left);

    bottom = Math.max(bottom, cmp.style.top + cmp.style.height);
    right = Math.max(right, cmp.style.left + cmp.style.width);
  });

  let width = right - left + 8;
  let height = bottom - top + 8;

  top -= 4;
  left -= 4;

  return (
    <div
      className={styles.main}
      style={{
        zIndex: 99999,
        top,
        left,
        width,
        height,
      }}
      onMouseDown={onMouseDownOfCmp}>
      <StretchDots zoom={zoom} style={{width, height}}/>
    </div>
  );
}
