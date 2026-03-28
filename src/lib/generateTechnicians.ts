import { v4 as uuidv4 } from 'uuid';
import { TechnicianSchema, Technician } from "../../constants/initialData";

// Lista polskich imion i nazwisk
const firstNames = [
  "Jan", "Andrzej", "Piotr", "Krzysztof", "Tomasz", "Paweł", "Michał",
  "Adam", "Marek", "Grzegorz", "Robert", "Mateusz", "Maciej", "Sebastian",
  "Wojciech", "Rafał", "Jakub", "Łukasz", "Dariusz", "Mariusz"
];

const lastNames = [
  "Kowalski", "Wiśniewski", "Wójcik", "Kowalczyk", "Kamiński",
  "Lewandowski", "Zieliński", "Woźniak", "Szymański", "Dąbrowski",
  "Kozłowski", "Jankowski", "Mazur", "Kwiatkowski", "Wojciechowski",
  "Krawczyk", "Piotrowski", "Grabowski", "Nowakowski", "Pawłowski",
  "Michalski", "Nowicki", "Adamski", "Dudek", "Stępień"
];

// Funkcja generująca 16-znakowy numer karty (tylko duże litery i cyfry)
const generateCardNumber = (): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';

  for (let i = 0; i < 16; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
};

// Główna funkcja do generowania jednego technika
export const generateSingleTechnician = (): Technician => {
  // Generuj losowe imię i nazwisko
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const fullName = `${firstName} ${lastName}`;

  // Generuj 16-znakowy numer karty
  const cardNumber = generateCardNumber();

  // Przygotuj obiekt technika
  const technicianData = {
    id: uuidv4(),
    fullName,
    cardNumber,
  };

  // Walidacja przez Zod (dla bezpieczeństwa)
  const validatedTechnician = TechnicianSchema.parse(technicianData);

  return validatedTechnician;
};

// Przykład użycia:
/*
const newTechnician = generateSingleTechnician();
console.log(newTechnician);
// {
//   id: "123e4567-e89b-12d3-a456-426614174000",
//   fullName: "Jan Kowalski",
//   cardNumber: "A7B3X9K2P5M1R4T8" // 16 znaków
// }

// Dodaj do store
useViewStore.getState().addTechnician(newTechnician);
*/