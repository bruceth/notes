import React from 'react';
import { observer } from 'mobx-react';
import { tv, FA, EasyTime } from "tonva";
import { CTaskNoteItem, EnumTaskState } from "../CTaskNoteItem";
import { VNoteBase, CheckItem } from '../../item';
import { VEdit } from '../VEdit';

abstract class VTaskView extends VNoteBase<CTaskNoteItem> {
	protected get back(): 'close' | 'back' | 'none' {return 'close'}
	header() {return '任务'}
	content() {
		let {note} = this.param;
		return tv(note, (values) => {
			let {caption, content} = values;
			if (!this.title) this.title = caption;
			this.parseContent(content);
			let divState = this.renderState();
			return <div className="my-2 mx-1 border rounded">
				<div className="bg-white">
					{(divState || caption) && <div className="px-3 py-2 border-bottom">
						<b>{caption}</b>
						&nbsp; <span className="small text-danger">{divState}</span>
					</div>}
					{
						this.checkable===false? 
						<div className="py-3">{this.renderContent()}</div>
						: this.renderCheckItems()
					}
				</div>
				{this.renderBottomCommands()}
			</div>;
		});
	}

	protected onEdit = () => {
		this.parsed = false;
		this.openVPage(VEdit, this.param);
	}

	protected renderBottomCommands() {
		let {owner, assigned, state} = this.param;
		let left:any, right:any;
		let isMe = this.isMe(owner);
		if (isMe === true && state === EnumTaskState.Start) {
			right = <>
				<div onClick={this.onEdit} className="px-3 py-2 cursor-pointer text-primary ml-3">
					<FA name="pencil-square-o" />
				</div>
			</>;
		}
		else {
			right = <div className="px-2 text-muted small">
				来自：{this.renderContact(owner as number, assigned)}
			</div>;
		}
		return <div className="py-2 bg-light border-top d-flex">
			{left}
			<div className="mr-auto" />
			{right}
		</div>;
	}

	protected renderCheckItem(v:CheckItem) {
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
		return <div key={key} className="d-flex mx-3 my-0 align-items-center form-group form-check">
			<input className="form-check-input mr-3 mt-0" type="checkbox"
				defaultChecked={checked}
				onChange={this.onCheckChange}
				data-key={key} />
			<div className={cn}>{content}</div>
		</div>;
	}

	protected renderCheckItems() {
		return React.createElement(observer(() => {
			let uncheckedItems:CheckItem[] = [];
			let checkedItems:CheckItem[] = [];
			for (let ci of this.items) {
				let {checked} = ci;
				if (checked === true) checkedItems.push(ci);
				else uncheckedItems.push(ci);
			}			
			return <div className="">
				{uncheckedItems.map((v, index) => this.renderCheckItem(v))}
				{
					checkedItems.length > 0 && <div className="border-top mt-2 pt2">
						<div className="px-3 pt-2 small text-muted">{checkedItems.length}项完成</div>
						{checkedItems.map((v, index) => this.renderCheckItem(v))}
					</div>
				}
			</div>;
		}));
	}

	private onCheckChange = async (evt:React.ChangeEvent<HTMLInputElement>) => {
		let t = evt.currentTarget;
		let key = Number(t.getAttribute('data-key'));
		let item = this.items.find(v => v.key === key);
		if (item) item.checked = t.checked;

		let noteContent = this.stringifyContent();
		await this.controller.owner.setNote(false,
			this.param,
			this.title, 
			noteContent);
	}

	protected renderState():JSX.Element {
		return <>state</>;
	}

	renderListItem() {
		let {note} = this.param;
		return tv(note, (values) => {
			let {caption, content, $create, $update} = values;
			if (!this.title) this.title = caption;
			this.parseContent(content);
			let divChanged:any = undefined;
			let create:Date = $create;
			let update:Date = $update;
			if (create && update) {
				let time:Date, action:any;
				if (update.getTime() - create.getTime() > 60*1000) {
					action = <FA name="pencil-square-o" />;
					time = update;
				}
				else {
					time = create;
				}
				divChanged = <div className="text-right small text-muted px-3 pb-1">
					<small>
						{action}
						<span className="text-info"><EasyTime date={time} /></span>
					</small>
				</div>;
			}
			let divState = this.renderState();
			return <div className="d-block">
				{(caption || divState) && <div className="px-3 py-2 text-success">
					<b>{caption}</b> 
					&nbsp; <span className="small text-danger">{divState}</span>
				</div>}
				<div>
					{
						this.checkable===false? 
						<div className="py-3">{this.renderContent()}</div>
						: this.renderCheckItems()
					}
				</div>
				{divChanged}
			</div>;
		});
	}
}

class VTaskStart extends VTaskView {
	protected renderState():JSX.Element {
		return <>待办</>;
	}

	protected renderBottomCommands() {
		let {owner, assigned} = this.param;
		let left:any, right:any;
		let isMe = this.isMe(owner);
		if (isMe === true) {
			left = <button onClick={this.onDone} className="btn btn-primary mx-3">
				完成
			</button>;
			right = <>
				<div onClick={this.onEdit} className="px-3 py-2 cursor-pointer text-primary ml-3">
					<FA name="pencil-square-o" />
				</div>
			</>;
		}
		else {
			right = <div className="px-2 text-muted small">
				来自：{this.renderContact(owner as number, assigned)}
			</div>;
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
	}
}

class VTaskDone extends VTaskView {
	protected renderState() {
		return <>已完成</>;
	}
}

class VTaskPass extends VTaskView {
	protected renderState() {
		return <>已验收</>;
	}
}

class VTaskFail extends VTaskView {
	protected renderState() {
		return <>拒签</>;
	}
}

class VTaskRated extends VTaskView {
	protected renderState() {
		return <>已评价</>;
	}
}

class VTaskCanceled extends VTaskView {
	protected renderState() {
		return <>已取消</>;
	}
}

export class TaskViewFactory {
	private stateViews:{[type in EnumTaskState]: new (controller: CTaskNoteItem)=>VTaskView} = {
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
