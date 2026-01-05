import React from "react";
import {
  emptyCityStreetSuggestion,
  type CityStreetSuggestion,
} from "./form.utils";
import { toast } from "sonner";
import { FormContainer, FormHeader, StreetSelectionStatus } from "./components";
import { createStreetProposal, getStreets, type Street } from "./api";
import { useForm } from "react-hook-form";
import { CustomBotton, Input, Textarea } from "@/components/ui";
import { StreetSuggestions } from "./components/street-suggestions.component";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";

const validationRules = {
  streetCode: {
    required: "Por favor, seleccioná una calle sin nombre en el mapa",
  },
  name: {
    required: "El nombre es requerido",
    minLength: {
      value: 2,
      message: "El nombre debe tener al menos 2 caracteres",
    },
    pattern: {
      value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      message: "El nombre solo puede contener letras y espacios",
    },
  },
  proposedName: {
    required: "El nombre propuesto es requerido",
    minLength: {
      value: 3,
      message: "El nombre propuesto debe tener al menos 3 caracteres",
    },
    maxLength: {
      value: 100,
      message: "El nombre propuesto no puede exceder 100 caracteres",
    },
  },
  reason: {
    required: "La razón o justificación es requerida",
    minLength: {
      value: 20,
      message: "La justificación debe tener al menos 20 caracteres",
    },
    maxLength: {
      value: 1000,
      message: "La justificación no puede exceder 1000 caracteres",
    },
  },
  phone: {
    required: "El número de teléfono es requerido",
    pattern: {
      value: /^09\d{8}$/,
      message:
        "El teléfono debe tener el formato: 09xxxxxxxx (10 dígitos comenzando con 09)",
    },
  },
  docNumber: {
    required: "El cédula es requerida",
    minLength: {
      value: 6,
      message: "El número de cédula debe tener al menos 6 dígitos.",
    },
    pattern: {
      value: /^[0-9]+$/,
      message: "El número de cédula solo puede contener dígitos.",
    },
  },
};

interface Props {
  formData: CityStreetSuggestion;
  setFormData: React.Dispatch<React.SetStateAction<CityStreetSuggestion>>;
}

