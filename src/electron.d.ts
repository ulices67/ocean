import type { OceanElectronApi } from "../electron/preload";

declare global {
  interface Window {
    oceanElectron?: OceanElectronApi;
  }
}

export {};
