declare module '@dadofcode/kt-helpers' {
  export interface AlertButton {
    text: string;
    className: string;
    value: any;
    dismiss: boolean;
  }

  export interface StyleConfig {
    backgroundClass?: string;
    foregroundClass?: string;
    iconClass?: string;
    borderClass?: string;
  }

  export interface StylesConfig {
    [key: string]: StyleConfig;
  }

  export interface AlertConfig {
    styles?: StylesConfig;
    defaultType?: string;
  }

  export interface ModalOptions {
    title: string;
    message: string;
    buttons: AlertButton[];
    type?: string;
    styles?: StyleConfig;
  }

  export interface FireOptions {
    title: string;
    message: string;
    buttons?: AlertButton[];
    type?: string;
    styles?: StyleConfig;
  }

  export default class Alerts {
    /**
     * Default configuration
     */
    static config: AlertConfig;

    /**
     * Set global configuration for all alerts
     */
    static setConfig(newConfig: AlertConfig): void;

    /**
     * Get styling classes based on alert type
     */
    static _getStyleClasses(type: string, customStyles?: StyleConfig): StyleConfig;

    /**
     * Internal helper to build and show a KTUI modal.
     */
    static _showModal(opts: ModalOptions): Promise<any>;

    /**
     * Simple alert with single OK button.
     */
    static show(title: string, message: string, type?: string, styles?: StyleConfig): Promise<void>;

    /**
     * Flexible alert with custom configuration.
     * @param config - Configuration object or title string
     */
    static fire(config: FireOptions | string, message?: string, type?: string, styles?: StyleConfig): Promise<any>;

    /**
     * Confirmation dialog with OK/Cancel.
     */
    static confirm(title: string, message: string, type?: string): Promise<boolean>;

    /**
     * Delete confirmation dialog with Cancel/Delete buttons.
     */
    static delete(title: string, message: string, type?: string): Promise<boolean>;

    /**
     * Error alert with single Close button.
     */
    static error(title: string, message: string, type?: string): Promise<void>;
  }
}
