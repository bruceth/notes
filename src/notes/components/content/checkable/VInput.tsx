import React from 'react';
import { View, FA } from "tonva";
import { CCheckable } from './CCheckable';
import { ItemInputProps, VItemInput } from '../VItemInput';
import { observer } from 'mobx-react';

export class VInput extends View<CCheckable> {
	render() {
		return <div className="py-1 px-1">
			{React.createElement(observer(() => this.renderContentCheckList()))}
		</div>;
	}

	private renderContentCheckList() {
		let {uncheckedItems, checkedItems} = this.controller.getItems();
		return <div className="">
			{
				uncheckedItems.map((v, index) => {
					let {key, text, checked} = v;
					let onItemChange = async (v:string) => {
						//this.onItemChanged(key, v);
						this.controller.onItemChanged(key, v);
					}
					let param:ItemInputProps = {
						onChange: onItemChange,
						content: text,
					}
					return <div key={key} className="d-flex mx-3 my-2 align-items-center form-check">
						<input className="form-check-input mr-3 mt-0" type="checkbox"
							defaultChecked={checked}
							onChange={this.onCheckChange}
							data-key={key} />
						{this.renderVm(VItemInput, param)}
					</div>
				})
			}
			<div className="d-flex mx-3 my-2 align-items-center">
				<FA name="plus" className="text-info mr-2" />
				<input className="flex-fill form-control" 
					type="text" 
					placeholder="新增" 
					onChange={(e) => this.controller.onItemChanged(0, e.target.value)}
					onKeyDown={this.onAddEnter} />
			</div>
			{
				checkedItems.length > 0 && <div className="border-top mt-2 py-2">
					<div className="px-3 pt-2 small text-muted">{checkedItems.length}项完成</div>
					{checkedItems.map((v, index) => {
						let {key, text, checked} = v;
						return <div key={key} className="d-flex mx-3 my-2 align-items-center form-check">
							<input className="form-check-input mr-3 mt-0" type="checkbox" 
								defaultChecked={checked} 
								onChange={this.onCheckChange} 
								data-key={key} />
							<div className="text-muted form-control-plaintext ml-3"><del>{text}</del></div>
						</div>
					})}
				</div>
			}
		</div>;
	}

	private onAddEnter = (evt:React.KeyboardEvent<HTMLInputElement>) => {
		if (evt.keyCode === 13) {
			//let {value} = evt.currentTarget;
			//if (value.trim().length === 0) return;
			this.controller.addNewItem();
			evt.currentTarget.value = '';
		}
	}

	private onCheckChange = (evt:React.ChangeEvent<HTMLInputElement>) => {
		let t = evt.currentTarget;
		let key = Number(t.getAttribute('data-key'));
		let item = this.controller.items.find(v => v.key === key);
		if (item) item.checked = t.checked;
		this.controller.changed = true;
	}
}
