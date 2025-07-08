/**
 * Alerts - A simple, consistent interface for displaying modal alerts and confirmations
 * @module Alerts
 * 
 * @version v1.0.1
 * @author dad-of-code
 * @license MIT
 */

class Alerts {
    // Default configuration
    static config = {
        styles: {
            success: {
                backgroundClass: 'bg-success/20',
                foregroundClass: 'text-foreground',
                iconClass: 'ki-filled ki-check-circle text-success text-3xl',
                borderClass: 'dark:border-success/20 border-success/80'
            },
            warning: {
                backgroundClass: 'bg-warning/20',
                foregroundClass: 'text-foreground',
                iconClass: 'ki-filled ki-information-4 text-warning text-3xl',
                borderClass: 'dark:border-warning/20 border-warning/80'
            },
            secondary: {
                backgroundClass: 'bg-secondary/20',
                foregroundClass: 'text-foreground',
                iconClass: 'ki-filled ki-information-1 text-secondary text-3xl',
                borderClass: 'dark:border-secondary/20 border-secondary/80'
            },
            info: {
                backgroundClass: 'bg-info/20',
                foregroundClass: 'text-foreground',
                iconClass: 'ki-filled ki-information-1 text-info text-3xl',
                borderClass: 'dark:border-info/20 border-info/80'
            },
            error: {
                backgroundClass: 'bg-danger/20',
                foregroundClass: 'text-foreground',
                iconClass: 'ki-filled ki-cross-circle text-danger text-3xl',
                borderClass: 'dark:border-danger/20 border-danger/80'
            },
            destructive: {
                backgroundClass: 'bg-danger/20',
                foregroundClass: 'text-foreground',
                iconClass: 'ki-filled ki-trash text-danger text-3xl',
                borderClass: 'dark:border-danger/20 border-danger/80'
            }
        },
        defaultType: 'info'
    }

    /**
     * Set global configuration for all alerts
     * @param {Object} newConfig - Configuration object to merge with defaults
     */
    static setConfig(newConfig) {
        this.config = {
            ...this.config,
            ...newConfig,
            styles: {
                ...this.config.styles,
                ...(newConfig.styles || {})
            }
        };
    }

