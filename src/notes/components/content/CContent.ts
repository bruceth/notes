import { Controller } from "tonva";
import { EnumContentType } from "./createCContent";

export abstract class CContent extends Controller {
	protected async internalStart() {}

	abstract get contentType(): EnumContentType;
	onContentChanged: () => Promise<void>;
	
	abstract buildObj(obj:any): void;

	abstract renderInput(): JSX.Element;
	abstract renderContent(): JSX.Element;
	renderItemContent(): JSX.Element {return this.renderContent();}
}
