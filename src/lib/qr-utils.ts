import QRCode from "qrcode";

export function generateLessonQR(lessonId: string, version: number = 1): string {
  const payload = JSON.stringify({
    type: "lesson",
    lessonId,
    version,
  });
  return payload;
}

export async function generateQRDataURL(lessonId: string, version: number = 1): Promise<string> {
  const payload = generateLessonQR(lessonId, version);
  return QRCode.toDataURL(payload);
}

export function parseQRCode(qrData: string): { type: string; lessonId: string; version: number } | null {
  try {
    const parsed = JSON.parse(qrData);
    if (parsed.type === "lesson" && parsed.lessonId) {
      return { type: parsed.type, lessonId: parsed.lessonId, version: parsed.version || 1 };
    }
    return null;
  } catch {
    return null;
  }
}
