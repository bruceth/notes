//import { VRelatives } from '../../../noteBase';
//import { RelativeKey } from '../../../model';
//import { CNoteTask } from '../CNoteTask';

import { CNoteTask } from "./CNoteTask";
import { VRelatives } from "../../noteBase";
import { RelativeKey } from "../../model";

export class VTaskRelatives extends VRelatives<CNoteTask> {
	protected arr:RelativeKey[] = ['comment'];

	render() {
		return super.render();
	}
}
