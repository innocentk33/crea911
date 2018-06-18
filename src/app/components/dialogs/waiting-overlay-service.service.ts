import { Injectable } from '@angular/core';
import { WaitingOverlayComponentComponent } from './waiting-overlay-component/waiting-overlay-component.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { WaitOverlayRef } from './wait-overlay-ref';

 interface WaitingDialogConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
}

const DEFAULT_CONFIG: WaitingDialogConfig = {
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  panelClass: 'tm-file-preview-dialog-panel'
}

@Injectable()
export class WaitingOverlayServiceService {

  // Inject overlay service
  constructor(private overlay: Overlay) { }

  private getOverlayConfig(config: WaitingDialogConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }

  private createOverlay(config: WaitingDialogConfig) {
    // Returns an OverlayConfig
    const overlayConfig = this.getOverlayConfig(config);

    // Returns an OverlayRef
    return this.overlay.create(overlayConfig);
  }
  open(config: WaitingDialogConfig = {}) {

    // Override default configuration
    const dialogConfig = { ...DEFAULT_CONFIG, ...config };

    const overlayRef = this.createOverlay(dialogConfig);


    // Create ComponentPortal that can be attached to a PortalHost
    const waitingPortal = new ComponentPortal(WaitingOverlayComponentComponent);

    // Attach ComponentPortal to PortalHost
    overlayRef.attach(waitingPortal);

    const dialogRef = new WaitOverlayRef(overlayRef);


    return dialogRef;
  }

}
