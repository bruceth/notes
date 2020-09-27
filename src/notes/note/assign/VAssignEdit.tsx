import React from 'react';
import { CNoteAssign } from "./CNoteAssign";
import { VNoteBaseEdit } from 'notes/noteBase';
import { none } from 'tool';
import { checkHourMinutes, taskTimeToString } from 'notes/model';

interface TaskParam {
	label: string;
	values?: any;
	onClick?: () => void;
}

export class VAssignEdit extends VNoteBaseEdit<CNoteAssign> { // VNoteForm<CNoteAssign> {
	header() {
		return this.t('noteTask');
	}

	protected renderTopCaptionContent():JSX.Element {
		return <div className="">
			{this.renderCaptionInput()}
			<div className="mx-1 py-1 bg-white">
				{this.renderContent()}
			</div>
			{this.renderTaskAdditions()}
		</div>;
	}

	protected renderContent():JSX.Element {
		return this.controller.cContent.renderInput()
	}

	protected renderParam(param: TaskParam) {
		let {label, values, onClick} = param;
		return <div key={label} className="px-3 py-2 bg-white d-flex align-items-center border-bottom" onClick={onClick}>
			<div className="text-muted mr-3 w-5c">{label}</div>
			<div className="flex-fill mr-3 ">{values || none}</div>
		</div>
	}

	protected additionRows: TaskParam[] = [
		{label: '分派工时', values: this.renderAssignHours()}, 
	];

	protected renderTaskAdditions() {
		return <div>
			{this.additionRows.map(v => this.renderParam(v))}
		</div>;
	}

	protected renderAssignHours() {
		return <div className="flex-fill mr-3 "><input className="flex-fill form-control border-0"
			type="text" defaultValue={taskTimeToString(this.controller.assignhours)}
			placeholder="2.5或者2：30表示两个半小时"
			onBlur={e=>this.onHoursBlur(e)}
			onChange={e=>this.onHoursChange(e)}/>
		</div>;
	}

	protected onHoursChange = (evt:React.ChangeEvent<HTMLInputElement>) => {
		let m = checkHourMinutes(evt.target.value);
		if (m < 0) {
			m = 0;
		}
		this.controller.assignhours = m;
		this.controller.changed = true;
	}

	protected onHoursBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
		if (checkHourMinutes(evt.target.value) < 0) {
			evt.target.value = '';
			this.controller.assignhours = 0;
			this.controller.changed = true;
		}
	}

	protected renderExButtons():JSX.Element {
		return <>{this.renderDeleteButton()}</>;
	}
}
