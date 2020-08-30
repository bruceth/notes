import { Controller } from "tonva";
import { EnumContentType } from "./createCContent";

export abstract class CContent extends Controller {
	protected async internalStart() {}

	checkType: EnumContentType;
	onContentChanged: () => Promise<void>;

	abstract renderInput(): JSX.Element;
	abstract renderContent(): JSX.Element;
	abstract buildObj(obj:any): void;
}
