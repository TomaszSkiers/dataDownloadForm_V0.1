export interface TachographBrand {
  id: string;
  name: string;
}

export const TACHOGRAPHS_BRANDS: TachographBrand[] = [
  {
    id: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    name: "ASELSAN A.Ş.",
  },
  {
    id: "b2f8a1c3-4d5e-4f6a-8b9c-1d2e3f4a5b6c",
    name: "Continental Automotive GmbH",
  },
  {
    id: "e3b0c442-98fc-4c14-932d-283182413345",
    name: "Intellic Germany GmbH",
  },
  {
    id: "8f14e45f-cc54-4632-a5e1-0c4e72355523",
    name: "Pars Ar-Ge Ltd. Şti.",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "Stoneridge Electronics AB",
  },
] as const;