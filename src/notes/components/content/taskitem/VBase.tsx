import React from 'react';
import { View } from "tonva";
import { CTaskItem } from './CTaskItem';
import { observer } from 'mobx-react';
import { TaskCheckItem } from 'notes/note/task/model';

export abstract class VBase extends View<CTaskItem> {
	render(allowCheck:boolean) {
		return React.createElement(observer(() => {
			let {uncheckedItems, checkedItems} = this.controller.getItems();
			return <div className="mb-2">
				{uncheckedItems.map((v, index) => this.renderCheckItem(v, allowCheck))}
				{this.renderCheckedItems(checkedItems, allowCheck)}
			</div>;
		}));
	}

	protected abstract renderCheckItem(v:TaskCheckItem, allowCheck:boolean):JSX.Element;
	protected abstract renderCheckedItems(checkedItems:TaskCheckItem[], allowCheck:boolean):JSX.Element;
}
