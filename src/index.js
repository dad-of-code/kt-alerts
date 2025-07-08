/**
 * KT-Helpers - A collection of helper utilities for KTUI including alerts and form helpers
 * @module @dad-of-code/kt-helpers
 */

import Alerts from './modules/Alerts';
import './modules/InputLimits';

window.ktAlert = Alerts;

export * from './modules/Alerts.js';