import  { memo } from "react";

interface GridProps {
    gridSize: number;
    gridColor: string;
}

const Grid = memo(({ gridSize, gridColor }: GridProps) => {
    return (
        <div
            className="absolute inset-0 grid pointer-events-none"
            style={{
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                gridTemplateRows: `repeat(${gridSize}, 1fr)`,
            }}
        >
            {Array.from({ length: gridSize * gridSize }).map((_, i) => (
                <div
                    key={i}
                    className="w-full h-full"
                    style={{
                        border: `0.5px solid ${gridColor}`,
                    }}
                />
            ))}
        </div>
    );
});

Grid.displayName = "Grid";

export default Grid;
