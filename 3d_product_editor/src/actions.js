// "use server";

// import { Rembg } from "@xixiyahaha/rembg-node";
// import sharp from "sharp";
// import path from "path";
// import { Blob } from "buffer"; // needed if not using Node 20+ with global Blob

// const removeBg = async (data) => {
//   // If data is a base64 Data URL string, strip the prefix and decode
//   let buffer;
//   if (typeof data === "string" && data.startsWith("data:")) {
//     const base64 = data.split(",")[1]; // remove "data:image/jpeg;base64,"
//     buffer = Buffer.from(base64, "base64");
//   } else if (data instanceof Blob) {
//     const arrayBuffer = await data.arrayBuffer();
//     buffer = Buffer.from(arrayBuffer);
//   } else if (Buffer.isBuffer(data)) {
//     buffer = data;
//   } else {
//     throw new Error("Unsupported input type");
//   }

//   // Point to local model folder so it doesn't try Google Drive
//   process.env.U2NET_HOME = path.join(process.cwd(), "public");

//   //  preprocess
//   const preprocessed = await sharp(buffer)
//     .resize(1024, 1024, { fit: "inside" })
//     .toBuffer();

//   // Pass buffer to sharp
//   const input = sharp(preprocessed);

//   const rembg = new Rembg({ logging: true });

//   // Remove background
//   const output = await rembg.remove(input);

//   // Convert processed image to webp buffer
//   const outputBuffer = await output.webp().toBuffer();

//   // Return as Blob (can also return buffer if needed)
//   return new Blob([outputBuffer], { type: "image/webp" });
// };

// export { removeBg };

// import { pipeline } from "@xenova/transformers";
// import sharp from "sharp";

// let segmenter; // cache model in memory

// export async function removeBg(base64Url) {
//   if (!base64Url || typeof base64Url !== "string") {
//     throw new Error("Invalid base64 image input");
//   }

//   // Strip the "data:image/...;base64," prefix if present
//   const base64Data = base64Url.split(",")[1] || base64Url;
//   const buffer = Buffer.from(base64Data, "base64");

//   // Load model once
//   if (!segmenter) {
//     segmenter = await pipeline("image-segmentation", "Xenova/u2net");
//   }

//   // Run segmentation
//   const result = await segmenter(buffer, { threshold: 0.9 });

//   if (!result.length || !result[0].mask) {
//     throw new Error("No mask returned from model");
//   }

//   const maskBuffer = Buffer.from(result[0].mask);

//   // Convert mask to grayscale PNG
//   const maskPng = await sharp(maskBuffer, {
//     raw: {
//       width: result[0].width,
//       height: result[0].height,
//       channels: 1,
//     },
//   })
//     .png()
//     .toBuffer();

//   // Apply mask as alpha channel
//   const outputBuffer = await sharp(buffer)
//     .resize(result[0].width, result[0].height)
//     .joinChannel(maskPng)
//     .png()
//     .toBuffer();

//   // Return as base64 PNG
//   return `data:image/png;base64,${outputBuffer.toString("base64")}`;
// }

"use server";

import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function removeBg(base64) {
  // Step 1: Upload base64 image to Cloudinary
  const uploadResult = await cloudinary.v2.uploader.upload(base64, {
    folder: "bg-removal",
  });

  // Step 2: Return transformed URL with background removed
  const bgRemovedUrl = cloudinary.v2.url(uploadResult.public_id, {
    transformation: [{ effect: "background_removal" }, { format: "png" }],
  });

  console.log(bgRemovedUrl);

  // Step 3: Fetch image and convert to Blob
  const res = await fetch(bgRemovedUrl);
  if (!res.ok) throw new Error("Failed to fetch background-removed image");

  const arrayBuffer = await res.arrayBuffer();
  const blob = new Blob([arrayBuffer], { type: "image/png" });

  return blob;
}
