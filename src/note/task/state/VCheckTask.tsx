import React from 'react';
import { VTaskView } from './VTaskView';
import { Page } from 'tonva';

export class VCheckTask extends VTaskView {
	protected get allowCheck() {return false;}

  protected renderState():JSX.Element {
		return <>待检测</>;
	}

	protected renderBottomCommands() {
		let {owner, assigned} = this.controller.noteItem;
		let left:any, right:any;
    left = <div><button onClick={()=>this.onCheck(true)} className="btn btn-success mx-3">
      通过
    </button>
    <button onClick={()=>this.onCheck(false)} className="btn btn-secondary mx-3">
      不通过
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
		this.openPage(this.resultPage)
	}

	protected resultPage = () => {
		let {title} = this.controller;
		return <Page header={title} back="close">
				检查完成！
		</Page>;
	}
}