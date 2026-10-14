import type { Metadata } from "next";
import { CONTACT, PolicyPage } from "@/components/PolicyPage";
export const metadata: Metadata = { title: "Privacy Policy" };
export default function Page() {
  return (
    <PolicyPage title="Privacy Policy">
      <p>[BUSINESS ENTITY NAME] (&quot;Dive Hard&quot;) explains here what we collect and why.</p>
      <h2>What we collect</h2>
      <ul>
        <li>Newsletter: your email address when you join the list.</li>
        <li>Orders: name, shipping address, email, phone [OPTIONAL] and order details. Payment details are handled by [PAYMENT PROVIDER], not stored by us.</li>
        <li>Analytics: [ANALYTICS TOOLS, e.g. Vercel Analytics / NONE].</li>
      </ul>
      <h2>How we use it</h2>
      <p>To fulfil orders, send updates you asked for, and improve the site. We share order data only with service providers that help run the store: [SHOPIFY, PRINTFUL, 3PL NAME, EMAIL PROVIDER].</p>
      <h2>Retention</h2>
      <p>We keep order records for [N] years and newsletter data until you unsubscribe.</p>
      <h2>Your rights</h2>
      <p>You can ask to access, correct or delete your data by emailing <a className="underline" href={`mailto:${CONTACT}`}>{CONTACT}</a>. [ADD GDPR/CCPA LANGUAGE IF SELLING TO EU/CALIFORNIA].</p>
      <h2>Cookies</h2>
      <p>[COOKIE USAGE AND CONSENT APPROACH].</p>
    </PolicyPage>
  );
}
