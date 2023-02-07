import * as Paper from "paper";
import { Point } from "paper/dist/paper-core";

type Point = { x: number, y: number };

const TOP_LEFT_RECT_INDEX = 1;
const TOP_RIGHT_RECT_INDEX = 2;
const BOTTOM_LEFT_RECT_INDEX = 0;
const BOTTOM_RIGHT_RECT_INDEX = 3;
const SPEED = 100;

const RECT_WIDTH = 100;
const RECT_MAIN_WIDTH = 200;
const RECT_HEIGHT = 200;
const RECT_MAIN_HEIGHT = 300;

window.onload = () => {
    const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('content');
    if (!canvas) {
        throw new Error('Could not find canvas named content in document!');
    }

    Paper.setup(canvas);

    const rect1 = drawRect(20, 20, RECT_MAIN_WIDTH, RECT_MAIN_HEIGHT);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    rect1.strokeColor = '#000000';

    const rect2 = drawRect(50, 50, RECT_WIDTH, RECT_HEIGHT);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    rect2.strokeColor = '#ff5555';

    const destination: Point = { x: rect2.position.x, y: rect2.position.y };
    addListeners(destination, rect1);

    // eslint-disable-next-line
    Paper.view.onFrame = (e: any) => {
        const center = rect2.position;
        if (center.x === destination.x && center.y === destination.y) {
            return;
        }
        const vector = { x: center.x - destination.x, y: center.y - destination.y };
        const width = Math.max(center.x, destination.x) - Math.min(center.x, destination.x);
        const height = Math.max(center.y, destination.y) - Math.min(center.y, destination.y);
        const vectorLen: number = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
        if (vectorLen < SPEED * e.delta) {
            rect2.position.x = destination.x
            rect2.position.y = destination.y
        } else {
            const speedVector = SPEED * e.delta;
            const destX = speedVector * width / vectorLen;
            const destY = speedVector * height / vectorLen;
            rect2.position.set({
                x: vector.x > 0 ? rect2.position.x - destX : rect2.position.x + destX,
                y: vector.y > 0 ? rect2.position.y - destY : rect2.position.y + destY,
            });
        }
    }
};

function addListeners(destination: Point, rect1: paper.Path.Rectangle) {
    document.getElementById("top-left").addEventListener("click", () => {
        const tergetPoint: paper.Point = rect1.segments[TOP_LEFT_RECT_INDEX].point;
        destination.x = tergetPoint.x + RECT_WIDTH / 2;
        destination.y = tergetPoint.y + RECT_HEIGHT / 2;
    })
    document.getElementById("top-right").addEventListener("click", () => {
        const tergetPoint: paper.Point = rect1.segments[TOP_RIGHT_RECT_INDEX].point;
        destination.x = tergetPoint.x - RECT_WIDTH / 2;
        destination.y = tergetPoint.y + RECT_HEIGHT / 2;
    })
    document.getElementById("bottom-left").addEventListener("click", () => {
        const tergetPoint: paper.Point = rect1.segments[BOTTOM_LEFT_RECT_INDEX].point;
        destination.x = tergetPoint.x + RECT_WIDTH / 2;
        destination.y = tergetPoint.y - RECT_HEIGHT / 2;
    })
    document.getElementById("bottom-right").addEventListener("click", () => {
        const tergetPoint: paper.Point = rect1.segments[BOTTOM_RIGHT_RECT_INDEX].point;
        destination.x = tergetPoint.x - RECT_WIDTH / 2;
        destination.y = tergetPoint.y - RECT_HEIGHT / 2;
    })
    document.getElementById("top").addEventListener("click", () => {
        toTop(rect1, destination);
    })
    document.getElementById("right").addEventListener("click", () => {
        toRight(rect1, destination);
    })
    document.getElementById("left").addEventListener("click", () => {
        toLeft(rect1, destination);
    })
    document.getElementById("bottom").addEventListener("click", () => {
        toBottom(rect1, destination);
    })
    document.getElementById("center").addEventListener("click", () => {
        const tergetPoint: paper.Point = rect1.segments[BOTTOM_RIGHT_RECT_INDEX].point;
        destination.x = tergetPoint.x - RECT_MAIN_WIDTH / 2;
        destination.y = tergetPoint.y - RECT_MAIN_HEIGHT / 2;
    })
    document.addEventListener("keydown", (ev: KeyboardEvent) => {
        console.log(ev);
        switch (ev.key) {
            case "ArrowUp": {
                toTop(rect1, destination);
            }
                break;
            case "ArrowDown": {
                toBottom(rect1, destination);
            }
                break;
            case "ArrowLeft": {
                toLeft(rect1, destination);
            }
                break;
            case "ArrowRight": {
                toRight(rect1, destination);
            }

        }
    })
}

function toTop(rect1: paper.Path.Rectangle, destination: Point) {
    const tergetPoint: paper.Point = rect1.segments[TOP_LEFT_RECT_INDEX].point;
    destination.x = tergetPoint.x + RECT_MAIN_WIDTH / 2;
    destination.y = tergetPoint.y + RECT_HEIGHT / 2;
}

function toBottom(rect1: paper.Path.Rectangle, destination: Point) {
    const tergetPoint: paper.Point = rect1.segments[BOTTOM_RIGHT_RECT_INDEX].point;
    destination.x = tergetPoint.x - RECT_MAIN_WIDTH / 2;
    destination.y = tergetPoint.y - RECT_HEIGHT / 2;
}

function toLeft(rect1: paper.Path.Rectangle, destination: Point) {
    const tergetPoint: paper.Point = rect1.segments[BOTTOM_LEFT_RECT_INDEX].point;
    destination.x = tergetPoint.x + RECT_WIDTH / 2;
    destination.y = tergetPoint.y - RECT_MAIN_HEIGHT / 2;
}

function toRight(rect1: paper.Path.Rectangle, destination: Point) {
    const tergetPoint: paper.Point = rect1.segments[TOP_RIGHT_RECT_INDEX].point;
    destination.x = tergetPoint.x - RECT_WIDTH / 2;
    destination.y = tergetPoint.y + RECT_MAIN_HEIGHT / 2;
}

function drawRect(x: number, y: number, width: number, height: number): paper.Path.Rectangle {
    const topLeft: paper.Point = new Paper.Point(x, y);
    const rectSize: paper.Size = new Paper.Size(width, height);
    const rect: paper.Rectangle = new Paper.Rectangle(topLeft, rectSize);
    return new Paper.Path.Rectangle(rect);

}
