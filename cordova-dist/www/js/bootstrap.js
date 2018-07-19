
window.PLATFORM = 'android'

switch (window.PLATFORM) {
    case 'android':
        document.querySelector('html').className = 'md device-pixel-ratio-2 device-retina device-desktop support-position-sticky'
        break;
}

app()