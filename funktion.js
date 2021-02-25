// Hier sagen wir dem Browser nur, dass erm nachdem die Seite vollständig geladen 
// wurde, die Funktion main(ohne Argumente) aufrufen soll.
window.onload = function() {
    main();
};

function main() {
    // Grund-Daten
    var strDebug = "";
    var datToday = new Date();
    strDebug += "datToday: " + datToday.toDateString() + "<br/>"; // Ausgabe
    var datTodayGerman = getDateGerman(datToday);
    strDebug += "datTodayGerman: " + datTodayGerman + "<br/>"; // Ausgabe

    // Wochentag
    var weekday = datToday.getDay(); // ergibt den Tag der Woche als Zahl (von 0 = Sonntag bis 6 = Samstag)
    strDebug += "weekday: " + weekday + "<br/>"; // Ausgabe
    var weekdayGerman = getWeekdayGerman(weekday);
    strDebug += "weekdayGerman: " + weekdayGerman + "<br/>";

    // Monat
    var month = datToday.getMonth();
    strDebug += "month:" + month + "<br/>";
    var monthGerman = getMonthGerman(month);
    strDebug += "monthGerman:" + monthGerman + "<br/>";

    //Kalenderwoche
    var calendarweekDay = datToday.getDate();
    var calendarweek = getCalendarweek(calendarweekDay);
    strDebug += "calendarweek:" + calendarweek + "<br/>";

    //Tagesanzahl des Monats
    var lastMonthDays = new Date(year, month+1, 0);
    var monthDays = getMonthDays(lastMonthDays);
    strDebug += "monthDays:" + monthDays + "<br/>";




// Wir füllen die Informationen in den HTML-Code
document.getElementById("field1").innerHTML = datTodayGerman;
document.getElementById("field3").innerHTML = datTodayGerman;
document.getElementById("field2").innerHTML = weekdayGerman;
document.getElementById("field4").innerHTML = weekdayGerman;
document.getElementById("field5").innerHTML = monthGerman;
document.getElementById("field6").innerHTML = year;
document.getElementById("field7").innerHTML = datTodayGerman;
document.getElementById("field8").innerHTML = datTodayGerman;
document.getElementById("field9").innerHTML = calendarweek;
document.getElementById("field10").innerHTML = monthDays;



    // Ausgabe in das elDebug
    var elDebug = document.getElementById("debug");
    if (elDebug != null) {
        elDebug.innerHTML = strDebug;
    } else {
        console.log("Debug-Element nicht gefunden.");
    }
}

function getDateGerman(date) {
    day = date.getDate();
    month = date.getMonth();
    month = month + 1; // Warum auch immer ... Javascript speichert Monate 0-basiert, also 0 = Januar, 11 = Dezember, daher hier Korrektur + 1
    year = date.getFullYear();
    // Man beachte: Man könnte hier nachfolgend nach dem if {} benutzen, aber da es sich nur um EINE nachfolgende Anweisung handelt, geht es auch so
    if (String(day).length == 1) day = "0" + day;
    // Nachfolgend alternativ MIT Klammern
    if (String(month).length == 1) {
        month = "0" + month;
    }
    dateGerman = day + "." + month + "." + year;
    return dateGerman;
}

function getWeekdayGerman(weekdayIndex) {
    if (weekdayIndex == 0) {
        return "Sonntag";
    } else if (weekdayIndex == 1) {
        return "Montag";
    } else if (weekdayIndex == 2) {
        return "Dienstag";
    } else if (weekdayIndex == 3) {
        return "Mittwoch";
    } else if (weekdayIndex == 4) {
        return "Donnerstag";
    } else if (weekdayIndex == 5) {
        return "Freitag";
    } else if (weekdayIndex == 6) {
        return "Samstag";
    }
}

function getMonthGerman(monthIndex) {
    if (monthIndex == 0) {
        return "Januar";
    } else if (monthIndex == 1) {
        return "Februar";    
    } else if (monthIndex == 2) {
        return "März";
    } else if (monthIndex == 3) {
        return "April";
    } else if (monthIndex == 4) {
        return "Mai";
    } else if (monthIndex == 5) {
        return "Juni";
    } else if (monthIndex == 6) {
        return "Juli";
    } else if (monthIndex == 7) {
        return "August";
    } else if (monthIndex == 8) {
        return "September";
    } else if (monthIndex == 9) {
        return "Oktober";
    } else if (monthIndex == 10) {
        return "November";
    } else if (monthIndex == 11) {
        return "Dezember";
    }
}

function getCalendarweek(calendarweekDayIndex) {
    if (calendarweekDayIndex <= 7) {
        return "erste";
    } else if (calendarweekDayIndex <= 14) {
        return "zweite";
    } else if (calendarweekDayIndex <= 21) {
        return "dritte";
    } else if (calendarweekDayIndex <= 28) {
        return "vierte";
    } else return "fünfte";
}

function getMonthDays(lastMonthDaysIndex) {
    monthDays = lastMonthDaysIndex.getDate();
    return monthDays;
}
