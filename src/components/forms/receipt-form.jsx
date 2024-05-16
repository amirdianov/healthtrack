import React from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";

const ReceiptForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Создание назначения</CardTitle>
        <CardDescription>Запись информации о назначении лекарства от врача.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="medicine">Лекарство</Label>
              <Select>
                <SelectTrigger id="medicine">
                  <SelectValue placeholder="Выберите"/>
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="aspirin">Аспирин</SelectItem>
                  <SelectItem value="strepsils">Стрепсилс</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="dosage">Дозировка</Label>
              <Input id="dosage" placeholder="Введите дозировку, например, 2 таблетки"/>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>Создать</Button>
      </CardFooter>
    </Card>
  );
};

export default ReceiptForm;