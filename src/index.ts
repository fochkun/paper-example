import * as Paper from "paper";

window.onload = () => {
    const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('content');
    if (!canvas) {
        throw new Error('Could not find canvas named content in document!');
    }

    Paper.setup(canvas);

    // Create a simple drawing tool:
    const tool: paper.Tool = new Paper.Tool();
    let path: paper.Path;

    // Define a mousedown and mousedrag handler
    tool.onMouseDown = (event: paper.Event) => {
        path = new Paper.Path();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        path.strokeColor = 'black';
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        path.add(event.point);
    }

    tool.onMouseDrag = (event: paper.Event) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        path.add(event.point);
    }
};
