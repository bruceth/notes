import React from 'react';
import { computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import { VNoteBase, CheckItem } from '.';
import { FA, ConfirmOptions } from 'tonva';
import { CNoteItem } from './CNoteItem';
import { notesName } from '../../note';

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
		this.controller.checkable = evt.target.checked;
		if (this.controller.checkable === true) {
			let content = this.controller.changedNoteContent || this.controller.noteContent;
			if (content) {
				this.controller.items.splice(0, this.controller.items.length);
				this.controller.items.push(...content.split('\n').map((v, index) => {
					return {
						key: this.controller.itemKey++,
						text: v,
						checked: false
					}
				}));
			}
		}
		else {
			this.controller.noteContent = this.controller.items.map(v => v.text).join('\n');
		}
		this.controller.changedNoteContent = undefined;
	}

	protected renderEdit() {
		return <div className="m-2">
			<div className="border rounded">
				<div className="bg-white">
					<div className="py-1 px-1 border-bottom">
						<input type="text" className="w-100 border-0 form-control" placeholder="标题" maxLength={80}
							onChange={this.onTitleChange}
							defaultValue={this.controller.title} />
					</div>
					<div className="py-1 px-1">
						{React.createElement(observer(() => this.controller.checkable===false? 
							this.renderContentTextArea()
							: this.renderContentList()))}
					</div>
				</div>
				<div className="py-2 px-3 bg-light border-top d-flex">
					<div className="mr-auto" />
					{React.createElement(observer(() => <button onClick={() => this.onButtonSave()}
						className="btn btn-primary mr-3" disabled={this.btnSaveDisabled}>
						保存
					</button>))}
					<button className="btn btn-outline-secondary" onClick={() => this.onDelete()}>
						删除
					</button>
				</div>
			</div>
			<div className="m-2 form-group form-check">
				<label>
					<input type="checkbox" className="form-check-input" 
						onChange={this.onCheckableChanged}
						defaultChecked={this.controller.checkable} /> 勾选条目
				</label>
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

	private renderContentList() {
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
					return <div key={key} className="d-flex mx-3 my-2 align-items-center form-group form-check">
						<input className="form-check-input mr-3 mt-0" type="checkbox"
							defaultChecked={checked}
							onChange={this.onCheckChange}
							data-key={key} />
						<input className="flex-fill form-control border-0"
							type="text" defaultValue={text}
							onChange={this.onItemChange}
							onKeyDown={this.onItemKeyDown}
							data-key={key} />
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
	
	private onCheckChange = (evt:React.ChangeEvent<HTMLInputElement>) => {
		let t = evt.currentTarget;
		let key = Number(t.getAttribute('data-key'));
		let item = this.controller.items.find(v => v.key === key);
		if (item) item.checked = t.checked;
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
