import React from 'react';
import { observer } from 'mobx-react';
import { TaskCheckItemBase } from './model';
import { VNoteBaseView } from '../../noteBase';
import { EnumTaskState } from "./TaskState"
import { CNoteTask } from "./CNoteTask";
import { VTaskRelatives } from './VTaskRelatives';
import { none } from 'tool';
import { taskTimeToString } from 'notes/model';

//const none = <small className="text-muted">[无]</small>;

export interface TaskParam {
	label: string;
	values?: any;
	onClick?: () => void;
}

export abstract class VTaskView<T extends CNoteTask> extends VNoteBaseView<T> {
	protected get back(): 'close' | 'back' | 'none' { return 'close' }
	header() { return this.t('task') }
	content() {
		return React.createElement(observer(() => {
			return <div className="my-2 mx-1 border rounded">
				{this.renderTopCaptionContent()}
				{this.renderTaskAdditions()}
				{this.renderViewBottom()}
				{this.renderRelatives()}
			</div>;
		}));
	}

	protected renderTop():JSX.Element {
		return <div className="d-flex px-3 py-2 align-items-center border-top border-bottom bg-light">
			{this.renderIcon()}
			<span className="mr-4">{this.renderEditTime()}</span>
			{this.renderFrom()}
		</div>;
	}

	protected renderContent() {
		return this.controller.cContent.renderViewContent();
	}

	renderDirView() {
		return React.createElement(observer(() => {
			return <div className="d-block bg-white">
				<div className="bg-white">
			{this.renderDirTop()}
			<div className="py-2">
				{this.renderCaption()}
				{this.controller.cContent.renderDirContent()}
			</div>
		</div>
				{this.renderDirBottom()}
			</div>;
		}));
	}

	protected renderDirTop():JSX.Element {
		return <div className="d-flex px-3 py-2 align-items-center border-top">
			{this.renderIcon()}
			{this.renderFrom()}
			<div className="ml-auto">{this.renderEditTime()}</div>
		</div>;
	}

	protected renderDirBottom():JSX.Element {
		let divToCount = this.renderToCount();
		let divSpawnCount = this.renderSpawnCount();
		let divComment = this.renderCommentFlag();
		if (divToCount || divSpawnCount || divComment) {
			return <div className="d-flex align-items-center px-3 mb-1">
				{divToCount}
				{divSpawnCount}
				{divComment}
				<div className="mr-auto" />
			</div>;
		}
	}

	protected renderCaption() {
		let { caption: title } = this.controller;
		let divCaption = title ? <b className="text-primary">{title}</b> : <span className="text-info">任务</span>;
		return <div className="px-3 py-2">
			<span className="mr-2">{divCaption}</span> {this.renderState()}
		</div>;
	}

	protected renderParam(param: TaskParam) {
		let {label, values, onClick} = param;
		return <div key={label} className="px-3 py-2 bg-white d-flex cursor-pointer align-items-center border-bottom" onClick={onClick}>
			<div className="text-muted mr-3 w-5c">{label}</div>
			<div className="flex-fill mr-3 ">{values || none}</div>
		</div>
	}

	protected additionRows: TaskParam[] = [
		//{label: '分值', values: this.renderPoint()}, 
		{label: '工时', values: this.renderHours()}, 
	];


	protected renderTaskAdditions() {
		return <div>
			{this.additionRows.map(v => this.renderParam(v))}
		</div>;
	}

	protected renderPoint() {
		return <div className="flex-fill form-control border-0">
			{this.controller.point}
		</div>;
	}

	protected renderHours() {
		return <div className="flex-fill form-control border-0">
			{taskTimeToString(this.controller.hours)}
		</div>;
	}

	protected renderViewBottom():JSX.Element {
		return;
		/*
		let { owner, state } = this.controller.noteItem;
		let right: any;
		let isMe = this.isMe(owner);		
		if (isMe === true && state === EnumTaskState.Start) {
			right = <>{this.renderEditButton()}</>;
		}
		return <div className="py-2 bg-light border-top d-flex align-items-end">
			{this.controller.cComments.renderCommentButton()}
			<div className="mr-auto" />
			{right}
		</div>;
		*/
	}

	renderRelatives() {
		return this.renderVm(VTaskRelatives as any);
	}

	protected renderState(): JSX.Element {
		return <>state</>;
	}
	/*
	protected onEdit() {
		this.openVPage(VEdit as any);
	}
	*/

	protected renderCheckItem(v:TaskCheckItemBase, checkable:boolean) {
		let {key, text, checked} = v;
		let cn = 'form-control-plaintext ml-3 ';
		let content: any;
		if (checked === true) {
			cn += 'text-muted';
			content = <del>{text}</del>;
		}
		else {
			content = text;
		}
		return <label key={key} className="d-flex mx-3 my-0 align-items-center form-check">
			<input className="form-check-input mr-3 mt-0" type="checkbox"
				defaultChecked={checked}
				onChange={this.onCheckChange}
				data-key={key}
				disabled={!checkable} />
			<div className={cn}>{content}</div>
		</label>;
	}

	private onCheckChange = async (evt:React.ChangeEvent<HTMLInputElement>) => {
		//let t = evt.currentTarget;
		//let key = Number(t.getAttribute('data-key'));
		//await this.controller.onCheckChange(key, t.checked);
	}
}
