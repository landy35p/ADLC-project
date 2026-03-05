export interface GameData {
    title: string;
    priceUSD: number;
    estimatedOwners: number;
    revenue: number;
    tags: string[];
}

export interface IDataProvider {
    fetchData(): Promise<GameData[]>;
}
