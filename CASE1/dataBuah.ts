type IFruit = {
    fruitId: number,
    fruitName: string,
    fruitType: 'IMPORT' | 'LOCAL',
    stock: number
}

const fruits: IFruit[] = [
    {
        fruitId: 1,
        fruitName: 'Apel',
        fruitType: 'IMPORT',
        stock: 10
    },
    {
        fruitId: 2,
        fruitName: 'Kurma',
        fruitType: 'IMPORT',
        stock: 20
    },
    {
        fruitId: 3,
        fruitName: 'apel',
        fruitType: 'IMPORT',
        stock: 50
    },
    {
        fruitId: 4,
        fruitName: 'Manggis',
        fruitType: 'LOCAL',
        stock: 100
    },
    {
        fruitId: 5,
        fruitName: 'Jeruk Bali',
        fruitType: 'LOCAL',
        stock: 10
    },
    {
        fruitId: 5,
        fruitName: 'KURMA',
        fruitType: 'IMPORT',
        stock: 20
    },
    {
        fruitId: 5,
        fruitName: 'Salak',
        fruitType: 'LOCAL',
        stock: 150
    }
]

//NO 1
const getAllFruitNames: string[] = Array.from(
    new Set(fruits.map((fruit) => fruit.fruitName.toLowerCase()))
).map((name) => name.charAt(0).toUpperCase() + name.slice(1));

console.log("No 1 - Daftar buah Andi:", getAllFruitNames);

//NO 2
const fruitsByContainer = fruits.reduce((acc, fruit) => {
    const type = fruit.fruitType;
    const formattedName =
        fruit.fruitName.charAt(0).toUpperCase() +
        fruit.fruitName.slice(1).toLowerCase();

    if (!acc[type]) {
        acc[type] = new Set<string>();
    }
    acc[type].add(formattedName);
    return acc;
}, {} as Record<string, Set<string>>);
const containerTypes = Object.keys(fruitsByContainer);
console.log(`No 2 - Jumlah wadah yang dibutuhkan: ${containerTypes.length} wadah`);

for (const [type, fruitNames] of Object.entries(fruitsByContainer)) {
    console.log(`- Wadah ${type}: ${Array.from(fruitNames).join(", ")}`);
}

//NO 3
const totalStockByContainer = fruits.reduce((acc, fruit) => {
    const type = fruit.fruitType;
    if (!acc[type]) {
        acc[type] = 0;
    }
    acc[type] += fruit.stock;
    return acc;
}, {} as Record<string, number>);

console.log("No 3 - Total stock per wadah:", totalStockByContainer);