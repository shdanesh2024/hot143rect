import { useImageStore } from "../store/store";

function ImageInput() {
  const setImageSrc = useImageStore((state) => state.setImageSrc);

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result); // Update imageSrc using Zustand action
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <label htmlFor="imageInput" className="px-4 py-2 font-bold text-white bg-blue-500 rounded cursor-pointer select-none">
        Select Image
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        id="imageInput"
        className="hidden"
      />
    </div>
  );
}

export default ImageInput;
