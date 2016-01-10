import colors from './colors';

export default function *cycleColor() {
    let currentIndex = 0;
    while (true) {
        if (currentIndex >= colors.length) currentIndex = 0;
        yield colors[currentIndex++];
    }
}
