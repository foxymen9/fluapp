const monthNames = ["January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"
];

const shortMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
	"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];


export function DayOffset (offset) {
  var d = new Date();
  d.setDate(d.getDate() + offset);
	return d.getDate();

}

export function MonthOffset (offset) {
	var d = new Date();
	d.setMonth(d.getMonth() + offset);
  return monthNames[d.getMonth()];
}

export function DayAndMonthOffset (daysOffset) {
	var d = new Date();
	d.setDate(d.getDate() + daysOffset);
	return d.getDate() + ' ' + monthNames[d.getMonth()];
}

export function DayAndMonthRange (start, end) {
	var startDate = new Date();
	var endDate = new Date();

	startDate.setDate(startDate.getDate() + start);
	endDate.setDate(endDate.getDate() + end);

	var startMonth = shortMonthNames[startDate.getMonth()];
	var endMonth = shortMonthNames[endDate.getMonth()];

	if (startMonth !== endMonth) {
		return startMonth + ' ' + startDate.getDate() + ' to ' + endMonth + ' ' + endDate.getDate();
	}

	return startMonth + ' ' + startDate.getDate() + ' to ' + endDate.getDate();
}

export function ShortMonthOffset (offset) {
	var d = new Date();
	d.setMonth(d.getMonth() + offset);
	return shortMonthNames[d.getMonth()];
}

export function DayOffsetStr (offset, start) {
	var d = new Date();
	d.setMonth(d.getMonth() + offset);

	if(start == true) {
		d.setDate(1);
	}
	// Get last day of the month and set
	else {
		var lastDay = new Date(d.getYear(), d.getMonth() + 1, 0).getDate();
		d.setDate(lastDay);
	}

	return formatDate(d).toString();
}

export function commafy( num ) {
  let str = num.toString().split('.');
  if (str[0].length >= 5) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  }
  if (str[1] && str[1].length >= 5) {
    str[1] = str[1].replace(/(\d{3})/g, '$1 ');
  }
  return str.join('.');
}

export function calculateYearDiff(date) {
	let birthday = new Date(date);
	let today = new Date();
	let timeDiff = Math.abs(today.getTime() - birthday.getTime());
	let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
	let yearDiff = Math.ceil(diffDays / 365);
	return yearDiff;
}

function formatDate(date) {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [year, month, day].join('-');
}