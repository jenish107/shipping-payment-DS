export const conditionFieldsOptions = {
  Type: {
    Options: [
      {
        title: "Cart Details",
        options: [{ value: "Always", label: "Always" }],
      },
      {
        title: "Cart Details",
        options: [
          { value: "Total Amount", label: "Total Amount" },
          { value: "Subtotal Amount", label: "Subtotal Amount" },
          { value: "Total Weight", label: "Total Weight" },
          { value: "Total Quantity", label: "Total Quantity" },
        ],
      },
      {
        title: "Address",
        options: [
          { value: "Country", label: "Country" },
          { value: "Province / State Code", label: "Province / State Code" },
          { value: "Zip / Postal Code", label: "Zip / Postal Code" },
          { value: "City / Area", label: "City / Area" },
          { value: "Address line", label: "Address line" },
        ],
      },
      {
        title: "Cart Item",
        options: [
          { value: "SKU", label: "SKU" },
          { value: "Specific Collection", label: "Specific Collection" },
          { value: "Specific Product", label: "Specific Product" },
        ],
      },
      {
        title: "Customer",
        options: [{ value: "Customer Tag", label: "Customer Tag" }],
      },
      {
        title: "Delivery",
        options: [
          { value: "Selected Shipping Rate", label: "Selected Shipping Rate" },
          { value: "Delivery Method", label: "Delivery Method" },
        ],
      },
    ],
  },

  PaymentMethods: [
    {
      label: "Cash on Delivery (COD)",
      value: "Cash on Delivery (COD)",
    },
    {
      label: "Bank Deposit",
      value: "Bank Deposit",
    },
    {
      label: "Money Order",
      value: "Money Order",
    },
    {
      label: "Shopify Payments",
      value: "Shopify Payments",
    },
    {
      label: "Stripe",
      value: "Stripe",
    },
    {
      label: "Gift card",
      value: "Gift card",
    },
    {
      label: "Redeemable payment method",
      value: "Redeemable payment method",
    },
    {
      label: "PayPal",
      value: "PayPal",
    },
    {
      label: "PayPal Express Checkout",
      value: "PayPal Express Checkout",
    },
    {
      label: "Amazon Pay",
      value: "Amazon Pay",
    },
  ],

  error_message_position: [
    {
      title: "General",
      options: [
        {
          value: "Top of the checkout page",
          label: "Top of the checkout page",
        },
      ],
    },
    {
      title: "Input field",
      options: [
        { label: "Email", value: "Email" },
        { label: "Customer Phone", value: "Customer Phone" },
        { label: "City", value: "City" },
        { label: "Zip", value: "Zip" },
        { label: "Delivery phone", value: "Delivery phone" },
        { label: "Address line 1", value: "Address line 1" },
        { label: "Address line 2", value: "Address line 2" },
        { label: "Company name", value: "Company name" },
        { label: "First name", value: "First name" },
        { label: "Last name", value: "Last name" },
        { label: "Province Code", value: "Province Code" },
        { label: "Country", value: "Country" },
      ],
    },
  ],
};
