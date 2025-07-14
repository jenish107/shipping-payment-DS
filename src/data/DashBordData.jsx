export const options = {
  cart_details_always: {
    title: "Cart Details",
    options: [{ value: "Always", label: "Always" }],
  },
  cart_details: {
    title: "Cart Details",
    options: [
      { value: "Total Amount", label: "Total Amount" },
      { value: "Subtotal Amount", label: "Subtotal Amount" },
      { value: "Total Weight", label: "Total Weight" },
      { value: "Total Quantity", label: "Total Quantity" },
    ],
  },
  address: {
    title: "Address",
    options: [
      { value: "Country", label: "Country" },
      { value: "Province / State Code", label: "Province / State Code" },
      { value: "Zip / Postal Code", label: "Zip / Postal Code" },
      { value: "City / Area", label: "City / Area" },
      { value: "Address line", label: "Address line" },
    ],
  },
  cart_item: {
    title: "Cart Item",
    options: [
      { value: "SKU", label: "SKU" },
      { value: "Specific Collection", label: "Specific Collection" },
      { value: "Specific Product", label: "Specific Product" },
    ],
  },
  customer: {
    title: "Customer",
    options: [{ value: "Customer Tag", label: "Customer Tag" }],
  },
  delivery: {
    title: "Delivery",
    options: [
      {
        value: "Selected Shipping Rate",
        label: "Selected Shipping Rate",
      },
      { value: "Delivery Method", label: "Delivery Method" },
    ],
  },
};

export const AdvanceOptions = [
  options.cart_details_always,
  {
    title: "Cart Details",
    options: [
      { value: "Total Amount", label: "Total Amount" },
      { value: "Cart Attribute", label: "Cart Attribute" },
    ],
  },
  {
    ...options.address,
    options: options.address.options.slice(0, 1),
  },
];

export const dashBordData = [
  {
    title: "Hide Payment Methods",
    paragraph:
      "Conditionally show or hide payment methods based on customer, cart, or other rules.",
    display: ["payment-method-hide-show", "payment-method-adder"],
    Type: {
      Options: [
        options.cart_details_always,
        options.cart_details,
        options.address,
        options.cart_item,
        options.customer,
        options.delivery,
      ],
    },
  },
  {
    title: "Reorder Payment Methods",
    paragraph:
      "Adjust the order of payment options for a more streamlined checkout flow.",
    display: ["payment-method-move", "payment-method-adder"],
    Type: {
      Options: [
        options.cart_details_always,
        options.cart_details,
        options.address,
        options.cart_item,
        options.customer,
        {
          ...options.delivery,
          options: options.delivery.options.slice(0, 1),
        },
      ],
    },
  },
  {
    title: "Rename Payment Methods",
    paragraph:
      "Modify the names of payment options to make them more intuitive or brand-aligned.",
    display: ["payment-method-rename", "payment-method-adder"],
    Type: {
      Options: [
        options.cart_details_always,
        options.cart_details,
        options.address,
        options.cart_item,
        options.customer,
        {
          ...options.delivery,
          options: options.delivery.options.slice(0, 1),
        },
      ],
    },
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
    Type: {
      Options: [
        options.cart_details_always,
        options.cart_details,
        options.address,
        options.cart_item,
        options.customer,
      ],
    },
  },
  {
    title: "Reorder Shipping Methods",
    paragraph:
      "Change the display order of shipping methods based on defined conditions.",
    display: ["shipping-method-adder", "shipping-method-move"],
    Type: {
      Options: [
        options.cart_details_always,
        options.cart_details,
        options.address,
        options.cart_item,
        options.customer,
      ],
    },
  },
  {
    title: "Rename Shipping Methods",
    paragraph:
      "Customize the names of shipping methods to improve clarity and user experience.",
    display: ["shipping-method-adder", "shipping-method-rename"],
    Type: {
      Options: [
        options.cart_details_always,
        options.cart_details,
        options.address,
        options.cart_item,
        options.customer,
      ],
    },
  },
  {
    title: "Custom Shipping Discounts",
    paragraph:
      "Automatically apply tailored shipping discounts based on rules.",
    display: ["shipping-method-adder", "discount-adder", "discount-combiner"],
    Type: {
      Options: [
        options.cart_details_always,
        options.cart_details,
        options.address,
        options.cart_item,
        options.customer,
      ],
    },
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
    Type: {
      Options: [
        options.cart_details_always,
        options.cart_details,
        options.address,
        options.cart_item,
        options.customer,
      ],
    },
  },
  {
    title: "Checkout Verify Rules",
    paragraph:
      "Apply custom validations at checkout based on cart value, quantity, and more.",
    display: ["message-position-display"],
    Type: {
      Options: [
        options.cart_details_always,
        options.cart_details,
        options.address,
        options.cart_item,
        options.customer,
      ],
    },
  },
];
