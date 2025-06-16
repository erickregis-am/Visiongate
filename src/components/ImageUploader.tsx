import { CircleX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ImageUploaderProps {
  onImageSelect: (file: File | undefined, localImage: string, binaryData: Uint8Array | undefined) => void;
  label?: string;
  initialPreview?: string;
}

export default function ImageUploader({ onImageSelect, label, initialPreview }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | undefined>(initialPreview);

  useEffect(() => {
    setPreview(initialPreview);
  }, [initialPreview]);

  function toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }

  function toBinary(file: File): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(new Uint8Array(reader.result as ArrayBuffer));
      reader.onerror = (err) => reject(err);
      reader.readAsArrayBuffer(file);
    });
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      try {
        const LocalImage = await toBase64(file);
        const binaryData = await toBinary(file);
        setPreview(LocalImage);

        // Envia para o pai: File, Base64 e buffer binário
        onImageSelect(file, LocalImage, binaryData);
      } catch (err) {
        console.error("Erro ao processar imagem", err);
      }

      if (fileInputRef.current && fileInputRef.current.files?.length) {
        fileInputRef.current.value = "";
      }
    }
  }

  function handleClick() {
    fileInputRef.current?.click();
  }

  function handleRemove() {
    setPreview(undefined);
    onImageSelect(undefined, "", undefined); // Envia null ao remover
  }

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      {label && <label className="font-semibold">{label}</label>}

      {preview ? (
        <div className="relative">
          <img src={preview} alt="Preview" className="w-48 h-48 object-cover rounded-md" />
          <button onClick={handleRemove} className="transition absolute top-2 right-2 text-white bg-red-500 hover:bg-red-700 rounded-full w-8 h-8 flex items-center justify-center">
            <CircleX size={28}/>
          </button>
        </div>
      ) : (
        <button onClick={handleClick} className="transition w-48 h-48 border border-dashed border-gray-400 rounded-md hover:bg-gray-100">
          Selecionar imagem
        </button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
