import { BoxId } from "tonva";

export enum EnumNoteItemType {text=0, task=1}

export interface NoteItem {
	seconds: number;
	owner: number | BoxId;
	note: number;
	type: EnumNoteItemType;
	from: number | BoxId;
	caption: string;
	content: string;
	assigned: string;
	state: number;
	unread: number;
	obj: any;
	$create: Date;
	$update: Date;
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

export function numberFromId(id:number|BoxId):number {
	let _id:number;
	switch (typeof id) {
			case 'object': _id = (id as BoxId).id; break;
			case 'number': _id = id as number; break;
			default: return;
	}
	return _id;
}

