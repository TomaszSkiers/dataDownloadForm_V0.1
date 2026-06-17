import { useVehicalStorage2 } from "@/store/useVehicleStorage2";
import { useMemo } from "react";

/**
 * Custom Hook to retrieve a filtered and sorted list of vehicles.
 *
 * Automatically listens to state changes in `useVehicalStorage2` (Zustand) for:
 * - `vehicleList` (the raw list of all vehicles)
 * - `activeSort` (the currently selected category used for filtering)
 *
 * Array operations are optimized using React's `useMemo` (caching),
 * ensuring that recalculations do not trigger on unrelated component
 * re-renders (e.g., opening dialog modals).
 *
 * @returns {Vehicle[]} A filtered array of vehicles, sorted alphabetically by name (supporting Polish locale characters).
 *
 * @example
 * ```typescript
 * // Usage inside a React component:
 * const vehiclesList = useFilteredVehicles();
 *
 * return (
 * <div>
 * {vehiclesList.map(vehicle => (
 * <VehicleCard key={vehicle.id} item={vehicle} />
 * ))}
 * </div>
 * );
 * ```
 */



export const useFilteredVehicles = () => {

  const activeSort = useVehicalStorage2(s => s.activeSort)
  const vehicleList = useVehicalStorage2(s => s.vehicleList)

  const processedVehicles = useMemo(() => {
    const filtered = vehicleList.filter(
      (vehicle) => vehicle.category === activeSort
    )

    return [...filtered].sort((a, b) => {
      return a.name.localeCompare(b.name, 'pl')
    })
  }, [vehicleList, activeSort])

  return processedVehicles
}