# @dad-of-code/kt-helpers

A collection of helper utilities for KTUI including alerts and form helpers.

## Installation

```bash
npm install @dad-of-code/kt-helpers
```

## Overview

The `Alerts` class offers a clean API for showing different types of modal dialogs:

- **Simple alerts** - Single button notifications
- **Confirmation dialogs** - Two-button prompts for user decisions
- **Error alerts** - Styled error notifications

All dialogs are built on top of KTUI's modal component and styled according to KTUI design principles.

## Usage

### Basic Usage

```javascript
import Alerts from '@dad-of-code/kt-helpers';

// Simple success alert
Alerts.show('Success', 'Operation completed successfully', 'success');

// Confirmation dialog
Alerts.confirm('Confirm Action', 'Are you sure you want to proceed?', 'warning')
  .then(result => {
    if (result) {
      // User clicked "Okay"
    } else {
      // User clicked "Cancel" or closed the dialog
    }
  });

// Error alert
Alerts.error('Error', 'Something went wrong', 'error');

// Delete confirmation
Alerts.delete('Delete Item', 'Are you sure you want to delete this item?')
  .then(result => {
    if (result) {
      // User clicked "Delete"
    }
  });
```

### Global Configuration

You can set global configuration options that will apply to all alerts:

```javascript
Alerts.setConfig({
  styles: {
    // Override existing styles
    success: {
      backgroundClass: 'bg-emerald-100',
      foregroundClass: 'text-emerald-800',
      iconClass: 'ki-filled ki-check-circle text-emerald-600 text-3xl',
      borderClass: 'border-emerald-200'
    },
    // Add custom types
    custom: {
      backgroundClass: 'bg-purple-100',
      foregroundClass: 'text-purple-800',
      iconClass: 'ki-filled ki-star text-purple-600 text-3xl',
      borderClass: 'border-purple-200'
    }
  },
  // Change the default type
  defaultType: 'info'
});
```

### Advanced Usage with fire()

For maximum flexibility, use the `fire()` method with a configuration object:

```javascript
Alerts.fire({
  title: 'Custom Alert',
  message: 'This is a fully customized alert',
  type: 'custom', // Can be any type defined in your config
  buttons: [
    { text: 'Cancel', className: 'kt-btn kt-btn-light', value: false, dismiss: true },
    { text: 'Continue', className: 'kt-btn kt-btn-primary', value: true, dismiss: true },
    { text: 'Help', className: 'kt-btn kt-btn-info', value: 'help', dismiss: false }
  ],
  customStyles: {
    // Override just the icon for this specific alert
    iconClass: 'ki-filled ki-rocket text-purple-600 text-3xl'
  }
}).then(result => {
  console.log('User selected:', result);
});
```

## Alert Types

The following alert types are supported:

- `success` - Green styling with check icon
- `warning` - Yellow styling with information icon
- `secondary` - Secondary color styling with information icon
- `info` - Blue styling with information icon
- `error` - Red styling with cross icon
- `destructive` - Red styling with trash icon

## Methods

### `fire(title, message, type = 'success')`

Shows a simple alert with a single "Okay" button.

### `confirm(title, message, type = 'info')`

Shows a confirmation dialog with "Cancel" and "Okay" buttons. Returns a Promise that resolves to `true` if "Okay" is clicked, or `false` if "Cancel" is clicked or the dialog is closed.

### `error(title, message, type = 'destructive')`

Shows an error alert with a single "Close" button.


## KTUI & KeenThemes Integration

This module is built on top of [KTUI](https://github.com/keenthemes/ktui), a modern UI framework by KeenThemes. It leverages KTUI's modal component and styling classes to create consistent, responsive alert dialogs.

The alerts are styled using KTUI's utility classes for colors, spacing, and typography, ensuring they match the overall design system of the application.

Icons are provided by [KeenIcons](https://keenthemes.com/keenicons) and are used to enhance the visual appeal of the alerts.

The module is peer-dependant on KTUI and intended to be used with Metronic 9 [Metronic](https://keenthemes.com/metronic/).
