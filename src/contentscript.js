let interacted = false;

const overlay = document.querySelector('div');

chrome.runtime.onMessage.addListener(({event, time}) => {
    const videosAudios = document.querySelectorAll('video,audio');
    switch(event) {
        case 'play_videos':
            videosAudios.forEach(va => {
                va.play();
            });
            break;
        case 'pause_videos':
            videosAudios.forEach(va => {
                va.pause();
            });
            break;
        case 'mute_videos':
            videosAudios.forEach(va => {
                va.muted = true;
            });
            break;
        case 'unmute_videos':
            videosAudios.forEach(va => {
                va.muted = false;
            });
            break;
        default:
            const alarm = document.createElement('audio');
            alarm.src = chrome.runtime.getURL('clock.mp3');
            const interval = setInterval(() => { alarm.play().catch(() => {}); }, 1000);
            alarm.addEventListener('play', () => clearInterval(interval));
            break;
    }
    return true;
});