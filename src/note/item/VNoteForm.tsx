import React from 'react';
import { computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import { VNoteBase, CheckItem } from '.';
import { FA, ConfirmOptions } from 'tonva';
import { CNoteItem } from './CNoteItem';
import { notesName } from '../../note';
import { threadId } from 'worker_threads';
import { VItemInput, ItemInputProps } from './VItemInput';

export abstract class VNoteForm<T extends CNoteItem> extends VNoteBase<T> {
	@observable private changed: boolean = false;
	private inputAdd: HTMLInputElement;

	header() {return notesName}

	protected onTitleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		this.controller.title = evt.target.value.trim();
	}

	protected onContentChange = (evt:React.ChangeEvent<HTMLTextAreaElement>) => {
		this.controller.changedNoteContent = evt.target.value;
	}

	@computed protected get btnSaveDisabled():boolean {
		if (this.changed === true) return false;
		return this.getSaveDisabled();
	}

	protected abstract getSaveDisabled():boolean;

	protected abstract onButtonSave(): Promise<void>;

	protected async onDelete(): Promise<void> {
		let options: ConfirmOptions = {
			caption: '请确认',
			message: '真的要删除这个小单吗？',
			yes: '确认删除',
			no: '不删除'
		};
		if (await this.controller.confirm(options) === 'yes') {
			await this.controller.owner.hideNote(this.controller.noteItem.note, 1);
			this.closePage(2);
		}
	}

	private onCheckableChanged = (evt:React.ChangeEvent<HTMLInputElement>) => {
		this.changed = true;
		this.controller.onCheckableChanged(Number(evt.target.value));
	}

	protected renderDeleteButton() {
		return <button className="btn btn-outline-secondary mr-3" onClick={() => this.onDelete()}>
			删除
		</button>;
	}

	protected abstract renderExButtons():JSX.Element;

	protected renderEdit() {
		let radios = [
			{ val: 0, text: '文字' },
			{ val: 1, text: '可勾选事项' },
			{ val: 2, text: '分段落' },
		];

		return <div className="m-2">
			<div className="border rounded">
				<div className="bg-white">
					<div className="py-1 px-1 border-bottom">
						<input type="text" className="w-100 border-0 form-control font-weight-bold" placeholder="标题" maxLength={80}
							onChange={this.onTitleChange}
							defaultValue={this.controller.title} />
					</div>
					<div className="py-1 px-1">
						{React.createElement(observer(() => this.controller.checkType === 0 ? 
							this.renderContentTextArea()
							: this.controller.checkType === 1 ? this.renderContentCheckList(): this.renderContentEditList()))}
					</div>
				</div>
				<div className="py-2 pl-3 bg-light border-top d-flex">
					<div className="mr-auto" />
					{React.createElement(observer(() => <>
						<button onClick={() => this.onButtonSave()}
							className="btn btn-primary mr-3" disabled={this.btnSaveDisabled}>
							保存
						</button>
					</>))}
					{this.renderExButtons()}
				</div>
			</div>
			<div className="m-2 form-group form-check">
				{radios.map((v, index) => {
					let { val, text } = v;
					return <label key={index} className="mb-0 mx-2">
						<input className="mr-1" type="radio" value={val}
							defaultChecked={this.controller.checkType === val} name={'checktype'} onChange={this.onCheckableChanged} />
						{text}
				</label>
				})}
			</div>
		</div>;
	}

	private renderContentTextArea() {
		return <textarea rows={10} 
			className="w-100 border-0 form-control" 
			placeholder={notesName} maxLength={20000}
			defaultValue={this.controller.noteContent}
			onChange={this.onContentChange} />;
	}

	private renderContentEditList() {
		let items = this.controller.items;
		return <>
			<ul className="note-content-list px-3">
			{
				items.map((v, index) => {
					let {key, text} = v;
					let onItemUpdate = async (v:string) => {
						this.onItemChanged(key, v);
					}
					let param:ItemInputProps = {
						onUpdate: onItemUpdate,
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
					return <div key={key} className="d-flex mx-3 my-2 align-items-center form-group form-check">
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
				checkedItems.length > 0 && <div className="border-top mt-2 pt2">
					<div className="px-3 pt-2 small text-muted">{checkedItems.length}项完成</div>
					{checkedItems.map((v, index) => {
						let {key, text, checked} = v;
						return <div key={key} className="d-flex mx-3 my-2 align-items-center form-group form-check">
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
			this.controller.items.push({
				key: this.controller.itemKey++,
				text: value,
				checked: false,
			});
			evt.currentTarget.value = '';
		}
	}

	protected checkInputAdd() {
		let {checkType} = this.controller;
		if ((checkType === 1 || checkType === 2) && this.inputAdd) {
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

	private onItemChanged = (key: number, value: string) => {
		let item = this.controller.items.find(v => v.key === key);
		if (item) item.text = value;
		this.changed = true;
	}

	private onItemChange = (evt:React.ChangeEvent<HTMLInputElement>) => {
		let t = evt.currentTarget;
		let key = Number(t.getAttribute('data-key'));
		let item = this.controller.items.find(v => v.key === key);
		if (item) item.text = t.value;
		this.changed = true;
	}

	private onItemKeyDown = (evt:React.KeyboardEvent<HTMLInputElement>) => {
		if (evt.keyCode === 13) {
			if (this.inputAdd) this.inputAdd.focus();
		}
	}
}
