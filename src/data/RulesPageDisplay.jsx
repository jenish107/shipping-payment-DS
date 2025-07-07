export const rulesPageOptions = [
  {
    title: "Cart Details",
    options: [
      {
        label: "Always",
        value: 27,
        default: "",
        placeholder: "Always",
        value_type: "always",
        condition: [{ label: "Is greater than or equal to", value: 5 }],
        display: {
          basic: [
            "shipping-hide",
            "shipping-rename",
            "shipping-reorder",
            "payment-hide",
            "payment-rename",
            "payment-reorder",
            "shipping-discount_auto",
            "shipping-discount_code",
            "validation-check",
          ],
        },
      },
    ],
  },
];
