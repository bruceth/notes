import { checkHourMinutes, taskTimeToString } from 'notes/model';
import React from 'react';
import { VTaskView, TaskParam } from '../VTaskView';
import { CTaskStart } from './CTaskStart';

export class VTaskStart extends VTaskView<CTaskStart> {
	protected renderState(): JSX.Element {
		return this.renderStateSpan('待办');
	}

	protected renderViewBottom() {
		let { owner } = this.controller.noteItem;
		let left: any, right: any;
		let isMe = this.isMe(owner);
		if (isMe === true) {
			left = <button onClick={this.onDone} className="btn btn-primary mx-3">
				完成
			</button>;
		}

		return <div className="py-2 bg-light border-top d-flex">
				{left}
				<div className="mr-auto" />
				{right}
		</div>;
	}

	protected additionRows: TaskParam[] = [
		//{label: '分值', values: this.renderPoint()}, 
		{label: '分派工时', values: this.renderAssignHours()}, 
		{label: '实际工时', values: this.renderHours()}, 
	];

	protected renderHours() {
		return <div className="flex-fill mr-3 "><input className="flex-fill form-control border-0"
			type="text" defaultValue={taskTimeToString(this.controller.assignhours)}
			placeholder="2.5或者2：30表示两个半小时"
			onBlur={this.onHoursBlur}
			onChange={e=>this.onHoursChange(e)}/>
		</div>;
	}

	protected onHoursChange(evt:React.ChangeEvent<HTMLInputElement>) {
		let m = checkHourMinutes(evt.target.value);
		if (m < 0) {
			m = 0;
		}
		this.controller.hours = m;
	}

	protected onHoursBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
		if (checkHourMinutes(evt.target.value) < 0) {
			evt.target.value = '';
			this.controller.hours = 0;
		}
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

export class VTaskStartDir extends VTaskStart {
	render() {
		return this.renderDirView();
	}
}