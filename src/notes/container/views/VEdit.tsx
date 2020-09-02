import React from 'react';
import { CContainer } from "../CContainer";
import { observer } from 'mobx-react';
import { VContainerForm } from './VContainerForm';

export class VEdit extends VContainerForm<CContainer> {
	protected get back(): 'close' | 'back' | 'none' {return 'close'}
	header() {
		return '编辑目录';
	}

	protected renderEditBottom():JSX.Element {
		return <div className="py-2 pl-3 bg-light border-top d-flex">
			<div className="mr-auto" />
			{React.createElement(observer(() => <>
				<button onClick={() => this.onButtonSave()}
					className="btn btn-primary mr-3" disabled={this.btnSaveDisabled}>
					保存
				</button>
			</>))}
		</div>;
	}
}
