import React, { useState } from 'react'
import { Switch } from '@headlessui/react'
import Select from '../../common/select'
import { SwitchHorizontalIcon } from '@heroicons/react/solid';

const getScheduleMonths = () => [
    { id: "01", text: "Enero" },
    { id: "02", text: "Febrero" },
    { id: "03", text: "Marzo" },
    { id: "04", text: "Abril" },
    { id: "05", text: "Mayo" },
    { id: "06", text: "Junio" },
    { id: "07", text: "Julio" },
    { id: "08", text: "Agosto" },
    { id: "09", text: "Setiembre" },
    { id: "10", text: "Octubre" },
    { id: "11", text: "Noviembre" },
    { id: "12", text: "Diciembre" },
];


const getScheduleYears = () => {
    const years = [];
    const initYear = (new Date()).getFullYear()

    for (let i = initYear; i < initYear + 20; i++) {
        years.push({ id: i, text: i });
    }
    return years;
}
const getScheduleDays = () => {
    const days = [];
    for (let i = 1; i <= 31; i++) {
        days.push({ id: i, text: i });
    }
    return days;
}
const getScheduleHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
        hours.push({ id: i, text: i });
    }
    return hours;
}
const getScheduleMinutes = () => [
    { id: "00", text: "00" },
    { id: "15", text: "15" },
    { id: "30", text: "30" },
    { id: "45", text: "45" },
];

function Scheduler({ enabled, setEnabled, schedule, onScheduleChanged }) {

    const months = getScheduleMonths()
    const years = getScheduleYears()
    const days = getScheduleDays()
    const hours = getScheduleHours()
    const minutes = getScheduleMinutes()

    const [scheduleYear, setScheduleYear] = useState(schedule?.year ?? years[0]);
    const [scheduleMonth, setScheduleMonth] = useState(schedule?.month ?? months[0]);
    const [scheduleDay, setScheduleDay] = useState(schedule?.day ?? days[0]);
    const [scheduleHour, setScheduleHour] = useState(schedule?.hour ?? hours[0]);
    const [scheduleMinute, setScheduleMinute] = useState(schedule?.minute ?? minutes[0]);


    const getScheduleDate = () => {
        if (scheduleYear && scheduleMonth && scheduleDay && scheduleHour && scheduleMinute) {

            return `${scheduleMonth.text} ${scheduleDay.text} del ${scheduleYear.text} a las ${scheduleHour.text}:${scheduleMinute.text} hrs.`;
        }
        return "--"
    }

    const setSchedule = (dateElement, option) => {
        switch (dateElement) {
            case "year":
                setScheduleYear(option);
                break;
            case "month":
                setScheduleMonth(option);
                break;
            case "day":
                setScheduleDay(option);
                break;
            case "hour":
                setScheduleHour(option);
                break;
            case "minute":
                setScheduleMinute(option);
                break;
        }
        onScheduleChanged({ year: scheduleYear, month: scheduleMonth, day: scheduleDay, hour: scheduleHour, minute: scheduleMinute });
    }

    return (
        <div >
            <span className="flex text-center text-sm font-medium">Deseas programar esta publicación?</span>
            <Switch
                checked={enabled}
                onChange={(e) => setEnabled(e)}
                className={`${enabled ? 'bg-purple-500' : 'bg-purple-200'}
          relative inline-flex flex-shrink-0 h-5 w-10 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
                <span
                    aria-hidden="true"
                    className={`${enabled ? 'translate-x-5' : 'translate-x-0'}
            pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg transform ring-2 ring-purple-500 transition ease-in-out duration-200 self-center`}
                />
            </Switch >

            {
                enabled && (<div className="flex flex-col border-1 border-gray-100 rounded-lg p-4 transition ease-in-out delay-200 ">
                    <span className="flex justify-center font-medium uppercase mb-4">Programación</span>
                    <div className="flex flex-row justify-start flex-wrap">
                        <div className="w-40 m-1">
                            <Select
                                title={"Mes"}
                                showTitle={true}
                                options={months}
                                selectedOption={
                                    scheduleMonth
                                }
                                onOptionChanged={(e) => { setSchedule("month", e) }}
                            ></Select>
                        </div>
                        <div className="w-24 m-1">
                            <Select
                                title={"Día"}
                                showTitle={true}
                                options={days}
                                selectedOption={
                                    scheduleDay
                                }
                                onOptionChanged={(e) => { setSchedule("day", e) }}
                            ></Select>
                        </div>
                        <div className="w-32 m-1">
                            <Select
                                title={"Año"}
                                showTitle={true}
                                options={years}
                                selectedOption={
                                    scheduleYear
                                }
                                onOptionChanged={(e) => { setSchedule("year", e) }}
                            ></Select>
                        </div>
                    </div>
                    <div className="flex flex-row justify-start flex-wrap">
                        <div className="w-24 m-1">
                            <Select
                                title={"Hora"}
                                showTitle={true}
                                options={hours}
                                selectedOption={
                                    scheduleHour
                                }
                                onOptionChanged={(e) => { setSchedule("hour", e) }}
                            ></Select>
                        </div>
                        <div className="w-24 m-1">
                            <Select
                                title={"Minuto"}
                                showTitle={true}
                                options={minutes}
                                selectedOption={
                                    scheduleMinute
                                }
                                onOptionChanged={(e) => { setSchedule("minute", e) }}
                            ></Select>
                        </div>
                        <br></br>
                    </div>
                    <span className="ml-2 text-sm">{`Esta publicación quedará disponible el día:`}</span>
                    <span className="ml-2 text-lg font-medium">{`${getScheduleDate()}`}</span>
                    <span className="ml-2 text-sm font-medium">(-03:00) Zona horaria de Perú</span>
                </div>)
            }

        </div>
    )
}

export default Scheduler