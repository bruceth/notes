import { BoxId } from "tonva";

export enum EnumNoteItemType {text=0, task=1}

export interface NoteItem {
	seconds: number, 
	owner: number | BoxId,
	note: any,
	type: EnumNoteItemType,
	sub: number,
}

export interface NoteModel {
	id: number;
	caption: string;
	content: string;
	type: EnumNoteItemType,
	sub: number,
	$create: Date;
	$update: Date;
}
