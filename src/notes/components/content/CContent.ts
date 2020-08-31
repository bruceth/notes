import { Controller } from "tonva";
import { EnumContentType } from "./createCContent";
import { observable } from "mobx";

export abstract class CContent extends Controller {
	@observable changed: boolean = false;
	protected async internalStart() {}

	abstract get contentType(): EnumContentType;
	onContentChanged: () => Promise<void>;
	
	abstract buildObj(obj:any): void;

	abstract renderInput(): JSX.Element;
	abstract renderContent(): JSX.Element;
	renderItemContent(): JSX.Element {return this.renderContent();}
}
