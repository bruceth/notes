import React from 'react';
import { VEdit } from './VEdit';
import { observer } from 'mobx-react';
import { VNoteBaseView } from '../../noteBase';
import { CNoteText } from './CNoteText';
import { VTextRelatives } from './VTextRelatives';
import { CheckItem } from '../../model';

export class VTextView extends VNoteBaseView<CNoteText> {
	protected get back(): 'close' | 'back' | 'none' {return 'close'}
	header() {return this.t('notes')}

	content() {
		return React.createElement(observer(() => {
			let {title} = this.controller;
			return <div className="">
				{this.renderViewTop()}
				<div className="bg-white py-2 mb-3">
					{title && <div className="px-3 py-2">
						<div><b>{title}</b></div>
					</div>}
					{this.renderContent()}
				</div>
				{this.renderRelatives()}
			</div>;
		}));
	}

	protected renderRelatives() {
		return this.renderVm(VTextRelatives);
	}

	footer() {
		return this.renderBottomCommands();
	}

	protected renderBottomCommands() {
		return <div className="py-2 pl-3 bg-light border-top d-flex align-items-center">
			{this.renderShareButton()}
			<div className="flex-fill rounded-pill mr-3 border bg-white px-3 py-1 small cursor-pointer"
				onClick={this.onComment}>写评论...</div>
		</div>;
	}

	protected onEdit() {
		this.openVPage(VEdit);
	}

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
		let t = evt.currentTarget;
		let key = Number(t.getAttribute('data-key'));
		await this.controller.onCheckChange(key, t.checked);
	}
}
