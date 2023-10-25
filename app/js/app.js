const submitButton = document.querySelector('.button');
const dayInput = document.querySelector('#day');
const dayLabel = document.querySelector('#day-label');
const dayError = document.querySelector('.error-days');
const monthInput = document.querySelector('#month');
const monthLabel = document.querySelector('#month-label');
const monthError = document.querySelector('.error-months');
const yearInput = document.querySelector('#year');
const yearLabel = document.querySelector('#year-label');
const yearError = document.querySelector('.error-years');
const yearResult = document.querySelector('#year-result');
const monthResult = document.querySelector('#month-result');
const dayResult = document.querySelector('#day-result');

let dayValid = false;
let monthValid = false;
let yearValid = false;

//* array of days in each month to prevent user entering incorrect date for each month
const calenderDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;
const currentDay = currentDate.getDate();

submitButton.addEventListener('click', (e) => {
	e.preventDefault();
	validateDays();
	validateMonths();
	validateYears();
	calcAge();
});

dayInput.addEventListener('input', () => {
	dayInput.classList.remove('error-box');
	dayLabel.classList.remove('error-msg');
	dayError.classList.add('hidden');
});

monthInput.addEventListener('input', () => {
	monthInput.classList.remove('error-box');
	monthLabel.classList.remove('error-msg');
	monthError.classList.add('hidden');
});

yearInput.addEventListener('input', () => {
	yearInput.classList.remove('error-box');
	yearLabel.classList.remove('error-msg');
	yearError.classList.add('hidden');
});

validateDays = () => {
	const x = parseInt(monthInput.value) - 1;

	if (dayInput.value > calenderDays[x]) {
		throwError();
		dayError.classList.remove('hidden');
		dayError.innerText = `Must be a valid day`;
	} else if (dayInput.value == '') {
		throwError();
		dayError.classList.remove('hidden');
		dayError.innerText = `This field is required`;
	} else {
		dayValid = true;
	}
};

validateMonths = () => {
	if (monthInput.value == '') {
		throwError();
		monthError.classList.remove('hidden');
		monthError.innerText = `This field is required`;
	} else if (monthInput.value == 0 || monthInput.value > 12) {
		throwError();
		monthError.classList.remove('hidden');
		monthError.innerText = `Must be a valid month`;
	} else {
		monthValid = true;
	}
};

validateYears = () => {
	if (yearInput.value == '') {
		throwError();
		yearError.classList.remove('hidden');
		yearError.innerText = `This field is required`;
	} else if (yearInput.value.length > 4) {
		throwError();
		yearError.classList.remove('hidden');
		yearError.innerText = `Must be a valid year`;
	} else if (yearInput.value > currentYear) {
		throwError();
		yearError.classList.remove('hidden');
		yearError.innerText = `Must be in the past`;
	} else {
		yearValid = true;
	}
};

throwError = () => {
	yearInput.classList.add('error-box');
	yearLabel.classList.add('error-msg');
	monthInput.classList.add('error-box');
	monthLabel.classList.add('error-msg');
	dayInput.classList.add('error-box');
	dayLabel.classList.add('error-msg');
	dayValid = false;
	monthValid = false;
	yearValid = false;
};

clearAllInputs = () => {
	yearInput.classList.remove('error-box');
	yearLabel.classList.remove('error-msg');
	yearError.classList.add('hidden');
	monthInput.classList.remove('error-box');
	monthLabel.classList.remove('error-msg');
	monthError.classList.add('hidden');
	dayInput.classList.remove('error-box');
	dayLabel.classList.remove('error-msg');
	dayError.classList.add('hidden');
};

calcAge = () => {
	if (dayValid == false || monthValid == false || yearValid == false) {
		return;
	} else {
		let yearsOld = currentYear - yearInput.value;
		let monthsOld = currentMonth - parseInt(monthInput.value);
		let daysOld = currentDay - parseInt(dayInput.value);

		if (monthInput.value > currentMonth && monthInput.value < 12) {
			monthsOld = currentMonth + 1;
			yearsOld -= 1;
		}

		if (monthInput.value == 12) {
			monthsOld = currentMonth;
			yearsOld -= 1;
		}

		if (dayInput.value > currentDay) {
			const x = parseInt(monthInput.value) - 1;
			let dayDiff = dayInput.value - currentDay;
			daysOld = calenderDays[x] - dayDiff;

			if (monthInput.value == currentMonth) {
				yearsOld -= 1;
				monthsOld = currentMonth + 1;
			}

			if (monthInput.value > currentMonth && monthInput.value < 12) {
				monthsOld -= 1;
			}

			if (monthInput.value == 12) {
				monthsOld = currentMonth - 1;
			}

			if (monthInput.value < currentMonth) {
				monthsOld -= 1;
			}
		}

		yearResult.innerText = yearsOld;
		dayResult.innerText = daysOld;
		monthResult.innerText = monthsOld;
		clearAllInputs();
	}
};
