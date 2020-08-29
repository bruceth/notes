//import { CContainer, CSpace, CFolderRoot, CFolderMy } from "./container";
import { CNoteBase } from "./noteBase";
import { EnumNoteType, NoteItem } from "./model";
import { CNotes } from "./CNotes";
import { createCSpace, createCFolder } from "./container";
import { createCNoteText, createCNoteTask } from "./note";

export function createNoteBase(noteItem: NoteItem, cNotes: CNotes):CNoteBase {
	let {type} = noteItem;
	let ret:CNoteBase;
	switch (type) {
		default: throw Error("unknown type");
		case EnumNoteType.text: ret = createCNoteText(cNotes); break;
		case EnumNoteType.task: ret = createCNoteTask(cNotes); break;
		case EnumNoteType.folder: ret = createCFolder(cNotes, noteItem); break;
		case EnumNoteType.group: debugger; throw Error("type group undefined");
		case EnumNoteType.groupFolder: ret = createCSpace(cNotes); break;
		case EnumNoteType.unit:  debugger; throw Error("type unit undefined");
	}
	ret.init(noteItem);
	return ret;
}

/*
const cNoteTypes: {[key in EnumNoteType]: new (...args: any[])=> CNoteBase} = {
	[EnumNoteType.text]: CNoteText,
	[EnumNoteType.task]: CNoteTask,
	[EnumNoteType.folder]: CFolderMy,
	[EnumNoteType.group]: undefined, // CFolderNoteItem,
	[EnumNoteType.groupFolder]: CSpace,
	[EnumNoteType.unit]: undefined, // CFolderNoteItem,
};
*/
