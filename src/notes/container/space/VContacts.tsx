import { VBasePage } from 'notes/views/VBasePage';
import React from 'react';
import { CSpace } from './CSpace';

export class VContacts extends VBasePage<CSpace> {
	header() {return '选择联系人'}
	content() {
		return <div>
			选择联系人
		</div>
	}
}