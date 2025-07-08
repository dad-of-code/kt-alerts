/**
 * Basic usage example for @dad-of-code/kt-alerts
 */

// Import the Alerts module
import Alerts from '@dad-of-code/kt-alerts';

// Example 1: Set global configuration (optional)
Alerts.setConfig({
  styles: {
    // Override the success style
    success: {
      backgroundClass: 'bg-emerald-100',
      foregroundClass: 'text-emerald-800',
      iconClass: 'ki-filled ki-check-circle text-emerald-600 text-3xl',
      borderClass: 'border-emerald-200'
    },
    // Add a new custom type
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

// Example 2: Simple success alert using show method
document.getElementById('success-btn').addEventListener('click', () => {
  Alerts.show('Success', 'Operation completed successfully', 'success');
});

// Example 3: Confirmation dialog
document.getElementById('confirm-btn').addEventListener('click', () => {
  Alerts.confirm('Confirm Action', 'Are you sure you want to proceed?', 'warning')
    .then(result => {
      if (result) {
        console.log('User confirmed the action');
        // Perform the confirmed action
      } else {
        console.log('User cancelled the action');
        // Handle cancellation
      }
    });
});

// Example 4: Error alert
document.getElementById('error-btn').addEventListener('click', () => {
  Alerts.error('Error', 'Something went wrong', 'error');
});

// Example 5: Alert with custom styles for this specific alert only
document.getElementById('custom-style-btn').addEventListener('click', () => {
  Alerts.show('Custom Styled Alert', 'This alert has custom styling just for this instance', 'info', {
    backgroundClass: 'bg-amber-100',
    foregroundClass: 'text-amber-800',
    iconClass: 'ki-filled ki-notification text-amber-600 text-3xl',
    borderClass: 'border-amber-200'
  });
});

// Example 6: Using the flexible fire method with full configuration
document.getElementById('flexible-btn').addEventListener('click', () => {
  Alerts.fire({
    title: 'Custom Alert',
    message: 'This is a fully customized alert',
    type: 'custom', // Using the custom type we defined in setConfig
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
});

// Example 7: Delete confirmation
document.getElementById('delete-btn').addEventListener('click', () => {
  Alerts.delete('Delete Item', 'Are you sure you want to delete this item? This action cannot be undone.')
    .then(result => {
      if (result) {
        console.log('User confirmed deletion');
        ktAlert.fire('Item Deleted', 'The item was successfully deleted', 'success');
      }
    });
});
