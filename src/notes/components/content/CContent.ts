import { Controller } from "tonva";
import { EnumContentType } from "./createCContent";
import { observable } from "mobx";

export abstract class CContent extends Controller {
	@observable changed: boolean = false;
	protected async internalStart() {}

	checkHaveNewItem: () => void;

	abstract get contentType(): EnumContentType;
	onContentChanged: () => Promise<void>;
	
	abstract buildObj(obj:any): void;

	abstract renderInput(): JSX.Element;
	abstract renderViewContent(): JSX.Element;
	renderDirContent(): JSX.Element {return this.renderViewContent();}
}
