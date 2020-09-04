import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

interface Focusable<T> {
	item: T;
	focused: boolean;
}

export interface ListInputProps<T> {
	items: T[];
	uniqueKey: () => number;
	onInputChange: (text:string) => void;
	onAddNewItem: () => void;
	onItemChecked: (item:T) => void;
}

export abstract class ListInputBase<T> {
	private props: ListInputProps<T>;
	@observable private focusables: Focusable<T>[];
	private currentFocusable: Focusable<T>;
	private currentItemIndex: number = -1;
	private inputingText: string;

	constructor(props: ListInputProps<T>) {
		this.props = props;
		let {items} = props;
		this.focusables = items.map(item => ({item, focused: false}));
	}

	protected abstract getItemKey(item:T): string|number;
	protected abstract getItemText(item:T): string;
	protected abstract setItemText(item:T, text:string): void;
	protected abstract newItem(key:number, text:string): T;

	render(): JSX.Element {
		return <div>
			{this.focusables.map(this.renderItem)}
			{this.renderAddNew()}
		</div>;
	}

	protected renderItem = (focusable: Focusable<T>):JSX.Element => {
		let {focused, item} = focusable;
		return focused === true? this.renderInputItem(item) : this.renderTextItem(focusable);
	}

	protected renderAddNew():JSX.Element {
		return <div className="d-flex mx-3 my-2 align-items-center">
			<span className="mr-2">new:</span> {this.renderInput()}
		</div>;
	}

	protected renderTextItem(focusable:Focusable<T>):JSX.Element {
		let {item} = focusable;
		let key = this.getItemKey(item);
		let text = this.getItemText(item);
		return <div key={key} className="px-3 py-2" onClick={() => this.onItemClick(focusable)}>{text}</div>
	}

	private onItemClick(focusable: Focusable<T>) {
		if (this.currentFocusable) {
			this.currentFocusable.focused = false;
		}
		this.currentFocusable = focusable;
		focusable.focused = true;
	}

	protected renderInputItem(item: T):JSX.Element {
		let key = this.getItemKey(item);
		return <div key={key} className="d-flex mx-3 my-2 align-items-center">
			<span className="mr-2">item:</span> {this.renderInput(item)}
		</div>;
	}

	protected renderInput(item?:T):JSX.Element {
		return <input className="flex-fill form-control border-0"
			type="text"
			defaultValue={this.getItemText(this.currentFocusable?.item)}
			ref={this.inputRef}
			onBlur={this.onBlur}
			onKeyDown={this.onKeyDown} onChange={this.onChange} />;
	}
	protected input: HTMLInputElement;
	private onKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
		if (evt.keyCode === 13) {
			this.onAddNewItem();
		}
	}

	private onBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
	}
	private onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		let {value} = evt.target;
		//this.props.onInputChange(value);
		this.inputingText = value;
		if (this.currentFocusable) this.setItemText(this.currentFocusable.item, value);
	}
	private inputRef = (input: any) => {
		if (!input) return;
		if (window.getComputedStyle(input).visibility === 'hidden') return;
		this.input = input;
		//this.input.focus();
	}

	private onAddNewItem() {
		//this.props.items.push(this.newItem(this.props.uniqueKey(), this.inputingText));
		this.focusables.push(
			{
				item: this.newItem(this.props.uniqueKey(), this.inputingText),
				focused: false
			}
		);
		this.inputingText = undefined;
		this.input.value = '';
		this.currentFocusable = undefined;
	}
}
