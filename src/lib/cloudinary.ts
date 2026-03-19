import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.CLOUDINARY_API_KEY,
  api_secret: import.meta.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export interface CloudinaryImage {
  public_id: string;
  secure_url: string;
  format: string;
  width: number;
  height: number;
}

export interface CloudinaryFolder {
  name: string;
  path: string;
}

export const getFolders = async (rootFolder?: string): Promise<CloudinaryFolder[]> => {
  if (!import.meta.env.CLOUDINARY_API_KEY) {
    console.warn("Cloudinary keys missing. Returning mock data.");
    return [
      { name: "Badminton", path: "badminton" },
      { name: "Tennis", path: "tennis" },
      { name: "Events", path: "events" }
    ];
  }

  try {
    if (rootFolder) {
      const result = await cloudinary.api.sub_folders(rootFolder);
      return result.folders;
    } else {
      const result = await cloudinary.api.root_folders();
      return result.folders;
    }
  } catch (error) {
    console.error("Error fetching folders:", error);
    return [];
  }
};

export const getImagesInFolder = async (folderName: string): Promise<CloudinaryImage[]> => {
  if (!import.meta.env.CLOUDINARY_API_KEY) {
    // Return mock images
    return Array(6).fill(null).map((_, i) => ({
      public_id: `mock-${i}`,
      secure_url: `https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=400&auto=format&fit=crop`,
      format: 'jpg',
      width: 400,
      height: 300
    }));
  }

  try {
    const result = await cloudinary.search
      .expression(`folder:${folderName}`)
      .sort_by('created_at', 'desc')
      .max_results(30)
      .execute();
      
    return result.resources;
  } catch (error) {
    console.error(`Error fetching images for folder ${folderName}:`, error);
    return [];
  }
};

export const getHeroImages = async (): Promise<CloudinaryImage[]> => {
  const rootFolder = import.meta.env.CLOUDINARY_ROOT_FOLDER;
  const heroFolder = rootFolder ? `${rootFolder}/hero` : 'hero';
  
  let images = await getImagesInFolder(heroFolder);

  if (images.length === 0) {
    // Fallback images if no Cloudinary images found
    images = [
      {
        public_id: 'hero-1',
        secure_url: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069&auto=format&fit=crop',
        format: 'jpg',
        width: 2069,
        height: 1379
      },
      {
        public_id: 'hero-2',
        secure_url: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=2070&auto=format&fit=crop',
        format: 'jpg',
        width: 2070,
        height: 1380
      },
      {
        public_id: 'hero-3',
        secure_url: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=2070&auto=format&fit=crop',
        format: 'jpg',
        width: 2070,
        height: 1380
      }
    ];
  }
  
  return images;
};


