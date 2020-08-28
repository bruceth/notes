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
			let allowCheck = this.allowCheck;
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

class VTaskStart extends VTaskView {
	protected get allowCheck() { return this.isMe(this.controller.noteItem.owner); }

	protected renderState(): JSX.Element {
		return this.renderStateSpan('待办');
	}

	protected renderBottomCommands() {
		let { owner } = this.controller.noteItem;
		let left: any, right: any;
		let isMe = this.isMe(owner);
		if (isMe === true) {
			left = <button onClick={this.onDone} className="btn btn-primary mx-3">
				完成
			</button>;
			right = <>{this.renderEditButton()}</>;
		}
		return <div className="py-2 bg-light border-top d-flex">
			{left}
			<div className="mr-auto" />
			{right}
		</div>;
	}

	private onDone = async () => {
		await this.controller.DoneTask();
		this.closePage();
		//this.openPage(this.resultPage);

		// 这个地方应该要显示，下一步是由谁来做什么。比如谁来验收，或者谁来评价
		// 这些信息应该在nodeModel里面
		// 如果没有后续操作，显示成红色，加一个终止标志 #
		// 如果由后续操作，显示成绿色，并且显示下一步什么操作，由谁来操作
		let content = <>任务完成</>;
		this.showActionEndPage({ content });
	}
	/*
	protected resultPage = () => {
		let {title} = this.controller;
		return <Page header={title} back="close">
				完成！
		</Page>;
	}
	*/
}

class VTaskDone extends VTaskView {
	protected get allowCheck() { return false; }
	protected renderState() {
		let { noteItem } = this.controller;
		let obj = noteItem.obj;
		if (obj) {
			let { checker } = obj;
			if (checker) {
				return this.renderStateSpan('待验收');
			}
			let { rater } = obj;
			if (rater) {
				return this.renderStateSpan('待评分');
			}
		}
		return this.renderStateSpan('已办', true);
	}
}

class VTaskPass extends VTaskView {
	protected get allowCheck() { return false; }
	protected renderState() {
		let { noteItem } = this.controller;
		let obj = noteItem.obj;
		if (obj) {
			let { rater } = obj;
			if (rater) {
				return this.renderStateSpan('待评价');
			}
		}
		return this.renderStateSpan('已验收', true);
	}
}

class VTaskFail extends VTaskView {
	protected get allowCheck() { return false; }
	protected renderState() {
		return this.renderStateSpan('拒签', true);
	}
}

class VTaskRated extends VTaskView {
	protected get allowCheck() { return false; }
	protected renderState() {
		return this.renderStateSpan('已评价', true);
	}
}

class VTaskCanceled extends VTaskView {
	protected get allowCheck() { return false; }
	protected renderState() {
		return this.renderStateSpan('已取消', true);
	}
}

export class TaskViewFactory {
	private stateViews: { [type in EnumTaskState]: new (controller: CTaskNoteItem) => VTaskView } = {
		[EnumTaskState.Start]: VTaskStart,
		[EnumTaskState.Done]: VTaskDone,
		[EnumTaskState.Pass]: VTaskPass,
		[EnumTaskState.Fail]: VTaskFail,
		[EnumTaskState.Rated]: VTaskRated,
		[EnumTaskState.Canceled]: VTaskCanceled,
	}

	getView = (enumTaskState: EnumTaskState) => {
		let TaskView = this.stateViews[enumTaskState];
		if (!TaskView) {
			TaskView = VTaskStart;
		}
		return TaskView;
	}
}
