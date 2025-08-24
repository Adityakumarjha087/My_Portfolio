declare module '@barba/core' {
  interface BarbaTransition {
    name?: string;
    to?: {
      namespace: string | string[];
    };
    from?: {
      namespace: string | string[];
    };
    leave?: (data: { current: HTMLElement; next: HTMLElement }) => Promise<void>;
    enter?: (data: { current: HTMLElement; next: HTMLElement }) => void;
    once?: (data: { current: HTMLElement; next: HTMLElement }) => void;
  }

  interface BarbaOptions {
    transitions?: BarbaTransition[];
    preventRunning?: boolean;
    debug?: boolean;
  }

  interface BarbaInstance {
    init(options?: BarbaOptions): void;
    destroy(): void;
    // Add other Barba.js methods as needed
  }

  const barba: BarbaInstance;
  export default barba;
}
