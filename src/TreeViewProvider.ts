import { TreeItem, TreeItemCollapsibleState, TreeDataProvider, Uri, window, Event, ProviderResult } from 'vscode';
import { join } from 'path';

const ITEM_ICON_MAP = new Map<string,string>([
    ['new form','form.svg'],
    ['arrow','arrow.svg'],
    ['button','btn.svg'],
    ['entry','entry.svg'],
    ['label','label.svg'],
    ['frame','frame.svg'],
    ['checkbutton','checkbutton.svg'],
    ['radiobutton','radiobutton.svg'],
    ['progressbar','progressbar.svg'],
    ['submit','submit.svg']
    
]);

export class TreeItemNode extends TreeItem{
    constructor(
        public readonly label: string,
        public readonly collapsibleState: TreeItemCollapsibleState,
    ){
        super(label,collapsibleState);
    }

    command = {
        title: this.label,          // 标题
        command: 'itemClick',       // 命令 ID
        tooltip: this.label,        // 鼠标覆盖时的小小提示框
        arguments: [                // 向 registerCommand 传递的参数。
            this.label,             // 目前这里我们只传递一个 label
        ]
    };
    iconPath = TreeItemNode.getIconUriForLabel(this.label);
    static getIconUriForLabel(label: string):Uri {
        return Uri.file(join(__filename,'..','..' ,'src' ,'static','icon', ITEM_ICON_MAP.get(label)+''));
    }
}

export class ElementProvider implements TreeDataProvider<TreeItemNode>{
    onDidChangeTreeData?: import("vscode").Event<void | TreeItemNode | null | undefined> | undefined;
    getTreeItem(element: TreeItemNode): TreeItem | Thenable<TreeItem> {
        return element;
    }
    getChildren(element?: TreeItemNode | undefined): import("vscode").ProviderResult<TreeItemNode[]> {
        return ['button','entry','label','frame','checkbutton','radiobutton','progressbar'].map(
            item => new TreeItemNode(
                item as string,
                TreeItemCollapsibleState.None as TreeItemCollapsibleState,
            )
        );
    }
    public static initElementItem(){
        // 实例化 TreeViewProvider
        const elementProvider = new ElementProvider();
        // registerTreeDataProvider：注册树视图
        // 你可以类比 registerCommand(上面注册 Hello World)
        window.registerTreeDataProvider('element-item',elementProvider);
    }
    
}

export class SysChoiceProvider implements TreeDataProvider<TreeItemNode>{
    onDidChangeTreeData?: import("vscode").Event<void | TreeItemNode | null | undefined> | undefined;
    getTreeItem(element: TreeItemNode): TreeItem | Thenable<TreeItem> {
        return element;
    }
    getChildren(element?: TreeItemNode | undefined): import("vscode").ProviderResult<TreeItemNode[]> {
        return ['new form','arrow','submit'].map(
            item => new TreeItemNode(
                item as string,
                TreeItemCollapsibleState.None as TreeItemCollapsibleState,
            )
        );
    }
    public static initSysChoiceItem(){
        // 实例化 TreeViewProvider
        const sysProvider = new SysChoiceProvider();
        // registerTreeDataProvider：注册树视图
        // 你可以类比 registerCommand(上面注册 Hello World)
        window.registerTreeDataProvider('sys-item',sysProvider);
    }
    
}
