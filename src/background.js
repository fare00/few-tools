let alarms = [];

chrome.storage.local.get(['alarms'], result => alarms = result.alarms || []);

chrome.storage.local.onChanged.addListener(({alarms: alms}) => alarms = alms?.newValue || []);

setInterval(async () => {
    for(let alarm of alarms) {
        if((new Date(alarm)).getTime() <= (new Date().getTime())) {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            if(!tab) return;

            chrome.tabs.sendMessage(tab.id, {event: `alarm`, time: alarm});
            
            const newAlarms = alarms.filter(a => a != alarm);

            chrome.storage.local.set({alarms: newAlarms});
        }
    }
}, 1000);