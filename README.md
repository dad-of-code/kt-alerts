# Alerts Helper

This module provides a simple, consistent interface for displaying modal alerts and confirmations in the IHHUB application using KTUI (KeenThemes UI).

## Overview

The `Alerts` class offers a clean API for showing different types of modal dialogs:

- **Simple alerts** - Single button notifications
- **Confirmation dialogs** - Two-button prompts for user decisions
- **Error alerts** - Styled error notifications

All dialogs are built on top of KTUI's modal component and styled according to KTUI design principles.

## Usage

```javascript
import Alerts from 'core/system/helpers/alerts';

// Simple success alert
Alerts.fire('Success', 'Operation completed successfully', 'success');

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

## KTUI Integration

This module is built on top of [KTUI](https://github.com/keenthemes/ktui), a modern UI framework by KeenThemes. It leverages KTUI's modal component and styling classes to create consistent, responsive alert dialogs.

The alerts are styled using KTUI's utility classes for colors, spacing, and typography, ensuring they match the overall design system of the application.
