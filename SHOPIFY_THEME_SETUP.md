# Tarushi Shopify theme

This repository contains the editable Tarushi Shopify theme at the repository root. The older static export remains in `ascella.qodeinteractive.com/` for reference and is not used by Shopify.

## Shopify setup

1. Connect the GitHub repository to Shopify under **Online Store → Themes → Add theme → Connect from GitHub**.
2. Select the `main` branch.
3. Open **Customize** to edit the logo, navigation, hero desktop/mobile images, hero text, buttons, featured collection, story content, colors, footer copy, and menus.
4. Add products and collections in Shopify Admin. Assign products to collections and choose the featured collection in the homepage section.
5. Create pages for About Us, Gift Card, and Contact Us and assign the included templates where desired.

The theme uses native Shopify Liquid product forms and cart forms, so product variants, quantities, cart updates, checkout, prices, collections, and product images come from Shopify rather than the old static HTML.

Shopify CLI validation can be run locally with:

```bash
shopify theme check
shopify theme dev --store YOUR-STORE.myshopify.com
```