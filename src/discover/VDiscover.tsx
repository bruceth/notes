import React from 'react';
import { CDiscover } from './CDiscover';
import { VPage } from 'tonva';

export class VDiscover extends VPage<CDiscover> {
	header() {return '发现'}
	content() {
		return <div className="p-3">
			各种报表和数据
		</div>
	}
}
