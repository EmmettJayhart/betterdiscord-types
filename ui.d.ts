import { Setting, SettingGroupProps } from "./components";

export interface UI {
    /** Shows a generic but customizable modal. */
    alert(title: string, content: React.ReactNode): void;

    /** Creates a tooltip to show on hover. */
    createTooltip(
        node: HTMLElement,
        content: string | HTMLElement,
        options?: TooltipOptions,
    ): Tooltip;

    /** Shows a generic but customizable confirmation modal with optional confirm and cancel callbacks. */
    showConfirmationModal(
        title: string,
        content: React.ReactNode,
        options?: ConfirmationModalOptions,
    ): string;

    /** Shows a toast towards the bottom of the screen. */
    showToast(content: string, options?: ToastOptions): void;

    /** Shows a notice above Discord's chat layer. */
    showNotice(content: string | Node, options?: NoticeOptions): CloseNotice;

    /** Opens an Electron dialog. */
    openDialog(options: DialogSaveOptions): Promise<DialogSaveResult>;
    openDialog(options: DialogOpenOptions): Promise<DialogOpenResult>;

    /** Shows a changelog modal. Customizable with images, videos, colored sections and supports markdown. */
    showChangelogModal(options: ChangelogModalOptions): string;

    /** Creates a single setting input wrapped in a setting item that has a name and note. */
    buildSettingItem(setting: Setting): React.ReactElement;

    /** Creates a settings panel. */
    buildSettingsPanel(options: SettingsPanelOptions): React.ReactElement;
}

export interface TooltipOptions {
    style?: "primary" | "info" | "success" | "warn" | "danger";
    side?: "top" | "right" | "bottom" | "left";
    preventFlip?: boolean;
    disabled?: boolean;
}

export type Tooltip = any;

export interface ConfirmationModalOptions {
    danger?: boolean;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    onClose?: () => void;
}

export interface NoticeOptions {
    type?: "info" | "error" | "warning" | "success";
    buttons?: { label: string; onClick: () => void }[];
    timeout?: number;
}

export type CloseNotice = (immediately?: boolean) => void;

export interface ToastOptions {
    type?: "" | "info" | "success" | "danger" | "error" | "warning" | "warn";
    icon?: boolean;
    timeout?: number;
    forceShow?: boolean;
}

export interface DialogOptions {
    mode?: "open" | "save";
    defaultPath?: string;
    filters?: FileFilter[];
    title?: string;
    message?: string;
    showOverwriteConfirmation?: boolean;
    showHiddenFiles?: boolean;
    promptToCreate?: boolean;
    openDirectory?: boolean;
    openFile?: boolean;
    multiSelections?: boolean;
    modal?: boolean;
}

export interface FileFilter {
    name: string;
    extensions: string[];
}

export interface DialogOpenOptions extends DialogOptions {
    mode?: "open";
}

export interface DialogSaveOptions extends DialogOptions {
    mode: "save";
}

export interface DialogResult {
    canceled: boolean;
    filePath?: string;
    filePaths?: string[];
}

export interface DialogOpenResult extends Omit<DialogResult, "filePath"> {
    filePaths: string[];
}

export interface DialogSaveResult extends Omit<DialogResult, "filePaths"> {
    filePath: string;
}

export interface Changes {
    title: string;
    type: "fixed" | "added" | "progress" | "changed";
    items: string[];
    blurb?: string;
}

export interface ChangelogModalOptions {
    title: string;
    subtitle: string;
    blurb?: string;
    banner?: string;
    video?: string;
    poster?: string;
    footer?: React.ReactNode;
    changes?: Changes[];
}

type CategorySetting = Omit<
    SettingGroupProps,
    "onChange" | "onDrawerToggle" | "shown"
>;

export type SettingsPanelSetting = Setting | CategorySetting;

export interface SettingsPanelOptions {
    settings: SettingsPanelSetting[];
    onChange: (
        categoryId: string | null,
        settingId: string,
        value: any,
    ) => void;
    onDrawerToggle?: (categoryId: string, state: boolean) => void;
    getDrawerState?: (categoryId: string, defaultState: boolean) => boolean;
}
