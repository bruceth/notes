import { VInput } from "./VInput";
import { VView } from "./VView";
import { CTextBase } from "../textBase";
import { EnumContentType } from "../createCContent";

export class CFolder extends CTextBase {
	get contentType(): EnumContentType {return EnumContentType.folder;}
	renderInput():JSX.Element {return this.renderView(VInput)}
	renderContent():JSX.Element {return this.renderView(VView)}
}

