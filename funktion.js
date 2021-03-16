// Hier sagen wir dem Browser nur, dass erm nachdem die Seite vollständig geladen 
// wurde, die Funktion main(ohne Argumente) aufrufen soll.
window.onload = function () {
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
    var calendarweek = getCalendarweekGerman(calendarweekDay);
    strDebug += "calendarweek:" + calendarweek + "<br/>";

    //Tagesanzahl des Monats
    var lastDayThisMonth = new Date(year, month + 1, 0);
    var monthDays = lastDayThisMonth.getDate();
    strDebug += "monthDays:" + monthDays + "<br/>";

    // Erster des Monats
    var firstDayThisMonth = new Date(year, month, 1);
    var firstDayOfCalendar = firstDayThisMonth;
    var x = 0;
    while (firstDayOfCalendar.getDay() != 1) {
        firstDayOfCalendar = new Date(year, month, x);
        x--;
    }
    var lastDayOfCalendar = lastDayThisMonth;
    x = 1;
    while (lastDayOfCalendar.getDay() != 0) {
        lastDayOfCalendar = new Date(year, month + 1, x);
        x++;
    }

    // Feiertag
    let holidayHTML = '';
    let holidayArray = getHolidayArrayHessen(datToday);
    if (holidayArray.includes(datToday.getTime())) {
        holidayHTML = 'Der ' + datTodayGerman + ' ist ein gesetzlicher Feiertag in Hessen.';
    } else {
        holidayHTML = 'Der ' + datTodayGerman + ' ist kein gesetzlicher Feiertag in Hessen. ';
    }

    // Wir füllen die Informationen in den HTML-Code
    document.getElementById("field1").innerHTML = datTodayGerman;
    document.getElementById("field3").innerHTML = datTodayGerman;
    document.getElementById("field2").innerHTML = weekdayGerman;
    document.getElementById("field4").innerHTML = weekdayGerman;
    document.getElementById("field5").innerHTML = monthGerman;
    document.getElementById("field6").innerHTML = year;
    document.getElementById("field7").innerHTML = holidayHTML;
    document.getElementById("field8").innerHTML = datTodayGerman;
    document.getElementById("field9").innerHTML = calendarweek;
    document.getElementById("field10").innerHTML = monthDays;

    var html = '<table>';
    html += '<thead>';
    html += '<tr>';
    html += '        <th colspan="8">' + monthGerman + " " + year + '</th>';
    html += '    </tr>';
    html += '    <tr>';
    html += '        <th class="kw">KW</th>';
    html += '        <th class="mo">Mo</th>';
    html += '        <th class="di">Di</th>';
    html += '        <th class="mi">Mi</th>';
    html += '        <th class="do">Do</th>';
    html += '        <th class="fr">Fr</th>';
    html += '        <th class="sa">Sa</th>';
    html += '        <th class="so">So</th>';
    html += '    </tr>';
    html += '</thead>';



    for (var d = firstDayOfCalendar; d <= lastDayOfCalendar; d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1)) {
        html += getHtmlForOneDay(d, holidayArray);
    }




    // html += '        <td class="di">2</td>';
    // html += '        <td class="mi">3</td>';
    // html += '        <td class="do">4</td>';
    // html += '        <td class="fr">5</td>';
    // html += '        <td class="sa">6</td>';
    // html += '        <td class="so">7</td>';
    // html += '    </tr>';

    html += '</table>';

    // Kalenderblatt-Start
    document.getElementById("kalenderblatt").innerHTML = html;

    // Ausgabe in das elDebug
    var elDebug = document.getElementById("debug");
    if (elDebug != null) {
        elDebug.innerHTML = strDebug;
    } else {
        console.log("Debug-Element nicht gefunden.");
    }
}

