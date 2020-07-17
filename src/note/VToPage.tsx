import React from 'react';
import { VNote } from './VNote';

export class VToPage extends VNote {
	private currentNoteId:number;
	init(currentNoteId:number):void {this.currentNoteId = currentNoteId;}

	header() {return '收件人'}
	content() {
		return <div className="p-3">
			<button className="btn btn-primary" onClick={this.onSend}>发送</button>
		</div>
	}

	private onSend = () => {
		let toList = [3, 10];
		this.controller.sendNoteTo(this.currentNoteId, toList);
	}
}
