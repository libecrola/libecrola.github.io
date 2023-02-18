// VARIABLES
let percentage = 0;
let animationComplete = false;

// CONSTANTS
const titleTopOffset = 323;

$(function () {
    let animation = new Animations();

    animation.animateTitle();
    animation.animateSubtitle();
    $("#menu-icon").click(() => {
        animation.openMenu();
    });
    $("#close").click(() => {
        animation.closeMenu();
    });
});

class Animations {
    constructor() {}

    openMenu() {
        document.getElementById("sider").style.transform = "translateX(0%)";
        document.getElementById("mid-line").style.transform = "rotate(90deg)";
        document.getElementById("bottom-line").style.transform =
            "translateX(100%)";
        document.getElementById("top-line").style.transform = "translateY(22%)";
        document.getElementById("menu-icon").style.transform =
            "rotate(-405deg)";
    }

    closeMenu() {
        document.getElementById("sider").style.transform = "translateX(150%)";
        document.getElementById("mid-line").style.transform = "rotate(0deg)";
        document.getElementById("bottom-line").style.transform =
            "translateX(0%)";
        document.getElementById("top-line").style.transform = "translateY(0%)";
        document.getElementById("menu-icon").style.transform = "rotate(0deg)";
    }

    animateTitle() {
        window.onscroll = () => {
            if (window.scrollY < titleTopOffset) {
                percentage = window.scrollY / titleTopOffset;
                animationComplete = false;
            } else {
                if (percentage == 1) {
                    animationComplete = true;
                } else {
                    percentage = 1;
                }
            }

            if (!animationComplete) {
                let spacingTop = (30.03 - 30.03 * percentage).toString() + "vh";
                let spacingLeft =
                    (23.86 - 23.86 * percentage).toString() + "vw";
                const fontHeight =
                    7 - 7 * percentage < 3.3 ? 3.3 : 7 - 7 * percentage;

                document.getElementById("main-name").style.top = spacingTop;
                document.getElementById("main-name").style.left = spacingLeft;
                document.getElementById("main-name").style.fontSize =
                    fontHeight.toString() + "vh";

                // console.log(Math.round(percentage * 100) + "%");
            }
        };
    }

    animateSubtitle() {
        let array = ["Web Developer", "IT Student", "Designer", "Programmer"];
        let charIndex = 0;
        let wordIndex = 1;
        let str = "";
        let word = array[0];
        let delay = 200;

        function printNextChar(element) {
            str += element.charAt(charIndex);
            charIndex++;
            //console.log(str + "----" + wordIndex + "----" + charIndex);
            $("#sub-title span:first").text(str);
        }

        function deleteChar(end) {
            str = str.substring(0, end);
            charIndex--;
            //console.log(str + "----" + wordIndex + "----" + charIndex);
            $("#sub-title span:first").text(str);
        }

        function loopForward() {
            setTimeout(() => {
                printNextChar(word);

                if (charIndex >= word.length && wordIndex < array.length) {
                    delay = 2000;
                    blink(400);
                    loopBack();
                } else if (
                    charIndex < word.length &&
                    wordIndex <= array.length
                ) {
                    delay = 200;
                    loopForward();
                } else {
                    wordIndex = 0;
                    loopForward();
                }
            }, delay);
        }

        function loopBack() {
            setTimeout(() => {
                deleteChar(charIndex - 1);

                if (charIndex == 0 && wordIndex < array.length) {
                    word = array[wordIndex];
                    wordIndex++;
                    delay = 2000;
                    blink(400);
                    loopForward();
                } else if (
                    charIndex <= word.length &&
                    wordIndex <= array.length
                ) {
                    delay = 100;
                    loopBack();
                } else {
                    loopBack();
                }
            }, delay);
        }

        let timesBlinked = 0;
        function blink(time) {
            setTimeout(() => {
                $("#sub-title span:last").toggle();

                timesBlinked++;
                if (timesBlinked * time < delay) {
                    blink(time);
                } else {
                    timesBlinked = 0;
                    $("#sub-title span:last").show();
                }
            }, time);
        }

        loopForward();
    }
}
