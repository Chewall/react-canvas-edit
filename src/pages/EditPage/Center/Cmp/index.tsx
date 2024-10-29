import {ICmpWithKey} from "@/store/editStoreTypes";
import styles from "./index.module.less";
import {isImgComponent, isTextComponent} from "../../LeftSider";
import {Img, Text} from "./CmpDetail";
import classNames from "classnames";
import {omit, pick} from "lodash";
// import {setCmpSelected, setCmpsSelected} from "@/store/editStore";
import {memo} from "react";
import {setCmpSelected, setCmpsSelected} from "@/store/editStore.ts";

interface ICmpProps {
    cmp: ICmpWithKey;
    index: number;
    isSelected: boolean;
}

const Cmp = memo((props: ICmpProps) => {
    const {cmp, index, isSelected} = props;
    const {style} = cmp;

    const setSelected = (e) => {
        // console.log("Debug__e :", e)
        if (e.ctrlKey) {
            // console.log("Debug__e.metaKey :", e.metaKey)
            setCmpsSelected([index]);
        } else {
            setCmpSelected(index);
        }
    };

    const outerStyle = pick(style, [
        "position",
        "top",
        "left",
        "width",
        "height",
    ]);

    const innerStyle = omit(style, "position", "top", "left");

    // console.log("cmp render"); //sy-log

    return (
        <div
            className={classNames(styles.main, isSelected && "selectedBorder")}
            style={outerStyle}
            onClick={setSelected}
        >
            <div className={styles.inner} style={{...innerStyle, zIndex: index}}>
                {cmp.type === isTextComponent && <Text key={cmp.key} {...omit(cmp, 'key')} />}
                {cmp.type === isImgComponent && <Img key={cmp.key} {...omit(cmp, 'key')} />}
            </div>
        </div>
    );
});

export default Cmp;