export const Form: React.FC<Props> = ({ formData, setFormData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    getValues,
  } = useForm<CityStreetSuggestion>({
    defaultValues: formData,
    mode: "onBlur",
  });

  const [streets, setStreets] = React.useState<Street[]>([]);
  const [isLoadingStreets, setIsLoadingStreets] = React.useState(false);
  const [disableProposedName, setDisableProposedName] = React.useState(false);

  React.useEffect(() => {
    const currentStreetCode = getValues("streetCode");
    if (formData.streetCode !== currentStreetCode) {
      setValue("streetCode", formData.streetCode);
    }

    // Cargar sugerencias solo si hay un streetCode
    if (formData.streetCode) {
      const resetWithCode = {
        ...emptyCityStreetSuggestion,
        streetCode: formData.streetCode,
      };
      reset(resetWithCode);
      setDisableProposedName(false);
      setIsLoadingStreets(true);
      getStreets(formData.streetCode)
        .then((streets) => setStreets(streets))
        .catch((error) => {
          console.error("Error al cargar sugerencias:", error);
          setStreets([]);
        })
        .finally(() => setIsLoadingStreets(false));
    } else {
      setStreets([]);
    }
  }, [formData.streetCode, setValue, getValues]);

  const handleReset = () => {
    reset(emptyCityStreetSuggestion);
    setFormData(emptyCityStreetSuggestion);
    setStreets([]); // Limpiar también las sugerencias
    setDisableProposedName(false);
  };

  const handleAddSuggestion = () => {
    // Puedes hacer scroll al input del nombre propuesto
    const proposedNameInput = document.getElementById("proposedName");
    if (proposedNameInput) {
      proposedNameInput.scrollIntoView({ behavior: "smooth", block: "center" });
      proposedNameInput.focus();
    }
  };

  // 🌟 NUEVO: Handler para cuando el usuario selecciona una sugerencia
  const handleSelectSuggestion = (suggestedName: string) => {
    // Autocompletar el campo "proposedName" con la sugerencia seleccionada
    setValue("proposedName", suggestedName, {
      shouldValidate: true, // Validar el campo después de establecer el valor
      shouldDirty: true, // Marcar el campo como "modificado"
      shouldTouch: true, // Marcar el campo como "tocado"
    });

    // Deshabilitar el campo "proposedName"
    setDisableProposedName(true);
    handleAddSuggestion();

    // Mostrar feedback al usuario
    toast.success(`Sugerencia seleccionada: "${suggestedName}"`);
  };

  const onSubmit = async (data: CityStreetSuggestion) => {
    try {
      await createStreetProposal(data);

      toast.success(
        "¡Propuesta enviada exitosamente! Gracias por tu contribución a la comunidad."
      );
      handleReset();
    } catch (error: any) {
      console.error("Error al enviar el formulario:", error);

      const message = (error.message =
        "Hubo un error al enviar tu propuesta. Por favor, inténtalo de nuevo.");

      toast(message);
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center md:flex-row">
      <FormHeader
        title={
          <>
            <span className="text-primary">Proponer</span> nombre para calle
          </>
        }
        description="Ayuda a mejorar tu comunidad proponiendo nombres significativos para las calles sin denominar"
      />

      <FormContainer>
        <form
          className="bg-white/80 dark:bg-slate-900 backdrop-blur-sm p-4 md:p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <StreetSelectionStatus streetCode={formData.streetCode} />

          <Input
            id="streetCode"
            label="Código de calle"
            placeholder="Haz clic en una calle naranja del mapa"
            readOnly
            required
            error={errors.streetCode?.message}
            {...register("streetCode", validationRules.streetCode)}
          />

          {formData.streetCode && (
            <div className="mb-6">
              <StreetSuggestions
                streets={streets}
                isLoading={isLoadingStreets}
                onSelectSuggestion={handleSelectSuggestion}
              />
            </div>
          )}

          <Input
            id="name"
            label="Tu nombre"
            placeholder="Ingresa tu nombre completo"
            maxLength={50}
            required
            error={errors.name?.message}
            {...register("name", validationRules.name)}
          />

          <Input
            id="docNumber"
            type="text"
            label="Número de cédula"
            placeholder="Ej: 12345678"
            maxLength={8}
            required
            error={errors.docNumber?.message}
            {...register("docNumber", validationRules.docNumber)}
          />

          <Input
            id="phone"
            type="tel"
            label="Número de teléfono"
            placeholder="09xxxxxxxx"
            maxLength={10}
            required
            error={errors.phone?.message}
            {...register("phone", validationRules.phone)}
          />

          <div className="flex flex-row w-full gap-2 justify-between items-center">
            <Input
              id="proposedName"
              label="Nombre propuesto para la calle"
              placeholder="Ej: Calle de los Pioneros"
              maxLength={100}
              required
              showCounter
              error={errors.proposedName?.message}
              readOnly={disableProposedName}
              className="flex-1" // 👈 Esto hace que ocupe todo el espacio disponible
              {...register("proposedName", validationRules.proposedName)}
            />
            <Button
              onClick={() => setDisableProposedName(!disableProposedName)}
              variant={"green"}
              disabled={!disableProposedName}
            >
              <Edit2 />
            </Button>
          </div>

          <Textarea
            id="reason"
            label="Razón o justificación"
            placeholder="Explica por qué este nombre es apropiado para la calle..."
            maxLength={1000}
            minLength={20}
            required
            error={errors.reason?.message}
            {...register("reason", validationRules.reason)}
          />

          <CustomBotton
            type="submit"
            disabled={!formData.streetCode}
            loading={isSubmitting}
          >
            {isSubmitting
              ? "Enviando..."
              : formData.streetCode
              ? "Enviar propuesta"
              : "Selecciona una calle primero"}
          </CustomBotton>
        </form>
      </FormContainer>
    </section>
  );
};
