
export type Grid = Array<Array<boolean>>;

export function buildGrid(width: number, height: number): Grid {
    const result = [];
    for (let x = 0; x < width; x++) {
        let col = [];
        for (let y = 0; y < height; y++) {
            col.push(false);
        }
        result.push(col);
    }
    return result;
}
