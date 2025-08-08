import Swal from 'sweetalert2';

export const warningAlert = (alert: string) => {
    return Swal.fire({
      icon: 'warning',
      title: 'Attenzione!',
      html: alert,
      confirmButtonText: 'OK',
      didOpen: () => {
        const btn = document.querySelector('.swal2-confirm') as HTMLElement;
        if (btn) {
          btn.style.backgroundColor = '#f89412ff';
          btn.style.color = 'white';
          btn.style.fontSize = '15px';
          btn.style.padding = '8px 16px';
          btn.style.borderRadius = '4px';
        }
        const icon = document.querySelector('.swal2-icon') as HTMLElement;
        if (icon) {
          icon.style.transform = 'scale(0.7)';
          icon.style.width = '90px';
          icon.style.height = '90px';
          icon.style.marginBottom = "0";
        }
      }
    });
  };