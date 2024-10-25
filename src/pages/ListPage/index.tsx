// file: src/pages/ListPage/index.tsx
import {Card, Divider, Table, Space, Button} from "antd";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getCanvasList} from "@/request/list";

interface ListItem {
    id: number;
    type: string; // 页面、模板页面
    title: string;
    content: string;
}

export default function ListPage() {
    const [list, setList] = useState<ListItem[]>([]);

    const fresh = () => {
        getCanvasList("", (res: { status: number; data: { code: number; result: ListItem[] } }) => {
            const data = res.data?.result || [];
            console.log("Debug__data :", data);
            setList(data);
        });
    };

    useEffect(() => {
        fresh();
    }, []);

    const editUrl = (item: ListItem) => `/?id=${item.id}&type=${item.type}`;

    const columns = [
        {
            title: "id",
            key: "id",
            render: (item: ListItem) => {
                return <Link to={editUrl(item)}>{item.id}</Link>;
            },
        },
        {
            title: "标题",
            key: "title",
            render: (item: ListItem) => {
                const title = item.title || "未命名";
                return <Link to={editUrl(item)}>{title}</Link>;
            },
        },
        {
            title: "类型",
            key: "type",
            render: (item: ListItem) => {
                const typeDesc = item.type === "content" ? "页面" : "模板页";
                return <div className="red">{typeDesc}</div>;
            },
        },
        {
            title: "动作",
            key: "action",
            render: (item: ListItem) => {
                const {id} = item;
                return (
                    <Space size="middle">
                        <a target="_blank" href={"http://builder.codebus.tech/?id=" + id}>
                            线上查看（切移动端）
                        </a>
                        <Link to={editUrl(item)}>编辑</Link>
                        <Button onClick={() => del({id})}>删除</Button>
                    </Space>
                );
            },
        },
    ];

    return (
        <Card>
            <Link to="/">新增</Link>
            <Divider />
            <Table
                columns={columns}
                dataSource={list}
                rowKey={(record: ListItem) => record.id.toString()} // 使用 toString() 确保唯一键值为字符串
            />
        </Card>
    );
}
