import React from 'react';
import { observer } from 'mobx-react';
import { FA } from 'tonva';
import { CContainer } from '../CContainer';
import { VNoteBase } from '../../noteBase';

export class VUnitNoteView extends VNoteBase<CContainer> {
	header() {return this.controller.noteItem.caption};
	content() {
		let {note, caption, content} = this.controller.noteItem;
		return <div className="m-3">
			note: {note} <br/>
			caption: {caption} <br/>
			content: {content} <br/>
		</div>
	}
}
