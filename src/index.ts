import * as Paper from "paper";

type Point = {x: number, y: number};

// const TOP_LEFT_RECT_INDEX = 1;
// const TOP_RIGHT_RECT_INDEX = 0;
// const BOTTOM_LEFT_RECT_INDEX = 2;
// const BOTTOM_RIGHT_RECT_INDEX = 3;
const SPEED = 10;

const RECT_WIDTH = 100;
const RECT_HEIGHT = 200;

window.onload = () => {
    const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('content');
    if (!canvas) {
        throw new Error('Could not find canvas named content in document!');
    }

    Paper.setup(canvas);

    const rect1 = drawRect(20, 20, 200, 300);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    rect1.strokeColor = '#000000';
    
    const rect2 = drawRect(50, 50, RECT_WIDTH, RECT_HEIGHT);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    rect2.strokeColor = '#ff5555';

    const destination: Point = {x:10,y:10}

    // eslint-disable-next-line
    Paper.view.onFrame = (e: any) => {
        if (rect2.position.x === destination.x && rect2.position.y === destination.y) {
            return;
        }
        const center = rect2.position;
        const vector = {x: center.x - destination.x, y: center.y - destination.y};
        const width = Math.max(center.x, vector.x) - Math.min(center.x, vector.x);
        const height = Math.max(center.y, vector.y) - Math.min(center.y, vector.y);
        const vectorLen: number = Math.sqrt(Math.pow(width,2)+Math.pow(height,2));
        console.log("vectorLen", vectorLen, rect2.position.x, rect2.position.y);
        if (vectorLen<SPEED) {
            rect2.position.x=destination.x
            rect2.position.y= destination.y
        } else {
            console.log("e.delta",e.delta);
            const speedVector = SPEED * e.delta;
            const destX = speedVector * width / vectorLen;
            const destY = speedVector * height / vectorLen;
            rect2.position.set({x:rect2.position.x - destX, y: rect2.position.y - destY});
        }
        // SPEED / e.delta.x;
        // rect2.position.x=rect2.position.x - vector.x/30;
        // rect2.position.y= rect2.position.y - vector.y/30;
    }

    console.log("rect1", rect1);
    console.log("rect2", rect2);
};

function drawRect(x: number, y: number, width: number, height: number): paper.Path.Rectangle {
    console.log("drawRect");
    const topLeft: paper.Point = new Paper.Point(x, y);
    const rectSize: paper.Size = new Paper.Size(width, height);
    const rect: paper.Rectangle = new Paper.Rectangle(topLeft, rectSize);
    return new Paper.Path.Rectangle(rect);

}

// function getCenter(rect:paper.Path.Rectangle): Point {
//     return {
//         x: rect.segments[TOP_RIGHT_RECT_INDEX].point.x - rect.segments[TOP_LEFT_RECT_INDEX].point.x,
//         y: rect.segments[TOP_RIGHT_RECT_INDEX].point.y - rect.segments[BOTTOM_RIGHT_RECT_INDEX].point.y,
//     }
// }
