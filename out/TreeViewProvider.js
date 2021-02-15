"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SysChoiceProvider = exports.ElementProvider = exports.TreeItemNode = void 0;
const vscode_1 = require("vscode");
const path_1 = require("path");
const ITEM_ICON_MAP = new Map([
    ['new form', 'form.svg'],
    ['arrow', 'arrow.svg'],
    ['button', 'btn.svg'],
    ['entry', 'entry.svg'],
    ['label', 'label.svg'],
    ['frame', 'frame.svg'],
    ['checkbutton', 'checkbutton.svg'],
    ['radiobutton', 'radiobutton.svg'],
    ['progressbar', 'progressbar.svg'],
    ['submit', 'submit.svg']
]);
class TreeItemNode extends vscode_1.TreeItem {
    constructor(label, collapsibleState) {
        super(label, collapsibleState);
        this.label = label;
        this.collapsibleState = collapsibleState;
        this.command = {
            title: this.label,
            command: 'itemClick',
            tooltip: this.label,
            arguments: [
                this.label,
            ]
        };
        this.iconPath = TreeItemNode.getIconUriForLabel(this.label);
    }
    static getIconUriForLabel(label) {
        return vscode_1.Uri.file(path_1.join(__filename, '..', '..', 'src', 'static', 'icon', ITEM_ICON_MAP.get(label) + ''));
    }
}
exports.TreeItemNode = TreeItemNode;
class ElementProvider {
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        return ['button', 'entry', 'label', 'frame', 'checkbutton', 'radiobutton', 'progressbar'].map(item => new TreeItemNode(item, vscode_1.TreeItemCollapsibleState.None));
    }
    static initElementItem() {
        // 实例化 TreeViewProvider
        const elementProvider = new ElementProvider();
        // registerTreeDataProvider：注册树视图
        // 你可以类比 registerCommand(上面注册 Hello World)
        vscode_1.window.registerTreeDataProvider('element-item', elementProvider);
    }
}
exports.ElementProvider = ElementProvider;
class SysChoiceProvider {
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        return ['new form', 'arrow', 'submit'].map(item => new TreeItemNode(item, vscode_1.TreeItemCollapsibleState.None));
    }
    static initSysChoiceItem() {
        // 实例化 TreeViewProvider
        const sysProvider = new SysChoiceProvider();
        // registerTreeDataProvider：注册树视图
        // 你可以类比 registerCommand(上面注册 Hello World)
        vscode_1.window.registerTreeDataProvider('sys-item', sysProvider);
    }
}
exports.SysChoiceProvider = SysChoiceProvider;
//# sourceMappingURL=TreeViewProvider.js.map