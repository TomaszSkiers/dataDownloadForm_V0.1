import { faker } from '@faker-js/faker';
import { z } from 'zod';
import { WORKSHOP_SCHEMA } from '../../constants/initialData';


// Inferencja typu z Twojego schematu Zod
type Workshop = z.infer<typeof WORKSHOP_SCHEMA>;

export const generateRandomWorkshop = (): Workshop => {
  const mockData = {
    id: faker.string.uuid(),
    // faker.company.name() generuje realistyczne nazwy firm
    name: faker.company.name().substring(0, 50), 
    // faker.location.streetAddress() generuje adresy
    address: faker.location.streetAddress().substring(0, 50),
  };

  // Walidujemy dane schematem przed zwróceniem (dobra praktyka)
  return WORKSHOP_SCHEMA.parse(mockData);
};