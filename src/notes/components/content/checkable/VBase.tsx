import React from 'react';
import { View } from "tonva";
import { CCheckable, CheckItem } from './CCheckable';
import { observer } from 'mobx-react';

export abstract class VBase extends View<CCheckable> {
	render() {
		return React.createElement(observer(() => {
			let uncheckedItems:CheckItem[] = [];
			let checkedItems:CheckItem[] = [];
			for (let ci of this.controller.items) {
				let {checked} = ci;
				if (checked === true) checkedItems.push(ci);
				else uncheckedItems.push(ci);
			}
			return <div className="mb-2">
				{uncheckedItems.map((v, index) => this.renderCheckItem(v))}
				{this.renderCheckedItems(checkedItems)}
			</div>;
		}));
	}

	protected abstract renderCheckItem(v:CheckItem):JSX.Element;
	protected abstract renderCheckedItems(checkedItems:CheckItem[]):JSX.Element;
}
