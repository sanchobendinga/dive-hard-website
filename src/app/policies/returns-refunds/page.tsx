import type { Metadata } from "next";
import { CONTACT, PolicyPage } from "@/components/PolicyPage";
export const metadata: Metadata = { title: "Returns & Refunds" };
export default function Page() {
  return (
    <PolicyPage title="Returns & Refunds">
      <p>We want you to love your Dive Hard gear. If something isn&apos;t right, you can return it within [RETURN WINDOW, e.g. 30] days of delivery.</p>
      <h2>Eligibility</h2>
      <ul>
        <li>Items must be unworn, unwashed and in original packaging with tags attached.</li>
        <li>Custom, personalised or print-on-demand items are [RETURNABLE / NOT RETURNABLE] unless they arrive damaged or defective.</li>
        <li>Final-sale items: [LIST OR &quot;NONE&quot;].</li>
      </ul>
      <h2>How to start a return</h2>
      <p>Email <a className="underline" href={`mailto:${CONTACT}`}>{CONTACT}</a> with your order number and reason. We&apos;ll reply with instructions and a return address [OR RETURN PORTAL LINK].</p>
      <h2>Return shipping</h2>
      <p>[CUSTOMER PAYS / DIVE HARD PAYS] return shipping. [RESTOCKING FEE: NONE / X%].</p>
      <h2>Refunds</h2>
      <p>Approved refunds go back to the original payment method within [N] business days of receiving the return. Original shipping is [REFUNDED / NOT REFUNDED].</p>
      <h2>Exchanges</h2>
      <p>[EXCHANGES OFFERED FOR SIZE/COLOR / NOT OFFERED, PLACE A NEW ORDER].</p>
      <h2>Damaged or defective items</h2>
      <p>Contact us within [N] days of delivery with photos and we&apos;ll replace or refund at no cost.</p>
    </PolicyPage>
  );
}
