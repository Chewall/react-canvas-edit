import React from "react";

// export type Style = React.CSSProperties;
// 扩展 Style 类型以包含更具体的类型
export type Style = React.CSSProperties & {
  [key: string]: string | number | undefined;
};


export interface ICanvas {
  title: string;
  style: Style;
  cmps: Array<ICmpWithKey>;
}

export interface ICmp {
  type: number;
  style: Style;
  value: string;
  onClick?: string;
}

export interface ICmpWithKey extends ICmp {
  key: number;
}

export type EditStoreState = {
  canvas: ICanvas;
  assembly: Set<number>;
};

export type AddCmpFC = (_cmp: ICmp) => void;

export type EditStoreAction = {
  // addCmp: AddCmpFC;
};

export interface IEditStore extends EditStoreState, EditStoreAction {}
