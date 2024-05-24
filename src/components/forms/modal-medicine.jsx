import {Button} from "@/components/ui/button"
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Plus} from "lucide-react";
import React, {useState} from "react";
import {useToast} from "@/components/ui/use-toast.js";
import useMedicineStore from "@/stores/medicine-store.js";
import {v4 as uuid} from "uuid";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.jsx";

const formSchema = z.object({
  title: z.string().min(1, "Наименование лекарства не может быть пустым."),
})

export const ModalMedicine = () => {
  const {toast} = useToast();

  const [open, setOpen] = useState(false);
  const addMedicine = useMedicineStore(state => state.addMedicine);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })

  function onSubmit(medicineData) {
    addMedicine({id: uuid(), ...medicineData});
    toast({
      description: "Лекарство успешно добавлено!",
    });
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="ml-3" variant="outline" size="icon">
          <Plus className="h-4 w-4"/>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Добавление лекарства</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Наименование</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите лекарство" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" onClick={form.handleSubmit(onSubmit)}>Добавить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
