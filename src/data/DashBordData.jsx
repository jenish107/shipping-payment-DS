export const dashBordData = [
  {
    title: "Hide Payment Methods",
    paragraph:
      "Conditionally show or hide payment methods based on customer, cart, or other rules.",
    display: ["payment-method-hide-show", "payment-method-adder"],
  },
  {
    title: "Reorder Payment Methods",
    paragraph:
      "Adjust the order of payment options for a more streamlined checkout flow.",
    display: ["payment-method-move", "payment-method-adder"],
  },
  {
    title: "Rename Payment Methods",
    paragraph:
      "Modify the names of payment options to make them more intuitive or brand-aligned.",
    display: ["payment-method-rename", "payment-method-adder"],
  },
  {
    title: "Hide Shipping Methods",
    paragraph:
      "Dynamically show or hide shipping methods depending on user or cart behavior.",
    display: [
      "shipping-method-hide-show",
      "shipping-method-adder",
      "rule-type-select",
    ],
  },
  {
    title: "Reorder Shipping Methods",
    paragraph:
      "Change the display order of shipping methods based on defined conditions.",
    display: ["shipping-method-adder", "shipping-method-move"],
  },
  {
    title: "Rename Shipping Methods",
    paragraph:
      "Customize the names of shipping methods to improve clarity and user experience.",
    display: ["shipping-method-adder", "shipping-method-rename"],
  },
  {
    title: "Custom Shipping Discounts",
    paragraph:
      "Automatically apply tailored shipping discounts based on rules.",
    display: ["shipping-method-adder", "discount-adder", "discount-combiner"],
  },
  {
    title: "Discount Code for Shipping",
    paragraph: "Apply shipping discounts using a promo or discount code.",
    display: [
      "shipping-method-adder",
      "discount-adder",
      "discount-combiner",
      "discount-code",
    ],
  },
  {
    title: "Checkout Verify Rules",
    paragraph:
      "Apply custom validations at checkout based on cart value, quantity, and more.",
    display: ["message-position-display"],
  },
];
