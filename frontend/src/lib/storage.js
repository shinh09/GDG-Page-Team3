import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

function safeFileName(originalName = "image") {
  const ext = originalName.includes(".")
    ? originalName.split(".").pop()
    : "png";
  const rand = Math.random().toString(16).slice(2);
  return `${Date.now()}_${rand}.${ext}`;
}

export async function uploadNoticeImage(file) {
  if (!file) throw new Error("파일이 없습니다.");
  if (!file.type?.startsWith("image/")) {
    throw new Error("이미지 파일만 업로드 가능합니다.");
  }

  const filename = safeFileName(file.name);
  const path = `notices/images/${filename}`;
  const fileRef = ref(storage, path);

  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
}
export async function uploadNewsImage(file) {
    if (!file) return null;
    const path = `news/${Date.now()}_${file.name}`;
    const fileRef = ref(storage, path);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  }