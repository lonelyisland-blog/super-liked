import lottie from 'lottie-web'
import JSON from '../../content/assets/loading.json'

export default function initLottie(ele) {
    console.log(ele)
    lottie.loadAnimation({
        container: document.querySelector(ele), // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: JSON// the path to the animation json
    });
}