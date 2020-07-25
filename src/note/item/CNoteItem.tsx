import React from 'react';
import { NoteItem, NoteModel } from '../model';
import { CNote } from '../CNote';
import { CUqSub } from '../../tapp/CBase';

export abstract class CNoteItem extends CUqSub<CNote> {
	protected async internalStart() {}

	//abstract defaultAct(): NoteItemAct;
	//subAct(subType:number): NoteItemAct {debugger; throw new Error('not implemented')}
	abstract renderItem(noteItem: NoteItem, index:number): JSX.Element;
	abstract onClickItem(noteItem: NoteItem, noteModel: NoteModel): void;

	protected renderNoteContent(content:string):JSX.Element {
		return <>{(content as string).split('\n').map((v, index) => {
			return <div key={index}>{v}</div>;
		})}</>;
	}

	showTo(noteId:number) {
		this.owner.showTo(noteId)
	}
}
