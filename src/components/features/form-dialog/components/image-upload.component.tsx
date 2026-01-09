import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  value: File | null;
  onChange: (file: File | null) => void;
  disabled?: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  disabled = false
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona solo archivos de imagen');
        return;
      }

      // Validar tamaño (5MB máximo)
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen no debe superar los 5MB');
        return;
      }

      onChange(file);
      
      // Crear preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    onChange(null);
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <Label>Imagen del terreno</Label>
      
      {!preview ? (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-6 transition-colors",
            "hover:border-primary/50 hover:bg-accent/50",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={disabled}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className={cn(
              "flex flex-col items-center justify-center cursor-pointer",
              disabled && "cursor-not-allowed"
            )}
          >
            <Upload className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-sm font-medium">Click para seleccionar imagen</p>
            <p className="text-xs text-muted-foreground mt-1">
              PNG, JPG, WEBP hasta 5MB
            </p>
          </label>
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden border">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">
            <p className="text-xs truncate flex items-center gap-1">
              <ImageIcon className="h-3 w-3" />
              {value?.name}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};