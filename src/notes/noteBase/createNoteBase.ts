//import { CContainer, CSpace, CFolderRoot, CFolderMy } from "./container";
import { CNoteBase } from ".";
import { EnumNoteType, NoteItem } from "../model";
import { CNotes } from "../CNotes";
import { createCSpace, createCFolder } from "../container";
import { createCNoteText, createCNoteTask, createCNoteAssign } from "../note";

export function createNoteBase(noteItem: NoteItem, cNotes: CNotes):CNoteBase {
	let {type} = noteItem;
	let ret:CNoteBase;
	switch (type) {
		default: throw Error("unknown type");
		case EnumNoteType.text: ret = createCNoteText(cNotes); break;
		case EnumNoteType.task: ret = createCNoteTask(cNotes, noteItem); break;
		case EnumNoteType.folder: ret = createCFolder(cNotes, noteItem); break;
		case EnumNoteType.group: debugger; throw Error("type group undefined");
		case EnumNoteType.groupFolder: ret = createCSpace(cNotes); break;
		case EnumNoteType.unit:  debugger; throw Error("type unit undefined");
		case EnumNoteType.assign: ret = createCNoteAssign(cNotes); break;
	}
	ret.init(noteItem);
	return ret;
}
