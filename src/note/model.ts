import { BoxId } from "tonva";

export enum EnumNoteItemType {text=0, task=1}

export interface NoteItem {
	seconds: number;
	owner: number | BoxId;
	note: any;
	type: EnumNoteItemType;
	assigned: string;
	state: string;
	unread: number;
}

export interface NoteModel {
	id: number;
	caption: string;
	content: string;
	type: EnumNoteItemType,
	$create: Date;
	$update: Date;
}

export function replaceAll(str:string, findStr:string, repStr:string):string {
	if (!str) return str;
	return str.split(findStr).join(repStr);
}
