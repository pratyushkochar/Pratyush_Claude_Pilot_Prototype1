import "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "affirm-embedded-checkout": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "affirm-checkout-confirmation-button": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
