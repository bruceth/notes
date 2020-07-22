import React from 'react';
import { VPage } from "tonva";
import { CTaskNoteItem } from "./CTaskNoteItem";


export class VView extends VPage<CTaskNoteItem> {
	protected get back(): 'close' | 'back' | 'none' {return 'close'}
	header() {return '任务'}
	content() {
		return <div className="p-3">task</div>
	}
}
