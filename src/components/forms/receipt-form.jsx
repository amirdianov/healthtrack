import React from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {ru} from "date-fns/locale";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Calendar} from "@/components/ui/calendar.jsx"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.jsx";
import {cn} from "@/lib/utils.js";
import {CalendarIcon} from "lucide-react";
import {format} from "date-fns";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form.jsx";
import {useForm} from "react-hook-form";
import {TimePicker} from "@/components/ui/time-picker.jsx";
import TimeInterval from "@/components/ui/time-interval.jsx";
import useReceiptStore from "@/stores/receipt-store.js";
import {useToast} from "@/components/ui/use-toast.js";
import {useNavigate} from "react-router-dom";
import {ModalMedicine} from "@/components/forms/modal-medicine.jsx";
import useMedicineStore from "@/stores/medicine-store.js";

const formSchema = z.object({
  medicine: z.string().min(1, "Пожалуйста, выберите лекарство."),
  dosage: z.string().min(1, "Пожалуйста, введите дозировку."),
  start_date: z.date().min(new Date("1900-01-01"), "Пожалуйста, выберите дату начала приёма."),
  end_date: z.date().optional(),
  periodicity: z.number().min(1, "Пожалуйста, задайте периодичность."),
})

const ReceiptForm = () => {
  const {toast} = useToast();
  const navigate = useNavigate();

  const medicines = useMedicineStore(state => state.medicines);
  const addReceipt = useReceiptStore(state => state.addReceipt);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      medicine: "",
      dosage: "",
      start_date: new Date(),
      end_date: undefined,
      periodicity: 24 * 60 * 60,
    },
  })

  function onSubmit(receipt) {
    addReceipt(receipt);
    toast({
      description: "Назначение успешно создано!",
    });
    navigate("/");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Создание назначения</CardTitle>
        <CardDescription>Запись информации о назначении лекарства от врача.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="medicine"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Лекарство</FormLabel>
                  <div className="flex items-center justify-between">
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите лекарство"/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent position="popper">
                        {Object.values(medicines).map(medicine =>
                          <SelectItem key={medicine.id} value={medicine.id}>{medicine.title}</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <ModalMedicine/>
                  </div>
                  <FormDescription>
                    Вы можете добавить новое лекарство, нажав на кнопку справа.
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dosage"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Дозировка</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите дозировку, например, 2 таблетки" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="start_date"
              render={({field}) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Дата начала приёма</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ?
                            format(field.value, "PPP HH:mm:ss", {locale: ru}) :
                            <span>Выберите дату начала приёма</span>
                          }
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date("1900-01-01")}
                        initialFocus
                      />
                      <div className="p-3 border-t border-border">
                        <TimePicker
                          setDate={field.onChange}
                          date={field.value}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="end_date"
              render={({field}) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Дата окончания приёма</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ?
                            format(field.value, "PPP HH:mm:ss", {locale: ru}) :
                            <span>Выберите дату окончания приёма</span>
                          }
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date("1900-01-01")}
                        initialFocus
                      />
                      <div className="p-3 border-t border-border">
                        <TimePicker
                          setDate={field.onChange}
                          date={field.value}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="periodicity"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Периодичность</FormLabel>
                  <FormControl>
                    <TimeInterval onChange={field.onChange}/>
                  </FormControl>
                  <FormDescription>
                    С какой периодичностью нужно принимать лекарство.
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={form.handleSubmit(onSubmit)}>Создать</Button>
      </CardFooter>
    </Card>
  );
};

export default ReceiptForm;
