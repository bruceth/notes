import React from 'react';
import { View, FA } from "tonva";
import { CList } from './CList';
import { ItemInputProps, VItemInput } from '../VItemInput';
import { observer } from 'mobx-react';

export class VInput extends View<CList> {
	private inputAdd: HTMLInputElement;
	render() {
		return <div className="py-1 px-1">
			{React.createElement(observer(() => this.renderContentEditList()))}
		</div>;
	}

	private renderContentEditList() {
		let items = this.controller.items;
		return <>
			<ul className="note-content-list px-3">
			{
				items.map((v, index) => {
					let {key, text} = v;
					let onItemChange = async (v:string) => {
						//this.onItemChanged(key, v);
						this.controller.onItemChanged(key, v);
					}
					let param:ItemInputProps = {
						onChange: onItemChange,
						content: text,
					}
					return <li key={key} className="ml-3 align-items-center">
						{this.renderVm(VItemInput, param)}
					</li>
				})
			}
			</ul>
			<div className="d-flex mx-3 my-2 align-items-center">
				<FA name="plus" className="text-info mr-2" />
				<input ref={t => this.inputAdd = t} className="flex-fill form-control" type="text" placeholder="新增" onKeyDown={this.onAddEnter} />
			</div>
		</>;
	}

	private onAddEnter = (evt:React.KeyboardEvent<HTMLInputElement>) => {
		if (evt.keyCode === 13) {
			//let {value} = evt.currentTarget;
			//if (value.trim().length === 0) return;
			this.controller.addNewItem();
			evt.currentTarget.value = '';
		}
	}
	/*
	checkInputAdd = () => {
		if (this.inputAdd) {
			let {value} = this.inputAdd;
			if (value.trim().length === 0) return;
			this.controller.addItem(value);
			this.inputAdd.value = '';
		}
	}
	*/
}
