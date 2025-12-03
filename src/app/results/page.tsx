import { Suspense } from "react";
import ResultsPage from "./ResultsPageContent";

export default function Page() {
  return (
    <Suspense fallback={<div style={{ padding: 40 }}>Loading results...</div>}>
      <ResultsPage />
    </Suspense>
  );
}
