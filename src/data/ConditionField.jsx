import { Link, Text } from "@shopify/polaris";
import { conuntry } from "./Country";

export const conditionFields = [
  {
    type: "Total Amount",
    field_type: "number",
    placeholder: 0,
    options: [
      {
        value: "Is greater than or equal to",
        label: "Is greater than or equal to",
      },
      {
        value: "Is less than or equal to",
        label: "Is less than or equal to",
      },
      { value: "Is between", label: "Is between" },
    ],
  },

  {
    type: "Subtotal Amount",
    field_type: "number",
    placeholder: 0,
    options: [
      {
        value: "Is greater than or equal to",
        label: "Is greater than or equal to",
      },
      {
        value: "Is less than or equal to",
        label: "Is less than or equal to",
      },
      { value: "Is between", label: "Is between" },
    ],
  },

  {
    type: "Total Weight",
    field_type: "number",
    placeholder: 0,
    options: [
      {
        value: "Is greater than or equal to",
        label: "Is greater than or equal to",
      },
      {
        value: "Is less than or equal to",
        label: "Is less than or equal to",
      },
      { value: "Is between", label: "Is between" },
    ],
  },

  {
    type: "Total Quantity",
    field_type: "number",
    placeholder: 0,
    options: [
      {
        value: "Is greater than or equal to",
        label: "Is greater than or equal to",
      },
      {
        value: "Is less than or equal to",
        label: "Is less than or equal to",
      },
      { value: "Is between", label: "Is between" },
    ],
  },

  {
    type: "Country",
    field_type: "combo_box",
    combo_box_option: conuntry.map((currData) => {
      return { value: currData.name, label: currData.name };
    }),
    placeholder: "Select country",
    options: [
      {
        value: "Contains (partial match)",
        label: "Contains (partial match)",
      },
      {
        value: "Does not contains (partial match)",
        label: "Does not contains (partial match)",
      },
      { value: "Contains (exact match)", label: "Contains (exact match)" },
      {
        value: "Does not contains (exact match)",
        label: "Does not contains (exact match)",
      },
    ],
  },

  {
    type: "Province / State Code",
    placeholder: "Enter province/state code",
    field_type: "combo_box",
    helpText: (
      <Text>
        The two-letter code for the region. For example, ON. see{" "}
        <Link>ISO 3166-2</Link>
      </Text>
    ),
    options: [
      {
        value: "Contains (partial match)",
        label: "Contains (partial match)",
      },
      {
        value: "Does not contains (partial match)",
        label: "Does not contains (partial match)",
      },
      { value: "Contains (exact match)", label: "Contains (exact match)" },
      {
        value: "Does not contains (exact match)",
        label: "Does not contains (exact match)",
      },
    ],
  },
  {
    type: "Zip / Postal Code",
    field_type: "combo_box",
    placeholder: "Enter zip/postal code",
    options: [
      {
        value: "Contains (partial match)",
        label: "Contains (partial match)",
      },
      {
        value: "Does not contains (partial match)",
        label: "Does not contains (partial match)",
      },
      { value: "Contains (exact match)", label: "Contains (exact match)" },
      {
        value: "Does not contains (exact match)",
        label: "Does not contains (exact match)",
      },
    ],
  },
  {
    type: "City / Area",
    field_type: "combo_box",
    placeholder: "Enter city or area",

    options: [
      {
        value: "Contains (partial match)",
        label: "Contains (partial match)",
      },
      {
        value: "Does not contains (partial match)",
        label: "Does not contains (partial match)",
      },
      { value: "Contains (exact match)", label: "Contains (exact match)" },
      {
        value: "Does not contains (exact match)",
        label: "Does not contains (exact match)",
      },
    ],
  },
  {
    type: "Address line",
    field_type: "combo_box",
    placeholder: "Enter full address",
    options: [
      {
        value: "Contains (partial match)",
        label: "Contains (partial match)",
      },
      {
        value: "Does not contains (partial match)",
        label: "Does not contains (partial match)",
      },
      { value: "Contains (exact match)", label: "Contains (exact match)" },
      {
        value: "Does not contains (exact match)",
        label: "Does not contains (exact match)",
      },
    ],
  },
  {
    type: "SKU",
    field_type: "combo_box",
    placeholder: "Enter SKU",
    options: [
      {
        value: "Contains (partial match)",
        label: "Contains (partial match)",
      },
      {
        value: "Does not contains (partial match)",
        label: "Does not contains (partial match)",
      },
      { value: "Contains (exact match)", label: "Contains (exact match)" },
      {
        value: "Does not contains (exact match)",
        label: "Does not contains (exact match)",
      },
    ],
  },
  {
    type: "Specific Collection",
    placeholder: "Select collection",
    options: [
      {
        value: "Contains (partial match)",
        label: "Contains (partial match)",
      },
      {
        value: "Does not contains (partial match)",
        label: "Does not contains (partial match)",
      },
      { value: "Contains (exact match)", label: "Contains (exact match)" },
      {
        value: "Does not contains (exact match)",
        label: "Does not contains (exact match)",
      },
    ],
  },
  {
    type: "Specific Product",
    placeholder: "Select a product",
    options: [
      {
        value: "Contains (partial match)",
        label: "Contains (partial match)",
      },
      {
        value: "Does not contains (partial match)",
        label: "Does not contains (partial match)",
      },
      { value: "Contains (exact match)", label: "Contains (exact match)" },
      {
        value: "Does not contains (exact match)",
        label: "Does not contains (exact match)",
      },
    ],
  },
  {
    type: "Customer Tag",
    field_type: "combo_box",
    placeholder: "Enter customer tag",
    options: [
      {
        value: "Contains (partial match)",
        label: "Contains (partial match)",
      },
      {
        value: "Does not contains (partial match)",
        label: "Does not contains (partial match)",
      },
      { value: "Contains (exact match)", label: "Contains (exact match)" },
      {
        value: "Does not contains (exact match)",
        label: "Does not contains (exact match)",
      },
    ],
  },
  {
    type: "Selected Shipping Rate",
    field_type: "combo_box",
    placeholder: "Enter Shipping title",
    options: [
      {
        value: "Contains (partial match)",
        label: "Contains (partial match)",
      },
      {
        value: "Does not contains (partial match)",
        label: "Does not contains (partial match)",
      },
      { value: "Contains (exact match)", label: "Contains (exact match)" },
      {
        value: "Does not contains (exact match)",
        label: "Does not contains (exact match)",
      },
    ],
  },
  {
    type: "Delivery Method",
    field_type: "choice-list",
    field_option: [
      { label: "Local Delivery", value: "Local Delivery" },
      { label: "None", value: "None" },
      { label: "Shipping", value: "Shipping" },
      { label: "Local Pickup", value: "Local Pickup" },
      {
        label: "Shipping to a Pickup Point",
        value: "Shipping to a Pickup Point",
      },
      { label: "Retail", value: "Retail" },
    ],
    placeholder: "Enter delivery method",
    options: [
      {
        value: "Contains (partial match)",
        label: "Contains (partial match)",
      },
      {
        value: "Does not contains (partial match)",
        label: "Does not contains (partial match)",
      },
      { value: "Contains (exact match)", label: "Contains (exact match)" },
      {
        value: "Does not contains (exact match)",
        label: "Does not contains (exact match)",
      },
    ],
  },
];
