import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Plus} from "lucide-react";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useToast} from "@/components/ui/use-toast.js";
import useMedicineStore from "@/stores/medicine-store.js";
import {v4 as uuid} from "uuid";

export function ModalMedicine() {
    const navigate = useNavigate()
    const {toast} = useToast();
    const addMedicine = useMedicineStore(state => state.addMedicine);
    const [title, setTitle] = useState(""); // Состояние для хранения значения ввода

    function onSubmit() {
        if (title.trim() === "") {
            toast({
                description: "Наименование лекарства не может быть пустым",
            });
            return;
        }
        const newMedicine = {
            id: uuid(),
            title: title,
        };
        addMedicine(newMedicine);
        toast({
            description: "Успешно создано назначение!",
        });
        navigate("/");
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="ml-3" variant="outline" size="icon">
                    <Plus className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Добавление лекарства</DialogTitle>
                </DialogHeader>
                <div className="flex items-center">
                        <Label htmlFor="title">
                            Наименование
                        </Label>
                        <Input
                            id="title"
                            className="ml-3"
                            placeholder="Введите лекарство"
                            onChange={(e) => setTitle(e.target.value)} // Обновляем состояние при изменении ввода
                        />
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={onSubmit}>Добавить</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
