import styles from "./index.module.less";
import Canvas from "./Canvas";
import {setAllCmpsSelected, setCmpSelected} from "@/store/editStore.ts";

export default function Center() {

    const keyDown = (e) => {
        if (e.ctrlKey) {
            switch (e.code) {
                case "KeyA":
                    setAllCmpsSelected();
                    return;
            }
        }
    }
    return (
        <div id="center" className={styles.main} tabIndex={0}
             onClick={(e) => {
                 if (e.target?.id === "center") {
                     setCmpSelected(-1)
                 }
             }}
             onKeyDown={keyDown}>
            <Canvas/>
        </div>
    );
}
