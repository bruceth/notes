import React from 'react';
import { CRelation } from './CRelation';
import { VPage, FA } from 'tonva';
import { VAdd } from './VAdd';

export class VRelation extends VPage<CRelation> {
	header() {return '关系'}

	right() {
		return <button className="btn btn-sm btn-primary mr-1" onClick={()=>this.openVPage(VAdd)}>
			<FA name="user-plus" />
		</button>;
	}

	content() {
		return <div className="p-3">各种关系</div>
	}
}
