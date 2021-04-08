import _ from 'lodash';
import dayjs from 'dayjs';

export function last30dates() {
    const endDayjs = dayjs();
    const endYear = endDayjs.year();
    const endMonth = endDayjs.month() + 1;
    const endMonthString = endMonth < 10 ? '0' + endMonth.toString() : endMonth.toString();
    const endDate = endDayjs.date();
    const startDayjs = dayjs().subtract(29, 'days');
    const startYear = startDayjs.year();
    const startMonth = startDayjs.month() + 1;
    const startMonthString = startMonth < 10 ? '0' + startMonth.toString() : startMonth.toString();
    const startDate = startDayjs.date();
    const dates = [];
    if (endMonth === startMonth) {
        // The same month, directly change the number of days
        _.each(_.range(startDate, endDate + 1), (item) => {
            if (item < 10) {
                item = '0' + item.toString();
            }
            dates.push(`${endYear}-${endMonthString}-${item}`);
        });
    } else if (endMonth === startMonth + 1 || startMonth - endMonth === 11) {
        // last month and current month
        // last month
        _.each(_.range(startDate, startDayjs.daysInMonth() + 1), (item) => {
            if (item < 10) {
                item = '0' + item.toString();
            }
            dates.push(`${startYear}-${startMonthString}-${item}`);
        });

        // current month
        _.each(_.range(1, endDate + 1), (item) => {
            if (item < 10) {
                item = '0' + item.toString();
            }
            dates.push(`${endYear}-${endMonthString}-${item}`);
        });
    } else if (endMonth === startMonth + 2) {
        // Last month, last month and current month, when you met February
        // last month
        _.each(_.range(startDate, startDayjs.daysInMonth() + 1), (item) => {
            if (item < 10) {
                item = '0' + item.toString();
            }
            dates.push(`${startYear}-${startMonthString}-${item}`);
        });

        // February 
        _.each(_.range(1, startDayjs.add(1, 'months').daysInMonth() + 1), (item) => {
            if (item < 10) {
                item = '0' + item.toString();
            }
            dates.push(`${startYear}-02-${item}`);
        });

        // current month
        _.each(_.range(1, endDate + 1), (item) => {
            if (item < 10) {
                item = '0' + item.toString();
            }
            dates.push(`${endYear}-${endMonthString}-${item}`);
        });
    }
    return dates;
};
