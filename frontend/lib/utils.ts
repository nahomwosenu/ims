import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const uploadURL = "http://localhost/upload/upload.php";

/***
 * Uploads an image to ImageKit and returns the URL of the uploaded image.
 * @param file - The image file to be uploaded.
 * @returns A promise that resolves to the URL of the uploaded image.
 */
export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch(uploadURL, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Image upload failed");
  }
  const data = await response.json();
  return data.url;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
