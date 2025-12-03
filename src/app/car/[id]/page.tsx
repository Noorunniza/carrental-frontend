import { Suspense } from "react";
import CarDetails from "./CarDetails";

export default function Page() {
  return (
    <Suspense fallback={<div style={{ padding: 40 }}>Loading car...</div>}>
      <CarDetails />
    </Suspense>
  );
}
