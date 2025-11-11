// 


import multer from "multer";

const storage = multer.memoryStorage(); // ✅ use memory, not disk

const upload = multer({ storage });

export default upload;
