import React from 'react';
import { observer } from 'mobx-react';
import { FA } from "tonva";
import { EnumTaskState } from "../TaskState"
import { CTaskNoteItem } from "../CTaskNoteItem";
import { VNoteView, CheckItem } from '../../item';
import { VEdit } from '../VEdit';
import { VTaskRelatives } from './VTaskRelatives';

export abstract class VTaskView extends VNoteView<CTaskNoteItem> {
	protected get back(): 'close' | 'back' | 'none' { return 'close' }
	header() { return '任务' }
	protected get allowCheck() { return true; }
	content() {
		return React.createElement(observer(() => {
			let { title } = this.controller;
			let divCaption = this.renderCaption(title);
			return <div className="my-2 mx-1 border rounded">
				{this.renderViewTop()}
				<div className="bg-white">
					<div className="px-3 py-2 border-bottom">
						{divCaption}
					</div>
					{this.renderContent()}
				</div>
				{this.renderBottomCommands()}
				{this.renderRelatives()}
			</div>;
		}));
	}

	protected renderContent() {
		return this.renderContentBase(this.allowCheck);
	}

	private renderCaption(title: string) {
		let divCaption = title ? <b className="text-primary">{title}</b> : <span className="text-info">任务</span>;
		return <><span className="mr-2">{divCaption}</span> {this.renderState()}</>;
	}

	protected renderBottomCommands() {
		let { owner, state } = this.controller.noteItem;
		let right: any;
		let isMe = this.isMe(owner);		
		if (isMe === true && state == EnumTaskState.Start) {
			right = <>{this.renderEditButton()}</>;
		}
		return <div className="py-2 bg-light border-top d-flex align-items-end">
			{this.renderCommentButton()}
			<div className="mr-auto" />
			{right}
		</div>;
	}

	renderRelatives() {
		return this.renderVm(VTaskRelatives);
	}

	protected renderState(): JSX.Element {
		return <>state</>;
	}

	protected onEdit() {
		this.openVPage(VEdit);
	}

	renderListItem() {
		let { caption } = this.controller.noteItem;
		let divCaption = this.renderCaption(caption);
		return <div className="d-block bg-white">
			{this.renderItemTop()}
			<div className="px-3 py-2">
				{divCaption}
			</div>
			{this.renderItemContent()}
		</div>;
	}
}
