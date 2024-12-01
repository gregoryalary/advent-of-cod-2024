import { promises as fs } from 'fs';

type Input = {
    first: number[];
    second: number[];
}

const getInput = async (): Promise<Input> =>
    (await fs.readFile("./day-1/input.txt", "utf8"))
        .split("\n")
        .map((line) => line.split("   ").map(Number))
        .reduce(
            (acc: Input, curr) => {
                acc.first.push(curr[0]);
                acc.second.push(curr[1]);
                return acc;
            },
            { first: [], second: [] }
        );

const sortInput = (input: Input): Input => ({
    first: input.first.sort((a, b) => a - b),
    second: input.second.sort((a, b) => a - b),
});

const computeDistanceScore = (input: Input): number => {
    const sortedInput = sortInput(input);
    const distances = [];
    for (let i = 0; i < sortedInput.first.length; i++) {
        distances.push(Math.abs(sortedInput.first[i] - sortedInput.second[i]));
    }
    return distances.reduce((acc, curr) => acc + curr, 0);
}

const computeSimilarityScore = (input: Input): number => {
    let similarityScore = 0;
    for (let i = 0; i < input.first.length; i++) {
        const appearsCountInSecond = input.second.filter(num => num === input.first[i]).length;
        similarityScore = similarityScore + appearsCountInSecond * input.first[i];
    }
    return similarityScore;
}

const main = async () => {
    const input = await getInput();

    console.log('Part 1:', computeDistanceScore(input));   // 2176849
    console.log('Part 2:', computeSimilarityScore(input)); // 23384288
}

main();