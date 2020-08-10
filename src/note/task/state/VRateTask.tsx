import React from 'react';
import { VTaskView } from './VTaskView';
import { Page } from 'tonva';

export class VRateTask extends VTaskView {
  protected rateValue:number = 5;

	protected get allowCheck() {return false;}

  protected renderState():JSX.Element {
		return <>待评分</>;
	}

  private onChange = (evt:React.ChangeEvent<HTMLInputElement>) => {
    this.rateValue = Number(evt.target.value);
  };


	protected renderBottomCommands() {
		let {owner, assigned} = this.controller.noteItem;
		let left:any, right:any;
		left = 
		<div><button onClick={()=>this.onRate()} className="btn btn-success mx-3">
		评分
		</button>
		</div>;

		right = this.renderFrom('px-2');
		return <div>
			{this.renderValueRadio()}
			<div className="py-2 bg-light border-top d-flex">
					{left}
					<div className="mr-auto" />
					{right}
				</div>
			</div>
  }

  protected renderValueRadio(): JSX.Element {
		let radios = [
			{val:5, text:'5分'},
			{val:4, text:'4分'},
			{val:3, text:'3分'},
			{val:2, text:'2分'},
			{val:1, text:'1分'},
			{val:0, text:'0分'},
		];

		return <div className="my-3">
			{radios.map((v, index) => {
				let {val, text} = v;
				return <label key={index} className="mb-0 mx-3">
					<input className="mr-1" type="radio" value={val} 
						defaultChecked={this.rateValue===val} name={'ratevalue'} onChange={this.onChange} />
					{text}
				</label>					
			})}
		</div>;
	}

  
  private onRate = async () => {
		await this.controller.RateTask(this.rateValue);
		this.closePage();
		this.openPage(this.resultPage)
	}

	protected resultPage = () => {
		let {title} = this.controller;
		return <Page header={title} back="close">
				评分完成！
		</Page>;
	}
}