import {defaultComponentStyle} from "@/utils/const";
import {isImgComponent} from ".";
import {addCmp} from "@/store/editStore";
import leftSideStyles from "./leftSide.module.less";

const defaultStyle = {
    ...defaultComponentStyle,
};

const url = "http://localhost:3001/api/images/";

const settings = [
    {
        value: url + "react-head.png",
        style: defaultStyle,
    },

    {
        value: url + "bg1.png",
        style: defaultStyle,
    },
    {
        value: url + "bg2.png",
        style: defaultStyle,
    }
];



const ImgSider = () => {
    console.log("ImgSider render"); //sy-log
    return (
        <div className={leftSideStyles.main}>
            <ul className={leftSideStyles.box}>
                {settings.map((item) => (
                    <li
                        draggable={true}
                        key={item.value}
                        className={leftSideStyles.item}
                        onClick={() => addCmp({...item, type: isImgComponent})}
                        onDragStart={(e) => {
                            console.log("Debug__item.value :", item.value)
                            e.dataTransfer.setData(
                                "drag-cmp",
                                JSON.stringify({...item, type: isImgComponent})
                            );
                        }}>
                        <img src={item.value} draggable={false} alt="" />s
                    </li>
                    
                ))}
            </ul>
        </div>
    );
};

export default ImgSider;
