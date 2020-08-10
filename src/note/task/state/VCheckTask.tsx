import React from 'react';
import { VTaskView } from './VTaskView';
import { Page, FA } from 'tonva';

export class VCheckTask extends VTaskView {
	protected get allowCheck() {return false;}

	protected renderState():JSX.Element {
		return this.renderStateSpan('待验收');
	}

	protected renderBottomCommands() {
		let {owner, assigned} = this.controller.noteItem;
		let left:any, right:any;
		left = <div>
			<button onClick={()=>this.onCheck(true)} className="btn btn-success mx-3">
				<FA name="check" /> 通过
			</button>
			<button onClick={()=>this.onCheck(false)} className="btn btn-outline-secondary mx-3">
				<FA name="times" /> 不通过
			</button>
		</div>;

    	right = this.renderFrom('px-2');
		return <div className="py-2 bg-light border-top d-flex">
			{left}
			<div className="mr-auto" />
			{right}
		</div>;
	}
  
	private onCheck = async (pass:boolean) => {
		await this.controller.CheckTask(pass);
		this.closePage();
		let content = pass?
			<span className="text-success"><FA name="check" /> 验收通过</span>
			:
			<span className="text-secondary"><FA name="check" /> 验收不通过</span>
		this.showActionEndPage({content});
		//this.openPage(this.resultPage, {pass})
	}

	protected resultPage = ({pass}:{pass: boolean}) => {
		let {title} = this.controller;
		let content = pass?
			<span className="text-success"><FA name="check" /> 验收通过</span>
			:
			<span className="text-secondary"><FA name="check" /> 验收不通过</span>
		return <Page header={title} back="close">
			<div className="border bg-white rounded m-5">
				<div className="py-5 text-center">
					{content}
				</div>
				<div className="border-top text-center py-3">
					<button className="btn btn-outline-info" onClick={()=>this.closePage()}>返回</button>
				</div>
			</div>
		</Page>;
	}
}