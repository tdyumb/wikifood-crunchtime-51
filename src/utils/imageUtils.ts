/**
 * Utility functions for handling image uploads and management
 */

// Create the wikifoods_uploads directory if it doesn't exist
const createUploadDirectory = async (): Promise<void> => {
  try {
    // In a browser environment, we can't directly create folders
    // This would be handled by the backend service
    console.log("Ensuring wikifoods_uploads directory exists");
    
    // In a real implementation, this would make an API call to the server
    // to create the directory if it doesn't exist
  } catch (error) {
    console.error("Failed to create upload directory:", error);
  }
};

// Get the correct path for image uploads
export const getUploadPath = (): string => {
  return "/wikifoods_uploads/";
};

// Format image URL to use the wikifoods_uploads folder
export const formatImageUrl = (imageUrl: string | undefined): string => {
  if (!imageUrl) return "/placeholder.svg";
  
  // If the image URL already contains wikifoods_uploads, return it as is
  if (imageUrl.includes("wikifoods_uploads")) return imageUrl;
  
  // If the image is from lovable-uploads, replace the path
  if (imageUrl.includes("lovable-uploads")) {
    const filename = imageUrl.split("/").pop();
    return `/wikifoods_uploads/${filename}`;
  }
  
  // For other images (e.g., from public/), keep them as is
  return imageUrl;
};

// Initialize the directory when the app loads
export const initializeImageSystem = async (): Promise<void> => {
  await createUploadDirectory();
};

// Export a function to prepare an image for upload
export const prepareImageUpload = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // In a real implementation, this would upload the file to the server
        // and return the URL from the server
        const fileName = `${Date.now()}-${file.name}`;
        const uploadPath = `${getUploadPath()}${fileName}`;
        
        // For now, simulate the upload by returning the path
        // In production, this would be an actual upload to the server
        resolve(uploadPath);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
};

export default {
  initializeImageSystem,
  prepareImageUpload,
  formatImageUrl,
  getUploadPath
};
