"use client";

import { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Target, DollarSign, BrainCircuit } from "lucide-react";

interface StatItem {
    tagName: string;
    count: number;
    successRate: number;
}

interface Prediction {
    sampleSize: number;
    successProbability: number;
    medianRevenue: number;
    recommendation: string;
}

export default function Home() {
    const [stats, setStats] = useState<StatItem[]>([]);
    const [prediction, setPrediction] = useState<Prediction | null>(null);
    const [loading, setLoading] = useState(true);
    const [predicting, setPredicting] = useState(false);

    // Form state
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [price, setPrice] = useState("19.99");

    const commonTags = ["Action", "Adventure", "RPG", "Casual", "Strategy", "Indie", "Simulation", "Sports", "Racing", "FPS"];

    useEffect(() => {
        fetch("/api/stats")
            .then((res) => res.json())
            .then((data) => {
                setStats(data);
                setLoading(false);
            })
            .catch((err) => console.error(err));
    }, []);

    const handlePredict = async (e: React.FormEvent) => {
        e.preventDefault();
        setPredicting(true);
        try {
            const res = await fetch("/api/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tags: selectedTags, price }),
            });
            const data = await res.json();
            setPrediction(data);
        } catch (err) {
            console.error(err);
        } finally {
            setPredicting(false);
        }
    };

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    if (loading) return <div className="p-8 text-center">正在載入數據...</div>;

    return (
        <main className="min-h-screen bg-slate-950 text-slate-50 p-8 font-sans">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Header */}
                <header className="text-center space-y-4">
                    <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                        遊戲成功率分析器
                    </h1>
                    <p className="text-slate-400 text-lg">市場趨勢與 AI 驅動的成功率預測</p>
                </header>

                {/* Dashboard Section */}
                <section className="space-y-6">
                    <div className="flex items-center gap-2 text-2xl font-bold">
                        <TrendingUp className="text-cyan-400" />
                        <h2>各類別市場趨勢</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <Card className="bg-slate-900/50 border-slate-800 col-span-3">
                            <CardHeader>
                                <CardTitle className="text-slate-200">各類別遊戲成功機率 (前 10 名)</CardTitle>
                            </CardHeader>
                            <CardContent className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={stats}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                        <XAxis dataKey="tagName" stroke="#94a3b8" />
                                        <YAxis stroke="#94a3b8" tickFormatter={(val) => `${(val * 100).toFixed(0)}%`} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #1e293b" }}
                                            itemStyle={{ color: "#38bdf8" }}
                                            formatter={(val: any) => `${(Number(val || 0) * 100).toFixed(1)}%`}
                                        />
                                        <Bar dataKey="successRate" radius={[4, 4, 0, 0]}>
                                            {stats.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.successRate > 0.5 ? "#22c55e" : "#3b82f6"} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                        <div className="space-y-4">
                            <Card className="bg-slate-900/50 border-slate-800">
                                <CardContent className="p-6 flex flex-col items-center justify-center space-y-2">
                                    <Target className="w-8 h-8 text-cyan-400" />
                                    <span className="text-slate-400 text-sm">成功門檻 (營收)</span>
                                    <span className="text-2xl font-bold">$10,000+</span>
                                </CardContent>
                            </Card>
                            <Card className="bg-slate-900/50 border-slate-800">
                                <CardContent className="p-6 flex flex-col items-center justify-center space-y-2">
                                    <DollarSign className="w-8 h-8 text-green-400" />
                                    <span className="text-slate-400 text-sm">目標貨幣</span>
                                    <span className="text-2xl font-bold">USD</span>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Predictor Section */}
                <section className="space-y-6">
                    <div className="flex items-center gap-2 text-2xl font-bold">
                        <BrainCircuit className="text-purple-400" />
                        <h2>成功率預測器</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="bg-slate-900/50 border-slate-800 p-6">
                            <form onSubmit={handlePredict} className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-sm text-slate-400">選擇遊戲類別 (標籤)</label>
                                    <div className="flex flex-wrap gap-2">
                                        {commonTags.map(tag => (
                                            <button
                                                key={tag}
                                                type="button"
                                                onClick={() => toggleTag(tag)}
                                                className={`px-3 py-1 rounded-full text-sm transition-all ${selectedTags.includes(tag)
                                                    ? "bg-purple-600 text-white shadow-[0_0_10px_purple]"
                                                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                                                    }`}
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-slate-400">預定售價 (USD)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-md p-2 focus:ring-2 focus:ring-purple-500 outline-none"
                                    />
                                </div>
                                <button
                                    disabled={predicting}
                                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 p-3 rounded-md font-bold hover:opacity-90 transition-opacity"
                                >
                                    {predicting ? "正在分析市場..." : "計算成功機率"}
                                </button>
                            </form>
                        </Card>

                        <div className="h-full">
                            {prediction ? (
                                <div className="h-full flex flex-col justify-center space-y-6 animate-in fade-in slide-in-from-right duration-500">
                                    <div className="text-center space-y-2">
                                        <div className="text-6xl font-black text-white">
                                            {(prediction.successProbability * 100).toFixed(1)}%
                                        </div>
                                        <div className="text-sm text-slate-400 uppercase tracking-widest">預估成功機率</div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg text-center">
                                            <div className="text-xs text-slate-500">市場樣本數</div>
                                            <div className="text-xl font-bold">{prediction.sampleSize} 款遊戲</div>
                                        </div>
                                        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg text-center">
                                            <div className="text-xs text-slate-500">預估中位數營收</div>
                                            <div className="text-xl font-bold text-green-400">${prediction.medianRevenue.toLocaleString()}</div>
                                        </div>
                                    </div>

                                    <div className={`p-4 rounded-lg border text-center font-semibold ${prediction.successProbability > 0.5 ? "bg-green-500/10 border-green-500/50 text-green-400" : "bg-red-500/10 border-red-500/50 text-red-400"
                                        }`}>
                                        分析建議：{prediction.recommendation}
                                    </div>
                                </div>
                            ) : (
                                <div className="h-full flex items-center justify-center text-slate-500 italic border-2 border-dashed border-slate-800 rounded-lg">
                                    輸入參數並執行分析以查看預測
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
