import 'bulma/css/bulma.css'
import 'flatpickr/dist/flatpickr.css'
import flatpickr from 'flatpickr'

(async () => {
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    if(!tab) return;

    document.querySelector('#qr-code').src = `http://api.qrserver.com/v1/create-qr-code/?data=${tab.url}&size=300x300`;
})();

const tabs = document.querySelectorAll('.tabs li');
const boxs = document.querySelectorAll('.content .box');
const btns = document.querySelectorAll('#video-controls button');
const input = document.querySelector('input');
const alarms = document.querySelector('#alarms');
const setAlarm = document.querySelector('#set-alarm');
const clearTime = document.querySelector('#clear-time');
const deleteAlarms = document.querySelector('#delete-alarms');

const datePicker = flatpickr(input, {
    enableTime: true,
    time_24hr: true,
    minDate: 'today'
});

const addAlarm = (alarmTime, existing) => {
    if(alarms.querySelector('.block')) alarms.innerHTML = '';

    const div = document.createElement('div');
    div.className = 'card is-mobile p-2 is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center has-background-primary-light my-2';
    const timeDiv = document.createElement('div');
    timeDiv.className = 'is-size-7 is-two-thirds';
    timeDiv.innerText = alarmTime;
    const btn = document.createElement('button');
    btn.className = 'button has-background-danger has-text-white';
    btn.innerText = 'Delete';
    div.append(timeDiv, btn);

    btn.addEventListener('click', e => {
        div.remove();
        chrome.storage.local.get(['alarms'], (result) => {
            chrome.storage.local.set({'alarms': result.alarms.filter(alarm => alarm != alarmTime)});
        });
        if(!alarms.innerHTML) alarms.innerHTML = '<div class="block has-text-centered">There is no alarms</div>';
    });

    if(!existing) {
        chrome.storage.local.get(['alarms'], (result) => {
            chrome.storage.local.set({'alarms': result.alarms ? [...result.alarms, alarmTime] : [alarmTime]});
        });
    }

    alarms.append(div);
}

chrome.storage.local.get(['alarms'], (result) => {
    if(!result.alarms) return;

    for(let al of result.alarms) {
        addAlarm(al, true);
    }
});

tabs.forEach((tab, i) => {
    tab.addEventListener('click', (e) => {
        tabs.forEach(tab => tab.classList.remove('is-active'));
        tab.classList.add('is-active');

        boxs.forEach(box => box.classList.add('is-hidden'));
        boxs[i].classList.remove('is-hidden');
    });
});

btns.forEach(btn => {
    btn.addEventListener('click', async e => {
        const [tab] = await chrome.tabs.query({active: true, currentWindow: true});

        if(!tab) return;

        chrome.tabs.sendMessage(tab.id, {event: `${btn.dataset.event}_videos`});
    });
});

setAlarm.addEventListener('click', e => {
    const { selectedDates: [selectedDate] } = datePicker;

    chrome.storage.local.get(['alarms'], (result) => {
        if(selectedDate == undefined || selectedDate.getTime() <= (new Date).getTime() || result?.alarms?.includes(input.value)) return;

        addAlarm(input.value, false); 
    });
});

clearTime.addEventListener('click', e => datePicker.clear());
deleteAlarms.addEventListener('click', e => {
    alarms.innerHTML = '<div class="block has-text-centered">There is no alarms</div>';
    chrome.storage.local.remove('alarms');
});