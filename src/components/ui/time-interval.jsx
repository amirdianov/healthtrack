import React, {useEffect, useState} from "react";
import {Input} from "@/components/ui/input.jsx";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {milliseconds} from "date-fns";

const normalize_count_form = (number, words_arr) => {
  number = Math.abs(number);
  if (Number.isInteger(number)) {
    let options = [2, 0, 1, 1, 1, 2];
    return words_arr[(number % 100 > 4 && number % 100 < 20) ? 2 : options[(number % 10 < 5) ? number % 10 : 5]];
  }
  return words_arr[1];
}

const TimeInterval = ({onChange}) => {
  const [number, setNumber] = useState(1);
  const [unit, setUnit] = useState("days");

  useEffect(() => {
    const interval = {};
    interval[unit] = number;
    onChange(milliseconds(interval));
  }, [number, unit, onChange]);

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="number" placeholder="" min={1} value={number} onChange={e => setNumber(e.target.value)}/>
      <Select onValueChange={setUnit} defaultValue={unit}>
        <SelectTrigger>
          <SelectValue placeholder=""/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="seconds">{normalize_count_form(number, ["секунда", "секунды", "секунд"])}</SelectItem>
            <SelectItem value="minutes">{normalize_count_form(number, ["минута", "минуты", "минут"])}</SelectItem>
            <SelectItem value="hours">{normalize_count_form(number, ["час", "часа", "часов"])}</SelectItem>
            <SelectItem value="days">{normalize_count_form(number, ["день", "дня", "дней"])}</SelectItem>
            <SelectItem value="weeks">{normalize_count_form(number, ["неделя", "недели", "недель"])}</SelectItem>
            <SelectItem value="months">{normalize_count_form(number, ["месяц", "месяца", "месяцев"])}</SelectItem>
            <SelectItem value="years">{normalize_count_form(number, ["год", "года", "лет"])}</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TimeInterval;