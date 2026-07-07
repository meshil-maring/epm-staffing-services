import { useEffect, useCallback, useState } from "react";
import { getPdfConfig, generatePdf } from "../utils/pdfUtils";

export function usePrint() {
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = useCallback(async () => {
    if (isPrinting) return;
    const element = document.getElementById("ea-document");
    if (!element) return;

    setIsPrinting(true);
    try {
      const config = getPdfConfig(String(Date.now()));
      await generatePdf(element, config);
    } catch (err) {
      console.error("PDF generation failed:", err);
      window.print();
    } finally {
      setIsPrinting(false);
    }
  }, [isPrinting]);

  return { handlePrint, isPrinting };
}

export function useEscapeKey(onClose) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);
}

export function useBodyScrollLock() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
}
