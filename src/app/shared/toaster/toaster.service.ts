import { Injectable } from '@angular/core';

// You would typically use a library like ngx-toastr
// This is a simplified implementation for demonstration
@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  
  // Show success message
  success(message: string): void {
    this.showToast(message, 'success');
  }
  
  // Show error message
  error(message: string): void {
    this.showToast(message, 'error');
  }
  
  // Show info message
  info(message: string): void {
    this.showToast(message, 'info');
  }
  
  // Create and show toast element
  private showToast(message: string, type: 'success' | 'error' | 'info'): void {
    // Create toast container if it doesn't exist
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'fixed top-4 right-4 z-50 flex flex-col gap-2';
      document.body.appendChild(container);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    
    // Set classes based on type
    const baseClasses = 'p-4 rounded shadow-lg max-w-xs animate-fade-in flex items-center';
    let typeClasses = '';
    
    switch (type) {
      case 'success':
        typeClasses = 'bg-green-500 text-white';
        break;
      case 'error':
        typeClasses = 'bg-red-500 text-white';
        break;
      case 'info':
        typeClasses = 'bg-blue-500 text-white';
        break;
    }
    
    toast.className = `${baseClasses} ${typeClasses}`;
    toast.textContent = message;
    
    // Add to container
    container.appendChild(toast);
    
    // Remove after delay
    setTimeout(() => {
      toast.classList.add('animate-fade-out');
      setTimeout(() => {
        if (container?.contains(toast)) {
          container.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }
}

// Add these animations to your global styles.scss or in a component where needed:
/*
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeOut {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-10px); }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

.animate-fade-out {
  animation: fadeOut 0.3s ease-out forwards;
}
*/
