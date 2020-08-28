export {CNoteTask} from './CNoteTask';

export interface TaskParam {
	label: string;
	values?: any;
	onClick?: () => void;
}
