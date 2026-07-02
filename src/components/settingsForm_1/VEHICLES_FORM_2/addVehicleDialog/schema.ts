import { z } from "zod";

// 1. Definiujemy schemat walidacji formularza
export const vehicleFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Nazwa marki jest wymagana"),
  category: z.string(),
  
  // Tablica obiektów, w której każdy obiekt ma jedno pole 'value'
  types: z.array(
    z.object({
      value: z.string().min(1, "Model/typ musi mieć przynajmniej 1 znak"),
    })
  ).min(1, "Musisz dodać przynajmniej jeden model pojazdu"),
});

// 2. Eksportujemy typ wygenerowany automatycznie na podstawie schematu Zod
// Będziemy go używać do typowania useForm oraz sub-komponentów
export type VehicleFormValues = z.infer<typeof vehicleFormSchema>;