import type { Metadata } from "next";
import { CONTACT, PolicyPage } from "@/components/PolicyPage";
export const metadata: Metadata = { title: "Shipping" };
export default function Page() {
  return (
    <PolicyPage title="Shipping">
      <h2>Where we ship</h2>
      <p>We currently ship to [REGIONS, e.g. United States]. [INTERNATIONAL: NOT AVAILABLE / LIST COUNTRIES].</p>
      <h2>Processing time</h2>
      <p>In-stock items ship within [N] business days. Print-on-demand items are made to order and ship within [N] business days.</p>
      <h2>Rates and delivery times</h2>
      <ul>
        <li>Standard: [RATE], [N–N] business days.</li>
        <li>Expedited: [RATE / NOT OFFERED].</li>
        <li>Free shipping on orders over [AMOUNT / NOT OFFERED].</li>
      </ul>
      <h2>Split shipments</h2>
      <p>Orders with both stocked and made-to-order items may arrive in separate packages from different fulfilment partners [PRINTFUL / 3PL NAME].</p>
      <h2>Duties and taxes</h2>
      <p>[DUTIES/TAXES FOR INTERNATIONAL ORDERS: PAID BY CUSTOMER / INCLUDED].</p>
      <h2>Lost or delayed packages</h2>
      <p>Email <a className="underline" href={`mailto:${CONTACT}`}>{CONTACT}</a> with your order number and we&apos;ll help track it down.</p>
    </PolicyPage>
  );
}
