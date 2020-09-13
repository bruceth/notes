import { CFolder } from "../CFolder";

export class CFolderRoot extends CFolder {
	renderIcon(): JSX.Element {return;}
	showAddPage() {}
	showEditPage() {}

	showFolder(): void {
		this.load();
		//this.openVPage(VFolder);
	}
}
