const CLOUDINARY_CLOUD_NAME = "dcqpo6l8k";
const CLOUDINARY_UPLOAD_PRESET = "menu_image";

export const uploadImageToCloudinary = async (file) => {
  try {
    // Validate file
    if (!file) {
      throw new Error("No file provided");
    }

    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      throw new Error("Image size must be less than 10MB");
    }

    // Check file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      throw new Error("Only JPEG, PNG, and WebP images are allowed");
    }

    // Create form data
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    // Upload to Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();

    // Return the secure URL
    return {
      success: true,
      imageUrl: data.secure_url,
      publicId: data.public_id,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};
