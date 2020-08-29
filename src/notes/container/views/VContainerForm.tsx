import React from 'react';
import { computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import { ConfirmOptions } from 'tonva';
import { CContainer } from '../CContainer';
import { VNoteBaseView } from '../../noteBase';

export abstract class VContainerForm<T extends CContainer> extends VNoteBaseView<T> {
	@observable private changed: boolean = false;
	private inputAdd: HTMLInputElement;

	header() {return this.t('notes')}

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

	protected getOptions(): {val:number, text:string}[] {
		return [
			{ val: 0, text: '文字' },
			{ val: 2, text: '列表' },
			{ val: 1, text: '勾选事项' },
		];
	}

	protected renderEdit() {
		let radios = this.getOptions();

		return <div className="m-2">
			<div className="border rounded">
				<div className="bg-white">
					<div className="py-1 px-1 border-bottom">
						<input type="text" className="w-100 border-0 form-control font-weight-bold" placeholder="标题" maxLength={80}
							onChange={this.onTitleChange}
							defaultValue={this.controller.title} />
					</div>
					<div className="py-1 px-1">
						{React.createElement(observer(() => this.renderContentTextArea()))}
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
			{ radios &&
				<div className="m-2 form-check">
					{radios.map((v, index) => {
						let { val, text } = v;
						return <label key={index} className="mb-0 mx-2">
							<input className="mr-1" type="radio" value={val}
								defaultChecked={this.controller.checkType === val} name={'checktype'} onChange={this.onCheckableChanged} />
							{text}
					</label>
					})}
				</div>
			}
		</div>;
	}

	private renderContentTextArea() {
		return <textarea rows={10} 
			className="w-100 border-0 form-control" 
			placeholder={this.t('notes')} maxLength={20000}
			defaultValue={this.controller.noteContent}
			onChange={this.onContentChange} />;
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
}
