import { Stage } from "react-konva";
import RestaurantGraphic from "./RestaurantGraphic";

function MainStage() {
    const stageWidth = 1500;
    const stageHeight = 600;

    return (
        <div className="min-h-screen flex items-center justify-center overflow-auto">
            <div style={{ minWidth: stageWidth, minHeight: stageHeight }}>
                <Stage width={stageWidth} height={stageHeight}>
                    <RestaurantGraphic stageWidth={stageWidth} stageHeight={stageHeight} />
                </Stage>
            </div>
        </div>
);
}

export default MainStage;