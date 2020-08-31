import React from 'react';
import { View, FA } from "tonva";
import { CCheckable, CheckItem } from './CCheckable';
import { observer } from 'mobx-react';
import { VBase } from './VBase';

export class VView extends VBase {
	protected renderCheckItem(v:CheckItem) {
		let {key, text, checked} = v;
		let cn = 'ml-3 ';
		let content: any;
		if (checked === true) {
			cn += 'text-muted ';
			content = <del>{text}</del>;
		}
		else {
			content = text;
		}
		return <div key={key} className="d-flex mx-3 align-items-center form-check">
			<input className="form-check-input mr-3 mt-0" type="checkbox"
				defaultChecked={checked}
				data-key={key} />
			<div className={'form-control-plaintext ' + cn}>{content}</div>
		</div>;
	}

	protected renderCheckedItems(checkedItems:CheckItem[]):JSX.Element {
		let checkedCount = checkedItems.length;
		if (checkedCount > 0) {
			return <div className="border-top py-2">
				<div className="px-3 pt-2 small text-muted">{checkedCount}项完成</div>
				{checkedItems.map((v, index) => this.renderCheckItem(v))}
			</div>;
		}
	}
}
