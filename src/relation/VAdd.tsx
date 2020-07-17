import React from "react";
import { CRelation } from "./CRelation";
import { VPage } from "tonva";

export class VAdd extends VPage<CRelation> {
	header() {return '新增联系人'}
	content() {
		return <div className="p-3">
			联系人
		</div>;
	}
}