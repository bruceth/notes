import React from 'react';
import { CMe } from './CMe';
import { VPage } from 'tonva';

export class VMe extends VPage<CMe> {
	header() {return  '我'}

	logout(): boolean | (()=>Promise<void>) {return true;}

	content() {
		return <div className="p-3">
			<div className="mb-3">
				{this.renderMe()}
			</div>
			<div className="small text-muted">
				正在建设中...
			</div>
		</div>;
	}
}
