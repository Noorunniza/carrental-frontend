import { Suspense } from "react";
import BookingPage from "./BookingPage";

export default function Page() {
  return (
    <Suspense fallback={<div style={{ padding: 40 }}>Loading booking...</div>}>
      <BookingPage />
    </Suspense>
  );
}
