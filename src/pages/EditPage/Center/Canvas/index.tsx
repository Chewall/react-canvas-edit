// import {_Style} from "@/store/editStoreTypes";
import styles from "./index.module.less";
import useEditStore from "@/store/editStore.ts";

export default function Canvas() {
  const {canvas} = useEditStore();
  const {cmps} = canvas
  return (
      <div id="canvas" className={styles.main} style={canvas.style}>
        {cmps.map((item) => (
            <div key={item.key}>{item.value}</div>
        ))}
      </div>
  );

}
