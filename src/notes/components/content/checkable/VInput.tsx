import React from 'react';
import { View, FA } from "tonva";
import { CCheckable, CheckItem } from './CCheckable';
import { ItemInputProps, VItemInput } from '../VItemInput';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

export class VInput extends View<CCheckable> {
	@observable protected changed: boolean = false;
	private inputAdd: HTMLInputElement;
	render() {
		return <div className="py-1 px-1">
			{React.createElement(observer(() => this.renderContentCheckList()))}
		</div>;
	}

	private renderContentCheckList() {
		let uncheckedItems:CheckItem[] = [];
		let checkedItems:CheckItem[] = [];
		for (let ci of this.controller.items) {
			let {checked} = ci;
			if (checked === true) checkedItems.push(ci);
			else uncheckedItems.push(ci);
		}
		return <div className="">
			{
				uncheckedItems.map((v, index) => {
					let {key, text, checked} = v;
					let onItemUpdate = async (v:string) => {
						this.onItemChanged(key, v);
					}
					let param:ItemInputProps = {
						onUpdate: onItemUpdate,
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
				<input ref={t => this.inputAdd = t} className="flex-fill form-control" type="text" placeholder="新增" onKeyDown={this.onAddEnter} />
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
			let {value} = evt.currentTarget;
			if (value.trim().length === 0) return;
			this.controller.addItem(value);
			evt.currentTarget.value = '';
		}
	}

	private onItemChanged = (key: number, value: string) => {
		let item = this.controller.items.find(v => v.key === key);
		if (item) item.text = value;
		this.changed = true;
	}

	checkInputAdd = () => {
		if (this.inputAdd) {
			let {value} = this.inputAdd;
			if (value.trim().length === 0) return;
			this.controller.addItem(value);
			this.inputAdd.value = '';
		}
	}
	
	private onCheckChange = (evt:React.ChangeEvent<HTMLInputElement>) => {
		let t = evt.currentTarget;
		let key = Number(t.getAttribute('data-key'));
		let item = this.controller.items.find(v => v.key === key);
		if (item) item.checked = t.checked;
	}
}
