import React from 'react';
import { FA } from "tonva";
import { CNote } from "../CNote";
import { VRelativesBase, TabRelative } from './VRelativesBase';

export class VRelativesNoteBase<T extends CNote> extends VRelativesBase<T> {
	protected tabComment:TabRelative = {
		name: 'comment',
		caption: (isAction:boolean) => {
			let {commentCount} = this.controller.noteItem;
			let vCount:any;
			if (commentCount > 0) vCount = <small>{commentCount}</small>;
			return <>
				<FA className="mr-2" name="comment-o" /> 
				{vCount}
			</>
		},
		render: () => this.controller.renderCommentsList()
	}

	protected tabFlow:TabRelative = {
		name: 'flow',
		caption: (isAction:boolean) => {
			return <>流程</>;
		},
		render: () => {
			let {flow} = this.controller.noteModel;
			if (!flow || flow.length === 0) return;
			return <div>flow: {flow.length}</div>
		}
	}
	
	protected get tabs():TabRelative[] { return [this.tabComment, this.tabShare, this.tabFlow] };
}

export class VNoteRelatives extends VRelativesNoteBase<CNote> {
}