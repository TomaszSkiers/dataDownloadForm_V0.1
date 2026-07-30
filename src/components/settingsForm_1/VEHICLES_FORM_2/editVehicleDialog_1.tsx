
'use client';

import * as React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';



export default function EditVehicleDialog() {

  const open = useVehicleUiStore((s)=> s.isEditDialogOpen)
  const onClose = useVehicleUiStore((s) => s.closeEditDialog)

  // Jeśli dialog jest zamknięty, nie renderujemy nic w DOM
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs">
      <Card className="w-full max-w-lg relative shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Edycja pojazdu v.1</CardTitle>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 rounded-full" 
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Zamknij</span>
          </Button>
        </CardHeader>
        <CardContent>
          <span>testowy select </span>
          <MyDropdown />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="np: wybierz rodzaj pojazdu"/>
            </SelectTrigger>
            <SelectContent position='popper'>
              {bodyType.map((type) => (
                <SelectItem key={type.id} value={type.bodyName}>
                  {type.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
        <CardFooter className='gap-2'>
          <Button type='button'>zapisz</Button>
          <Button type='button'>anuluj</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

// =====================================================
// 
// =====================================================
// components/MyDropdown.tsx
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

import { Settings, User, LogOut, MoreHorizontal } from "lucide-react"
import { useVehicleUiStore } from '@/store/useVehicleUiStore';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { bodyType } from '../../../../constants/initialData';

export  function MyDropdown() {
  return (
    <DropdownMenu>
      {/* 1. Przycisk wyzwalający otwieranie menu */}
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Otwórz menu</span>
        </Button>
      </DropdownMenuTrigger>
      
      {/* 2. Zawartość rozwijanego menu */}
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Moje konto</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profil</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Ustawienia</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        {/* Przykład elementu z akcentem (np. wylogowanie) */}
        <DropdownMenuItem className="text-red-600 focus:text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Wyloguj się</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}