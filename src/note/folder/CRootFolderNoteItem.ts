import { CFolderNoteItem } from "./CFolderNoteItem";

export class CRootFolderNoteItem extends CFolderNoteItem {
	protected getDisableOwnerFrom() {return false;}
}