class Draw { // Draw function
    constructor(selector, width, height) { // Constructor function for canvas
        this.element = document.querySelector(selector);
        this.canvas = this.element.getContext('2d');
        this.element.width = width;
        this.element.height = height;
        this.timeId = null;
        this.animateArr = [];
    }
    init() { // init function for canvas
        // Variable declarations
        const {canvas:c, element: el} = this;
        let isDrag = false;
        c.lineWidth = 2;
        c.lineJoin = 'round';
        c.shadowColor = '#000';
        c.shadowBlur = 4;

        el.onmousedown = () => { // Mouse down
            isDrag = true;
            c.beginPath();
        }

        el.onmousemove = (e) => { // Mouse move
            if (isDrag) { // If mouse is down
                const x = e.pageX - el.offsetLeft;
                const y = e.pageY - el.offsetTop;
                c.lineTo(x, y);
                c.stroke();
                this.animateArr.push([x, y]);
            }
        }

        el.onmouseup = () => { // Mouse up
            isDrag = false;
            this.animateArr.push(-1);
        }

        el.onmouseout = () => { // Mouse out
            el.onmouseup();
        }
    }

    animateGo() { // Animation function
        const {canvas:c} = this; // Canvas
        this.clear(); // Clear canvas 
        c.beginPath(); // Start path

        const loop = (animate, i) => { // Loop through the array
            if (i < animate.length - 1) {
                const arr = animate[i];
                if (arr === -1) { // If the array is -1, then it is a new line
                    c.beginPath();
                } else { // If the array is not -1, then it is a point
                    c.lineTo(arr[0], arr[1]);
                    c.stroke();
                }

                i++; // Increment i

                this.timeId = setTimeout(() => { // Set timeout
                    loop(animate, i);
                } ,10);
            }
        }

        loop(this.animateArr, 0); // Loop through the array
    }

    clear() { // Clear canvas
        const {canvas:c} = this;
        const {width, height} = this.element;
        c.clearRect(0, 0, width, height);
    }
}

const g = new Draw('#cvs', 600, 500); // Create new Draw object
g.init(); // Record button

document.getElementById('btn1').onclick = () => { // Record button
    g.animateGo();
}

document.getElementById('btn2').onclick = () => { // Clear button
    g.clear();
    g.animateArr = [];
}