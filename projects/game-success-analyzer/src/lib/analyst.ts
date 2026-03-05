import { Game, SUCCESS_THRESHOLD } from "./logic";

// 三維成本權重表定義
export const COMPLEXITY_WEIGHTS = {
    art: {
        // 視覺風格 - 低成本
        "Pixel Graphics": 1,
        "Minimalist": 1,
        "Text-Based": 1,
        "2D": 2,
        // 視覺風格 - 高成本
        "3D": 5,
        "Realistic": 10,
        "Cinematic": 8,
    },
    dev: {
        // 開發難度 - 低成本
        "Singleplayer": 1,
        // 開發難度 - 高成本
        "Multiplayer": 8,
        "MMO": 10,
        "Physics": 5,
        "VR": 8,
    },
    ops: {
        // 維運壓力 - 低成本 (高重玩價值、系統生成)
        "Roguelike": 1,
        "Procedural Generation": 1,
        "Sandbox": 2,
        // 維運壓力 - 高成本 (內容消耗快、需持續更新)
        "Story Rich": 8,
        "Linear": 5,
        "Live Service": 10,
    }
};

export interface ComplexityScore {
    art: number;
    dev: number;
    ops: number;
    total: number;
}

export interface BlueOceanRecipe {
    title: string;
    tags: string[];
    complexity: ComplexityScore;
    revenueEst: number;
    successProb: number;
    blueOceanScore: number;
    analysis: string;
    risk: string;
}

/**
 * 計算單一標籤的各項成本
 */
function getTagComplexity(tag: string) {
    const art = COMPLEXITY_WEIGHTS.art[tag as keyof typeof COMPLEXITY_WEIGHTS.art] || 0;
    const dev = COMPLEXITY_WEIGHTS.dev[tag as keyof typeof COMPLEXITY_WEIGHTS.dev] || 0;
    const ops = COMPLEXITY_WEIGHTS.ops[tag as keyof typeof COMPLEXITY_WEIGHTS.ops] || 0;
    return { art, dev, ops };
}

/**
 * 計算一組標籤的綜合成本 (三維成本係數)
 */
export function calculateComplexity(tags: string[]): ComplexityScore {
    let art = 0;
    let dev = 0;
    let ops = 0;

    tags.forEach(tag => {
        const score = getTagComplexity(tag);
        art = Math.max(art, score.art); // 取最高門檻
        dev = Math.max(dev, score.dev);
        ops = Math.max(ops, score.ops);
    });

    // 如果完全沒匹配到特殊標籤，給一個基礎值
    if (art === 0) art = 3;
    if (dev === 0) dev = 3;
    if (ops === 0) ops = 3;

    return { art, dev, ops, total: art + dev + ops };
}

/**
 * 分析具體標籤組合的藍海分數
 */
export function calculateBlueOceanScore(games: Game[], tags: string[]): BlueOceanRecipe | null {
    // 過濾出包含這些標籤的遊戲 (必須全包含)
    const matchingGames = games.filter(g => {
        const gameTags = g.tags.split(";").map(t => t.trim());
        return tags.every(t => gameTags.includes(t));
    });

    const N = matchingGames.length;
    // MVP 測試階段由於本地資料庫極小，我們將門檻降至 1 (真實環境建議至少 N > 10)
    if (N < 1) return null;

    const S = matchingGames.filter(g => g.revenue >= SUCCESS_THRESHOLD).length;
    const successProb = S / N;

    const revenues = matchingGames.map(g => g.revenue).sort((a, b) => a - b);
    const medianRevenue = revenues[Math.floor(revenues.length / 2)];

    const complexity = calculateComplexity(tags);

    // 藍海分數公式 = 預估中位數營收 / (總成本門檻 * 1000) * 成功機率加權
    // 乘以 successProb 以避免那些「極少數賺大錢但大多數死掉」的陷阱
    const blueOceanScore = (medianRevenue / (complexity.total * 1000)) * (0.5 + successProb);

    // 簡單的 AI 分析短評生成邏輯 (Rule-based for MVP)
    let analysis = "此組合具備穩定的市場需求。";
    if (complexity.total <= 8 && medianRevenue > 50000) {
        analysis = "極佳的切入點！開銷門檻低，但市場回報驚人，適合獨立小團隊。";
    } else if (successProb > 0.7) {
        analysis = "高勝率的溫床！只要能達到基礎品質，幾乎都能獲得利潤。";
    } else if (complexity.ops <= 2) {
        analysis = "高重玩價值的常青樹，開發完成後不需要龐大的內容更新壓力。";
    }

    let risk = "常規市場競爭風險。";
    if (complexity.art >= 8) risk = "美術資產要求極高，可能耗盡預算。";
    if (complexity.dev >= 8) risk = "技術實現難度大，容易導致專案難產。";
    if (N > 100) risk = "市場已相當擁擠，需要極強的差異化。";

    return {
        title: tags.join(" + ") + " 混搭藍海",
        tags,
        complexity,
        revenueEst: medianRevenue,
        successProb,
        blueOceanScore,
        analysis,
        risk
    };
}

/**
 * 遍歷資料庫找出 Top 3 藍海配方
 */
export function findTopBlueOceanRecipes(games: Game[]): BlueOceanRecipe[] {
    // 為了效能，我們預先定義一些「獨立開發者常見/感興趣」的兩兩組合進行掃描
    const popularTags = [
        "Action", "Adventure", "RPG", "Strategy", "Simulation", "Indie", "Casual",
        "Pixel Graphics", "2D", "Roguelike", "Survival", "Base Building", "Puzzle", "Story Rich"
    ];

    const recipes: BlueOceanRecipe[] = [];
    const scanned = new Set<string>();

    // 掃描兩兩組合
    for (let i = 0; i < popularTags.length; i++) {
        for (let j = i + 1; j < popularTags.length; j++) {
            const tags = [popularTags[i], popularTags[j]];
            const key = tags.join("-");
            if (scanned.has(key)) continue;
            scanned.add(key);

            const recipe = calculateBlueOceanScore(games, tags);
            if (recipe && recipe.successProb > 0) { // 過濾完全失敗的
                recipes.push(recipe);
            }
        }
    }

    // 依照藍海分數排序，取出前 3 名
    recipes.sort((a, b) => b.blueOceanScore - a.blueOceanScore);

    return recipes.slice(0, 3);
}
