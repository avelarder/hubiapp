import React from 'react'
import { Switch } from '@headlessui/react'
import Select from '../../common/select'
import moment from 'moment';
import { VALIDATIONS, getMinutes } from '../../../utils/UI-Constants';

function Scheduler({ enabled, setEnabled, schedule, onScheduleChanged, months, years, days, hours, minutes, showTitle }) {

    const scheduleYear = schedule.get("year");
    const scheduleMonth = schedule.get("month") + 1;
    const scheduleDay = schedule.get("date");
    const scheduleHour = schedule.get("hour");
    const scheduleMinute = getMinutes(schedule.get("minute"));

    const getScheduleDate = () => {

        const scheduleDate = moment(`${scheduleYear}-${scheduleMonth}-${scheduleDay} ${scheduleHour}:${scheduleMinute}`, "YYYY-MM-DD H:m");
        const isValid = VALIDATIONS.DATETIME_AFTER(scheduleDate);
        if (isValid) {
            return (<span className='ml-2 text-lg font-medium'>{`${scheduleDay}/${scheduleMonth}/${scheduleYear} a las ${scheduleHour}:${scheduleMinute} hrs.`}</span>);
        }
        return (<span className='ml-2 text-lg font-medium text-red-700'>{`${scheduleDay}/${scheduleMonth}/${scheduleYear} a las ${scheduleHour}:${scheduleMinute} hrs.`}</span>);
    }

    const setSchedule = (dateElement, option) => {
        switch (dateElement) {
            case "year":
                onScheduleChanged({ year: option.id, month: scheduleMonth, day: scheduleDay, hour: scheduleHour, minute: scheduleMinute });
                break;
            case "month":
                onScheduleChanged({ year: scheduleYear, month: option.id, day: scheduleDay, hour: scheduleHour, minute: scheduleMinute });
                break;
            case "day":
                onScheduleChanged({ year: scheduleYear, month: scheduleMonth, day: option.id, hour: scheduleHour, minute: scheduleMinute });
                break;
            case "hour":
                onScheduleChanged({ year: scheduleYear, month: scheduleMonth, day: scheduleDay, hour: option.id, minute: scheduleMinute });
                break;
            case "minute":
                onScheduleChanged({ year: scheduleYear, month: scheduleMonth, day: scheduleDay, hour: scheduleHour, minute: option.id });
                break;
        }
    }

    return (
        <div>
            <span className="text-center text-sm font-medium">Deseas programar esta publicación?</span>
            <br></br>
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
                    {showTitle && <span className="flex justify-center font-medium uppercase mb-4">Programación</span>}
                    <div className="flex flex-row justify-start flex-wrap">
                        <div className="w-40 m-1">
                            <Select
                                title={"Mes"}
                                showTitle={true}
                                options={months}
                                selectedOption={
                                    months.find(m => m.id === scheduleMonth)
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
                                    days.find(d => d.id === scheduleDay)
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
                                    years.find(y => y.id === scheduleYear)
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
                                    hours.find(h => h.id == scheduleHour)
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
                                    minutes.find(m => m.id === scheduleMinute)
                                }
                                onOptionChanged={(e) => { setSchedule("minute", e) }}
                            ></Select>
                        </div>
                        <br></br>
                    </div>
                    <span className="ml-2 text-sm">{`Esta publicación quedará disponible el día:`}</span>
                    {getScheduleDate()}
                    <span className="ml-2 text-sm font-medium">(-03:00) Zona horaria de Perú</span>
                </div>)
            }

        </div>
    )
}

export default Scheduler