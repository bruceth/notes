import React from 'react';
import { observer } from 'mobx-react';
import { tv, FA, EasyTime } from "tonva";
import { CTaskNoteItem, EnumTaskState } from "../CTaskNoteItem";
import { VNoteBase, CheckItem } from '../../item';
import { VEdit } from '../VEdit';

abstract class VTaskView extends VNoteBase<CTaskNoteItem> {
	protected get back(): 'close' | 'back' | 'none' {return 'close'}
	header() {return '任务'}
	protected get allowCheck() {return true;}
	content() {
		let {note, caption, content, obj} = this.controller.noteItem;
		let allowCheck = this.allowCheck;
		//return tv(note, (values) => {
		//	let {caption, content} = values;
			if (!this.controller.title) this.controller.title = caption;
			//this.parseContent(content);
			let divState = this.renderState();
			let divCaption = caption? <b className="text-success">{caption}</b> : <span className="text-info">任务</span>;
			return <div className="my-2 mx-1 border rounded">
				<div className="bg-white">
					<div className="px-3 py-2 border-bottom">
						{divCaption} &nbsp; 
						<span className="small text-danger">{divState}</span>
					</div>
					{
						this.controller.checkable===false? 
						<div className="py-3">{this.renderContent()}</div>
						: this.renderCheckItems(allowCheck)
					}
				</div>
				{this.renderBottomCommands()}
			</div>;
		//});
	}

	protected onEdit = () => {
		this.openVPage(VEdit);
	}

	protected renderBottomCommands() {
		let {owner, assigned, state} = this.controller.noteItem;
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
			right = this.renderFrom(owner as number, assigned, 'px-2');
		}
		return <div className="py-2 bg-light border-top d-flex">
			{left}
			<div className="mr-auto" />
			{right}
		</div>;
	}

	protected renderCheckItem(v:CheckItem, allowCheck:boolean) {
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
				data-key={key}
				disabled={!allowCheck} />
			<div className={cn}>{content}</div>
		</div>;
	}

	protected renderCheckItems(allowCheck:boolean) {
		return React.createElement(observer(() => {
			let uncheckedItems:CheckItem[] = [];
			let checkedItems:CheckItem[] = [];
			for (let ci of this.controller.items) {
				let {checked} = ci;
				if (checked === true) checkedItems.push(ci);
				else uncheckedItems.push(ci);
			}			
			return <div className="">
				{uncheckedItems.map((v, index) => this.renderCheckItem(v, allowCheck))}
				{
					checkedItems.length > 0 && <div className="border-top mt-2 pt2">
						<div className="px-3 pt-2 small text-muted">{checkedItems.length}项完成</div>
						{checkedItems.map((v, index) => this.renderCheckItem(v, allowCheck))}
					</div>
				}
			</div>;
		}));
	}

	private onCheckChange = async (evt:React.ChangeEvent<HTMLInputElement>) => {
		let t = evt.currentTarget;
		let key = Number(t.getAttribute('data-key'));
		let item = this.controller.items.find(v => v.key === key);
		if (item) item.checked = t.checked;

		let noteContent = this.controller.stringifyContent();
		await this.controller.owner.setNote(false,
			this.controller.noteItem,
			this.controller.title, 
			noteContent,
			this.controller.buildObj());
	}

	protected renderState():JSX.Element {
		return <>state</>;
	}

	renderListItem() {
		let {note, caption, content, $create, $update} = this.controller.noteItem;
		//return tv(note, (values) => {
		//	let {caption, content, $create, $update} = values;
			if (!this.controller.title) this.controller.title = caption;
			//this.parseContent(content);
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
			let divCaption = caption? <b className="text-success">{caption}</b> : <span className="text-info">任务</span>;
			return <div className="d-block">
				<div className="px-3 py-2">
					{divCaption} &nbsp; 
					<span className="small text-danger">{divState}</span>
				</div>
				<div>
					{
						this.controller.checkable===false? 
						<div className="py-3">{this.renderContent()}</div>
						: this.renderCheckItems(this.allowCheck)
					}
				</div>
				{divChanged}
			</div>;
		//});
	}
}

class VTaskStart extends VTaskView {
	protected get allowCheck() {return this.isMe(this.controller.noteItem.owner);}

	protected renderState():JSX.Element {
		return <>待办</>;
	}

	protected renderBottomCommands() {
		let {owner, assigned} = this.controller.noteItem;
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
			right = this.renderFrom(owner as number, assigned, 'px-2');
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
	protected get allowCheck() {return false;}
	protected renderState() {
		return <>已完成</>;
	}
}

class VTaskPass extends VTaskView {
	protected get allowCheck() {return false;}
	protected renderState() {
		return <>已验收</>;
	}
}

class VTaskFail extends VTaskView {
	protected get allowCheck() {return false;}
	protected renderState() {
		return <>拒签</>;
	}
}

class VTaskRated extends VTaskView {
	protected get allowCheck() {return false;}
	protected renderState() {
		return <>已评价</>;
	}
}

class VTaskCanceled extends VTaskView {
	protected get allowCheck() {return false;}
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
