
export interface ImageUploadResponse {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * Mock upload function
 */
const mockUpload = async (file: File): Promise<ImageUploadResponse> => {
  // Return a fake URL based on file name or random
  const fakeUrl = URL.createObjectURL(file);
  return {
    success: true,
    url: fakeUrl
  };
};

export async function uploadChefImage(file: File, type: 'profile' | 'cover', chefId?: string) {
  return mockUpload(file);
}

export async function uploadProductImage(file: File) {
  return mockUpload(file);
}

export async function uploadBoxImage(file: File) {
  return mockUpload(file);
}

export async function uploadOfferImage(file: File) {
  return mockUpload(file);
}

export async function uploadBestsellerImage(file: File) {
  return mockUpload(file);
}

export async function deleteImage(publicUrl: string): Promise<boolean> {
  return true;
}

export const imageUploadService = {
  uploadChefImage,
  uploadProductImage,
  uploadBoxImage,
  uploadOfferImage,
  uploadBestsellerImage,
  deleteImage,
};

export default imageUploadService;
