import type { Metadata } from "next";
import { CONTACT, PolicyPage } from "@/components/PolicyPage";
export const metadata: Metadata = { title: "Terms of Service" };
export default function Page() {
  return (
    <PolicyPage title="Terms of Service">
      <p>These terms govern your use of this site and purchases from the Dive Hard store, operated by [BUSINESS ENTITY NAME], [ENTITY TYPE], registered in [JURISDICTION] (&quot;Dive Hard&quot;, &quot;we&quot;).</p>
      <h2>Orders and pricing</h2>
      <p>Prices are in [CURRENCY] and may change without notice. We may cancel or refuse any order, including for pricing errors, and will refund any payment taken.</p>
      <h2>Payments</h2>
      <p>Payments are processed by [SHOPIFY PAYMENTS / PROVIDER]. We do not store full card details.</p>
      <h2>Products</h2>
      <p>Colors may vary by screen. Third-party brand names (e.g. [BRANDS STOCKED]) are trademarks of their owners and used [UNDER AUTHORISED DEALER/CUSTOM PROGRAMME AGREEMENTS].</p>
      <h2>Intellectual property</h2>
      <p>The Dive Hard name, logo, photography and video are owned by [OWNER] and may not be used without permission.</p>
      <h2>Limitation of liability</h2>
      <p>[LIABILITY LANGUAGE, HAVE A LAWYER REVIEW].</p>
      <h2>Governing law</h2>
      <p>These terms are governed by the laws of [JURISDICTION].</p>
      <h2>Contact</h2>
      <p><a className="underline" href={`mailto:${CONTACT}`}>{CONTACT}</a> · [BUSINESS ADDRESS]</p>
    </PolicyPage>
  );
}
