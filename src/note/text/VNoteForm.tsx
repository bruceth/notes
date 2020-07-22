import React from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import { VNoteBase, CheckItem } from '../item';
import { FA } from 'tonva';
import { CTextNoteItem } from './CTextNoteItem';

export abstract class VNoteForm extends VNoteBase<CTextNoteItem> {
	private inputAdd: HTMLInputElement;

	protected onTitleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		this.title = evt.target.value.trim();
	}

	protected onContentChange = (evt:React.ChangeEvent<HTMLTextAreaElement>) => {
		this.changedNoteContent = evt.target.value;
	}

	@computed protected get btnSaveDisabled():boolean {
		return this.getSaveDisabled();
	}

	protected abstract getSaveDisabled():boolean;

	protected abstract onButtonSave(): Promise<void>;

	private onCheckableChanged = (evt:React.ChangeEvent<HTMLInputElement>) => {
		this.checkable = evt.target.checked;
		if (this.checkable === true) {
			let content = this.changedNoteContent || this.noteContent;
			if (content) {
				this.items.splice(0, this.items.length);
				this.items.push(...content.split('\n').map((v, index) => {
					return {
						key: this.itemKey++,
						text: v,
						checked: false
					}
				}));
			}
		}
		else {
			this.noteContent = this.items.map(v => v.text).join('\n');
		}
		this.changedNoteContent = undefined;
	}

	protected renderEdit() {
		return <div className="m-2">
			<div className="border rounded">
				<div className="bg-white">
					<div className="py-1 px-1 border-bottom">
						<input type="text" className="w-100 border-0 form-control" placeholder="标题" maxLength={80}
							onChange={this.onTitleChange}
							defaultValue={this.title} />
					</div>
					<div className="py-1 px-1">
						{React.createElement(observer(() => this.checkable===false? 
							this.renderContentTextArea()
							: this.renderContentList()))}
					</div>
				</div>
				<div className="py-2 px-3 bg-light border-top d-flex">
					<div className="mr-auto" />
					{React.createElement(observer(() => <button onClick={() => this.onButtonSave()}
						className="btn btn-primary" disabled={this.btnSaveDisabled}>
						保存
					</button>))}
				</div>
			</div>
			<div className="m-2 form-group form-check">
				<label>
					<input type="checkbox" className="form-check-input" 
						onChange={this.onCheckableChanged}
						defaultChecked={this.checkable} /> 勾选条目
				</label>
			</div>
		</div>;
	}

	private renderContentTextArea() {
		return <textarea rows={10} 
			className="w-100 border-0 form-control" 
			placeholder="记事" maxLength={20000}
			defaultValue={this.noteContent}
			onChange={this.onContentChange} />;
	}

	private renderContentList() {
		let uncheckedItems:CheckItem[] = [];
		let checkedItems:CheckItem[] = [];
		for (let ci of this.items) {
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
			this.items.push({
				key: this.itemKey++,
				text: value,
				checked: false,
			});
			evt.currentTarget.value = '';
		}
	}
	
	private onCheckChange = (evt:React.ChangeEvent<HTMLInputElement>) => {
		let t = evt.currentTarget;
		let key = Number(t.getAttribute('data-key'));
		let item = this.items.find(v => v.key === key);
		if (item) item.checked = t.checked;
	}

	private onItemChange = (evt:React.ChangeEvent<HTMLInputElement>) => {
		let t = evt.currentTarget;
		let key = Number(t.getAttribute('data-key'));
		let item = this.items.find(v => v.key === key);
		if (item) item.text = t.value;
	}

	private onItemKeyDown = (evt:React.KeyboardEvent<HTMLInputElement>) => {
		if (evt.keyCode === 13) {
			if (this.inputAdd) this.inputAdd.focus();
		}
	}
}