/// Erstellt für jeden Tag eine HTML-Zeile
function getHtmlForOneDay(date, holidayArray) {
    var html = '';
    /// Wenn Montag..
    if (date.getDay() == 1) {
        /// Gib der Variable den Wert der Funktion (aktuelle Kalenderwoche)
        var weekNumber = getCalendarweek(date);
        /// Gib HTML diese Zeile (erstelle eine neue Tabellenzeile)
        html += '<tr>';
        /// Gib HTML diese Zeile (erstelle eine neue Tabellendate mit der Klasse kw + der Kalenderwoche)
        html += '<td class="kw">' + weekNumber + '</td>';
    }


    var klasse = getWeekdayShortcut(date);
    var heute = new Date();

    if (date.getMonth() == heute.getMonth() && date.getDate() == heute.getDate()) {
        klasse += ' heute';
    }
    var time = date.getTime();
    if (date.getMonth() == 3 && date.getDate() == 4) {
        console.log(time);
        console.log(new Date(time));
    }
    if (holidayArray.includes(time)) {
        klasse += ' feiertag';
    }


    html += '<td class="' + klasse + '">' + date.getDate() + '</td>';



    if (date.getDay() == 0) {
        html += '</tr>';
    }

    return html;

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
    var weekdaysGerman = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    return weekdaysGerman[weekdayIndex];
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

function getCalendarweek(date) {
    var currentThursday = new Date(date.getTime() + (3 - ((date.getDay() + 6) % 7)) * 86400000);
    var yearOfThursday = currentThursday.getFullYear();
    var firstThursday = new Date(new Date(yearOfThursday, 0, 4).getTime() + (3 - ((new Date(yearOfThursday, 0, 4).getDay() + 6) % 7)) * 86400000);
    var weekNumber = Math.floor(1 + 0.5 + (currentThursday.getTime() - firstThursday.getTime()) / 86400000 / 7);
    return weekNumber;
}


function getCalendarweekGerman(calendarweekDayIndex) {
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

function getWeekdayShortcut(date) {
    let weekday = getWeekdayGerman(date.getDay());
    weekday = weekday.substring(0, 2);
    weekday = weekday.toLowerCase();
    return weekday;
}

function getHolidayArrayHessen(date) {
    let year = date.getFullYear();
    let array = [];
    array.push(new Date(year - 1, 11, 25).getTime()); // 1. Weihnachtstag Vorjahr
    array.push(new Date(year - 1, 11, 26).getTime()); // 2. Weihnachtstag Vorjahr
    array.push(new Date(year, 0, 1).getTime()); // Neujahr
    array.push(new Date(year, 4, 1).getTime()); // Tag der Arbeit
    array.push(new Date(year, 9, 3).getTime()); // Tag der Dt. Einheit
    array.push(new Date(year, 11, 25).getTime()); // 1. Weihnachtstag
    array.push(new Date(year, 11, 26).getTime()); // 2. Weihnachtstag
    array.push(new Date(year + 1, 0, 1).getTime()); // Neujahr nächstes Jahr
    let osterSonntag = getEasterSunday(year);
    array.push(osterSonntag.getTime());
    let osterMontag = new Date(year, osterSonntag.getMonth(), osterSonntag.getDate() + 1);
    array.push(osterMontag.getTime());
    let christiHimmelfahrt = new Date(year, osterSonntag.getMonth(), osterSonntag.getDate() + 39);
    array.push(christiHimmelfahrt.getTime());
    let pfingstMontag = new Date(year, osterSonntag.getMonth(), osterSonntag.getDate() + 50);
    array.push(pfingstMontag.getTime());
    let fronLeichnam = new Date(year, osterSonntag.getMonth(), osterSonntag.getDate() + 60);
    array.push(fronLeichnam.getTime());
    return array;
}

function getEasterSunday(Jahr) { // Erstellt von Ralf Pfeifer (www.arstechnica.de)
    // Falls ausserhalb des gültigen Datumsbereichs, kein Ergebnis zurueckgeben
    if ((Jahr < 1970) || (2099 < Jahr)) return null;
    var a = Jahr % 19;
    var d = (19 * a + 24) % 30;
    var Tag = d + (2 * (Jahr % 4) + 4 * (Jahr % 7) + 6 * d + 5) % 7;
    if ((Tag == 35) || ((Tag == 34) && (d == 28) && (a > 10))) { Tag -= 7; }



    //OsterDatum.setTime(OsterDatum.getTime() + 86400000 * Tag);
    var OsterDatum = new Date(Jahr, 2, 22 + Tag);
    console.log(OsterDatum);
    return OsterDatum;

}
