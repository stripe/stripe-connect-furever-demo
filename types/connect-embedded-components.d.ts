export type CustomElement<T> = Partial<
  T & DOMAttributes<T> & {children?: React.ReactNode | undefined}
>;
declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['stripe-connect-debug-utils']: CustomElement<{}>;
    }
  }
}
