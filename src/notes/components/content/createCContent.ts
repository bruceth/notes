import { CContent } from "./CContent";
import { CText } from "./text";
import { CCheckable } from "./checkable";
import { CList } from "./list";
import { CFolder } from "./folder";
import { EnumNoteType } from "../../model";

export enum EnumContentType {text=0, checkable=1, list=2, folder=3}

function cContentFromType(type: EnumContentType): CContent {
	let ret:CContent;
	switch (type) {
		default: throw new Error();
		case EnumContentType.text: ret = new CText(undefined); break;
		case EnumContentType.checkable: ret = new CCheckable(undefined); break;
		case EnumContentType.list: ret = new CList(undefined); break;
		case EnumContentType.folder: ret = new CFolder(undefined); break;
	}
	return ret;
}

export function createCContent(content:string, type: EnumNoteType): CContent { 
	let ret:CContent;
	if (type === EnumNoteType.comment || content === undefined) {
		ret = new CText(undefined);
		ret.init(content);
	}
	else {
		try {
			let obj = JSON.parse(content);
			let {check} = obj;
			ret = cContentFromType(check);
			ret.init(obj);
		}
		catch (err) {
			debugger;
			throw Error('Error note content: ' + content);
		}
	}
	return ret;
}

export function createCContentFromType(type: EnumContentType): CContent {
	let ret = cContentFromType(type);
	ret.init(undefined);
	return ret;
}
