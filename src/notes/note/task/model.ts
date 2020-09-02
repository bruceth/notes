import { Contact } from "model";

export interface AssignTaskParam {
	contacts: Contact[];
	checker: Contact;
	rater: Contact;
	point?: number;
	hours?: number;
}

export interface TaskCheckItemBase {
	key: number;
	text: string;
	checked?: boolean;
}

export interface TaskCheckItem extends TaskCheckItemBase {
	checkInfo?: string;
	rateInfo?: string;
}
