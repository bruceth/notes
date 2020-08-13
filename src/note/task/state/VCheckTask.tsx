import React from 'react';
import { VTaskView } from './VTaskView';
import { Page, FA } from 'tonva';
import { observer } from 'mobx-react';
import { TaskCheckItem } from '../CTaskNoteItem';

export class VCheckTask extends VTaskView {
	protected get allowCheck() {return false;}

	protected renderState():JSX.Element {
		return this.renderStateSpan('待验收');
	}

	protected renderCheckItems(allowCheck:boolean) {
		return React.createElement(observer(() => {
			let uncheckedItems:TaskCheckItem[] = [];
			let checkedItems:TaskCheckItem[] = [];
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

	protected renderCheckItem(v:TaskCheckItem, allowCheck:boolean) {
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
				data-key={key}
				disabled={!allowCheck} />
			<div className={cn}>{content}</div>
		</div>;
	}

	protected renderOrtherContent() {
		return <div className="px-3 py-2 d-flex align-items-center border-bottom" >
		<div className="text-muted mr-1 w-5c">验收意见</div>
		<div className="flex-fill mr-3 ">
			<input className="flex-fill form-control border-0"
				type="text" step="1" min="1"
				onChange={this.onDiscribeChange}
				onKeyDown={this.onDiscribeKeyDown}/></div>
		</div>
	}

	private onDiscribeChange = (evt:React.ChangeEvent<HTMLInputElement>) => {
	}

	private onDiscribeKeyDown = (evt:React.KeyboardEvent<HTMLInputElement>) => {
	}

	protected renderBottomCommands() {
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
		return <>
		{this.renderOrtherContent()}
		<div className="py-2 bg-light border-top d-flex">
			{left}
			<div className="mr-auto" />
			{right}
		</div></>;
	}
  
	protected onCheck = async (pass:boolean) => {
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