    /**
     * Get styling classes based on alert type
     * @param {String} type - Alert type
     * @param {Object} customStyles - Optional custom styles for this specific alert
     * @returns {Object} Object containing styling classes
     */
    static _getStyleClasses(type, customStyles = {}) {
        // Get default styles for this type or fallback to info
        const typeStyles = this.config.styles[type] || this.config.styles[this.config.defaultType];

        // Merge with any custom styles provided
        return {
            ...typeStyles,
            ...customStyles
        };
    }
    /**
     * _showModal - Internal helper to build and show a KTUI modal.
     *
     * @param {Object} opts
     * @param {String} opts.title        — modal title
     * @param {String} opts.message      — HTML or text message
     * @param {Array}  opts.buttons      — array of { text, className, value, dismiss }
     * @returns {Promise} resolves to the button.value clicked
     */
    static _showModal({ title, message, buttons, type, styles = {} }) {
        return new Promise((resolve) => {
            // generate unique ID
            const id = `kt_alert_${Date.now()}`;
            // build button HTML
            const buttonsHtml = buttons.map((btn, i) => `
        <button
          type="button"
          class="${btn.className}"
          data-kt-modal-dismiss="${btn.dismiss ? `#${id}` : ''}"
          data-alert-value="${btn.value}"
          id="${id}_btn_${i}"
        >${btn.text}</button>
      `).join('');

            // Get style classes based on type and any custom styles passed in the options
            const { backgroundClass, foregroundClass, iconClass, borderClass } = this._getStyleClasses(type, styles);

            // full modal HTML
            const html = `
            <div class="kt-modal fade" id="${id}" data-kt-modal="true" data-kt-modal-backdrop-static="true" aria-hidden="true">
                <div class="kt-modal-content max-w-[400px] top-[10%] ${borderClass}">
                    <div class="kt-modal-header rounded-t-lg grid grid-cols-1 gap-2 p-2 border-b-0">
                        <div class="flex justify-center items-center gap-2 p-2">
                            <i class="${iconClass}"></i>
                        </div>
                        <h3 class="kt-modal-title text-center text-lg ${foregroundClass}">${title}</h3>
                    </div>
                    <div class="kt-modal-body text-center p-2 text-base">
                        ${message}
                    </div>
                    <div class="p-2 pb-4 border-t-0 gap-2 flex justify-center items-center">
                        ${buttonsHtml}
                    </div>
                </div>
            </div>
        `;

            // insert into DOM
            document.body.insertAdjacentHTML('beforeend', html);
            const modalEl = document.getElementById(id);
            const modal = new KTModal(modalEl);

            // attach button handlers
            buttons.forEach((btn, i) => {
                const btnEl = document.getElementById(`${id}_btn_${i}`);
                btnEl.addEventListener('click', () => {
                    resolve(btn.value);
                });
            });

            // when hidden, clean up DOM
            modal.on('kt.modal.hidden', () => {
                modal.dispose();
                modalEl.remove();
            });

            // show it
            modal.show();
        });
    }

    /**
     * Simple alert with single OK button.
     * @param {String} title
     * @param {String} message
     * @returns {Promise<void>}
     */
    static show(title, message, type = 'success', styles = null) {
        return this._showModal({
            title,
            message,
            buttons: [
                { text: 'Okay', className: 'kt-btn kt-btn-primary', value: true, dismiss: true }
            ],
            type,
            styles
        }).then(() => { });
    }

    /**
     * Flexible alert with custom configuration.
     * @param {Object} config 
     * @param {String} config.title - Alert title
     * @param {String} config.message - Alert message
     * @param {Array} config.buttons - Custom buttons configuration
     * @param {String} config.type - Alert type (success, warning, etc.)
     * @returns {Promise<any>} resolves to the value of the clicked button
     */
    static fire(config) {
        // If config is a string, assume it's the title and shift arguments
        if (typeof config === 'string') {
            const title = config;
            const message = arguments[1];
            const type = arguments[2] || 'success';
            const styles = arguments[3] || null;

            return this._showModal({
                title,
                message,
                buttons: [
                    { text: 'Okay', className: 'kt-btn kt-btn-primary', value: true, dismiss: true }
                ],
                type,
                styles
            }).then(() => { });
        }

        // Handle object configuration
        const { title, message, buttons, type = 'info', styles = null } = config;
        return this._showModal({
            title,
            message,
            buttons: buttons || [
                { text: 'Okay', className: 'kt-btn kt-btn-primary', value: true, dismiss: true }
            ],
            type,
            styles
        });
    }

    /**
     * Confirmation dialog with OK/Cancel.
     * @param {String} title
     * @param {String} message
     * @returns {Promise<boolean>} resolves true if OK, false if Cancel or closed
     */
    static confirm(title, message, type = 'info') {
        return this._showModal({
            title,
            message,
            buttons: [
                { text: 'Cancel', className: 'kt-btn kt-btn-light kt-btn-outline', value: false, dismiss: true },
                { text: 'Okay', className: 'kt-btn kt-btn-primary', value: true, dismiss: true }
            ],
            type
        });
    }

    /**
     * Delete confirmation dialog with Cancel/Delete buttons.
     * @param {String} title
     * @param {String} message
     * @returns {Promise<boolean>} resolves true if Delete, false if Cancel or closed
     */
    static delete(title, message, type = 'destructive') {
        return this._showModal({
            title,
            message,
            buttons: [
                { text: 'Cancel', className: 'kt-btn kt-btn-light kt-btn-outline', value: false, dismiss: true },
                { text: 'Delete', className: 'kt-btn kt-btn-danger', value: true, dismiss: true }
            ],
            type,
        });
    }

    /**
     * Error alert with single Close button.
     * @param {String} title
     * @param {String} message
     * @returns {Promise<void>}
     */
    static error(title, message, type = 'destructive') {
        return this._showModal({
            title,
            message,
            buttons: [
                { text: 'Close', className: 'kt-btn kt-btn-danger', value: true, dismiss: true }
            ],
            type
        }).then(() => { });
    }
}

export default Alerts;
