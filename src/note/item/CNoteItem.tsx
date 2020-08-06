import React from 'react';
import { observable } from "mobx";
import { NoteItem, NoteModel, replaceAll } from '../model';
import { CNote } from '../CNote';
import { CUqSub } from '../../tapp/CBase';

export interface INodeDatas {

}

export abstract class CNoteItem extends CUqSub<CNote> {

	stringifyContentObj(fullObj:any, other?:(obj:any)=>void) {
		if (other) {
			other(fullObj);
		}
	}

	parseContentObj(fullObj:any, parseOther?:(obj:any)=>void) {
		if (parseOther) {
			parseOther(fullObj);
		}
	}

	protected async internalStart() {}

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
