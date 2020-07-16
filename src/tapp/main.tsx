import * as React from 'react';
import { VPage, TabCaptionComponent, Page, TabProp } from 'tonva';
import { CApp } from './CApp';

const color = (selected: boolean) => selected === true ? 'text-primary' : 'text-muted';
function caption(label:string, icon:string) {
	return (selected: boolean) => TabCaptionComponent(label, icon, color(selected));
}
export class VMain extends VPage<CApp> {
    async open(param?: any) {
        this.openPage(this.render);
    }

    render = (param?: any): JSX.Element => {
		let { cHome /*cGroup, cReport, cMe*/ } = this.controller;
		/*
        let faceTabs = [
			{ name: 'note', label: '首页', icon: 'home', content: cGroup.tab},
			{ name: 'job', label: '查看', icon: 'list', content: cReport.tab, onShown: cReport.load, className: 'job-tab' },
            //{ name: 'home', label: '绩效', icon: 'tasks', content: cHome.tab, },
            { name: 'me', label: '我的', icon: 'user', content: cMe.tab }
        ].map(v => {
            let { name, label, icon, content, onShown, className } = v;
            return {
                name: name,
                caption: (selected: boolean) => TabCaptionComponent(label, icon, color(selected)),
                content: content,
				onShown: onShown,
				className: className
            }
		});
		*/
		let faceTabs: TabProp[] = [
			{name: 'home', caption: caption('首页', 'home'), content: cHome.tab}
		];
		return <Page tabsProps={{tabs:faceTabs}} />;
    }
}
