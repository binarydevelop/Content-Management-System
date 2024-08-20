// app/routes/index.tsx

import React from "react";
import Gallery from "~/components/gallery";

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <Gallery />
    </div>
  );
}
