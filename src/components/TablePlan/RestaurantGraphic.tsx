import { Layer, Rect } from 'react-konva';

type RestaurantGraphicProps = {
  stageWidth: number;
  stageHeight: number;
};

function RestaurantGraphic({ stageWidth, stageHeight }: RestaurantGraphicProps) {
  return (
    <Layer>
      <Rect x={0} y={0} width={stageWidth} height={stageHeight} fill="lightgray" />
    </Layer>
  );
}

export default RestaurantGraphic;