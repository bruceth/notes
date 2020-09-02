import React from 'react';
import { VAssignEdit } from './VAssignEdit';
import { VNoteBaseView } from '../../noteBase';
import { CNoteAssign } from './CNoteAssign';
import { VAssignRelatives } from './VAssignRelatives';
//import { CheckItem } from '../../model';

export class VAssignView extends VNoteBaseView<CNoteAssign> {
	header() {
		return this.t('noteTask')
	}

	protected renderRelatives() {
		return this.renderVm(VAssignRelatives);
	}

	footer() {
		return this.renderBottomCommands();
	}

	protected renderBottomCommands() {
		return <div className="py-2 pl-3 bg-light border-top d-flex align-items-center">
			{this.renderShareButton()}
			{this.controller.renderWriteComment()}
		</div>;
	}

	protected onEdit() {
		this.openVPage(VAssignEdit);
	}
/*
	protected renderCheckItem(v:CheckItem, checkable:boolean) {
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
*/
}
