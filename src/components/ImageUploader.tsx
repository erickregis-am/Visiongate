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
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
    setError(null);
    if (file) {
      try {
        setLoading(true);
        const localImage = await toBase64(file);
        const binaryData = await toBinary(file);
        setPreview(localImage);

        onImageSelect(file, localImage, binaryData);
      } catch (err) {
        console.error("Erro ao processar imagem", err);
        setError("Erro ao carregar imagem. Tente outro arquivo.");
      } finally {
        setLoading(false);
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  function handleClick() {
    fileInputRef.current?.click();
  }

  function handleRemove() {
    setPreview(undefined);
    setError(null);
    onImageSelect(undefined, "", undefined);
  }

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      {label && <label className="font-semibold">{label}</label>}

      {preview ? (
        <div className="relative">
          <img src={preview} alt="Preview" className="w-48 h-48 object-cover rounded-md" />
          <button
            onClick={handleRemove}
            className="transition absolute top-2 right-2 text-white bg-red-500 hover:bg-red-700 rounded-full w-8 h-8 flex items-center justify-center"
            aria-label="Remover imagem selecionada"
          >
            <CircleX size={28} />
          </button>
        </div>
      ) : (
        <button
          onClick={handleClick}
          className="transition w-48 h-48 border border-dashed border-gray-400 rounded-md hover:bg-gray-100"
          aria-label="Selecionar imagem"
          disabled={loading}
        >
          {loading ? "Carregando..." : "Selecionar imagem"}
        </button>
      )}

      {error && <p className="text-red-600 text-sm">{error}</p>}

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
