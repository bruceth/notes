import React from 'react';
import { VBasePage } from "notes/views/VBasePage";
import { CAdminBase } from "./CUnitAdmin";

export class VReportsAdmin <C extends CAdminBase> extends VBasePage<C> {
	header() {return '报表设计'}
}
