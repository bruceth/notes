import { CContent } from "./CContent";
import { CText } from "./text";
import { CCheckable } from "./checkable";
import { CList } from "./list";
import { CFolder } from "./folder";

export enum EnumContentType {text=0, checkable=1, list=2, folder=3}

export function createCContent(type: EnumContentType): CContent { 
	let ret:CContent;
	switch (type) {
		case EnumContentType.text: ret = new CText(undefined); break;
		case EnumContentType.checkable: ret = new CCheckable(undefined); break;
		case EnumContentType.list: ret = new CList(undefined); break;
		case EnumContentType.folder: ret = new CFolder(undefined); break;
	}
	ret.checkType = type;
	return ret;
}
