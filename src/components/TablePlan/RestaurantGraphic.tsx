import { Layer, Line, Rect, Text } from 'react-konva';

type RestaurantGraphicProps = {
  stageWidth: number;
  stageHeight: number;
};

function RestaurantGraphic({ stageWidth, stageHeight }: RestaurantGraphicProps) {
  const scale = 1.12;

  const roomWidth = 600 * scale;
  const roomHeight = 600 * scale;
  const roomX = (stageWidth - roomWidth) / 2;
  const roomY = (stageHeight - roomHeight) / 2;

  const s = (value: number) => value * scale;

  return (
    <Layer>
        <Rect x={0} y={0} width={stageWidth} height={stageHeight} fill="#8d9399" />

        <Rect
          x={roomX}
          y={roomY}
          width={roomWidth}
          height={roomHeight}
          fill="#f4efe6"
          stroke="#5a667e"
          strokeWidth={s(2)}
          cornerRadius={s(10)}
          shadowColor="#000"
          shadowBlur={s(8)}
          shadowOpacity={0.40}
          shadowOffsetY={s(2)}
        />

        {/* Car Road */}
        <Rect x={s(1000)} y={0} width={250} height={stageHeight} fill="#4b5563" />
        <Line points={[s(1110), 0, s(1110), stageHeight]} stroke="#e9a528" strokeWidth={s(3)} dash={[s(50), s(40)]} />
        <Text text="Kala tn" x={s(1030)} y={s(550)} fontSize={s(25)} fill="#f4efe6" rotation={90}/>

        {/* Walls of the restaurant */}
        <Line points={[roomX, roomY, roomX + roomWidth, roomY]} stroke="#1f2937" strokeWidth={s(3)} lineCap="round" />
        <Line points={[roomX, roomY + roomHeight, roomX + roomWidth, roomY + roomHeight]} stroke="#1f2937" strokeWidth={s(3)} lineCap="round" />
        <Line points={[roomX, roomY, roomX, roomY + roomHeight]} stroke="#1f2937" strokeWidth={s(3)} lineCap="round" />
        <Line points={[roomX + roomWidth, roomY, roomX + roomWidth, roomY + s(535)]} stroke="#1f2937" strokeWidth={s(3)} lineCap="round" />

        {/* Exit */}
        <Line
          points={[roomX + roomWidth, roomY + s(535), roomX + roomWidth, roomY + roomHeight]}
          stroke="#1f2937"
          strokeWidth={s(2)}
          dash={[s(8), s(4)]}
        />
        <Line points={[roomX + roomWidth, roomY + s(535), roomX + roomWidth - s(59), roomY + s(555)]} stroke="#1f2937" strokeWidth={s(2)} />
        <Text text="Exit" x={roomX + roomWidth - s(45)} y={roomY + s(565)} fontSize={s(16)} fill="#1f2937" />

        {/* Windows */}
        <Line points={[roomX, roomY + s(20), roomX, roomY + s(300)]} stroke="#7dd3fc" strokeWidth={s(5)} />
        <Line points={[roomX + roomWidth, roomY + s(20), roomX + roomWidth, roomY + s(300)]} stroke="#7dd3fc" strokeWidth={s(5)} />

        {/* Play area */}
        <Rect x={roomX + s(115)} y={roomY + s(10)} width={s(100)} height={s(80)} fill="#c4b5fd" opacity={0.75} cornerRadius={s(8)} stroke="#312e81" strokeWidth={s(1.5)} />
        <Text text="Play Area" x={roomX + s(130)} y={roomY + s(40)} fontSize={s(16)} fill="#312e81" />

        {/* Counter */}
        <Rect x={roomX + s(20)} y={roomY + roomHeight - s(55)} width={s(200)} height={s(50)} fill="#d1d5db" cornerRadius={s(7)} stroke="#4b5563" strokeWidth={s(1.5)} />
        <Text text="Counter" x={roomX + s(90)} y={roomY + roomHeight - s(39)} fontSize={s(18)} fill="#1f2937" />
    </Layer>
  );
}

export default RestaurantGraphic;