import { Stage } from "react-konva";
import RestaurantGraphic from "./RestaurantGraphic";
import TableGraphic from "./TableGraphic";

function MainStage() {
    const stageWidth = 1400;
    const stageHeight = 800;

    return (
        <div className="min-h-screen flex items-center justify-center overflow-auto">
            <div style={{ minWidth: stageWidth, minHeight: stageHeight }}>
                <Stage width={stageWidth} height={stageHeight}>
                    <RestaurantGraphic stageWidth={stageWidth} stageHeight={stageHeight} />
                    <TableGraphic stageWidth={stageWidth} stageHeight={stageHeight} />
                </Stage>
            </div>
        </div>
);
}

export default MainStage;