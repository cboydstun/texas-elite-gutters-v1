import { Metadata } from "next";
import ContactsPage from "./ContactsPage";

export const metadata: Metadata = {
  title: "Manage Contacts | Admin Dashboard",
  description: "Manage contact form submissions",
};

export default function Contacts() {
  return <ContactsPage />;
}
