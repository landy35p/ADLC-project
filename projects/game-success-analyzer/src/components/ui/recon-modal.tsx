"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Activity, Cpu, Wrench } from "lucide-react";
import { BlueOceanRecipe } from "@/lib/analyst";

interface ReconModalProps {
    isOpen: boolean;
    onClose: () => void;
    recipes: BlueOceanRecipe[];
    loading: boolean;
}

const ComplexityBadge = ({ type, score }: { type: string; score: number }) => {
    let color = "bg-green-500/20 text-green-400 border-green-500/30";
    let label = "低";

    if (score >= 8) {
        color = "bg-red-500/20 text-red-400 border-red-500/30";
        label = "高";
    } else if (score >= 4) {
        color = "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
        label = "中";
    }

    const icons = {
        art: <Activity className="w-3 h-3 mr-1" />,
        dev: <Cpu className="w-3 h-3 mr-1" />,
        ops: <Wrench className="w-3 h-3 mr-1" />,
    };

    return (
        <div className={`flex items-center px-2 py-1 rounded-md border text-xs font-semibold ${color}`}>
            {icons[type as keyof typeof icons]}
            {type.toUpperCase()}: {label}
        </div>
    );
};

export function ReconModal({ isOpen, onClose, recipes, loading }: ReconModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700 shadow-2xl rounded-2xl p-6 md:p-8"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-3 bg-indigo-500/20 rounded-xl">
                                    <Search className="w-8 h-8 text-indigo-400" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-extrabold text-white">市場藍海偵察報告</h2>
                                    <p className="text-slate-400">專為獨立開發者計算的「低成本、高回報」策略配方 (Top 3)</p>
                                </div>
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                >
                                    <Search className="w-12 h-12 text-indigo-500 opacity-50" />
                                </motion.div>
                                <p className="text-lg text-slate-300 animate-pulse">正在深度分析 Steam 歷史數據...</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {recipes.map((recipe, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.15 }}
                                        className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-indigo-500/50 hover:bg-slate-800 transition-all group"
                                    >
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-lg shadow-[0_0_15px_rgba(79,70,229,0.5)]">
                                                        {index + 1}
                                                    </span>
                                                    <h3 className="text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                                                        {recipe.title}
                                                    </h3>
                                                </div>
                                                <div className="flex flex-wrap gap-2 mt-3 pl-11">
                                                    {recipe.tags.map(tag => (
                                                        <span key={tag} className="px-3 py-1 bg-slate-700 text-slate-300 text-xs font-medium rounded-full">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="text-right pb-2 md:pb-0 pl-11 md:pl-0 w-full md:w-auto">
                                                <div className="text-sm text-slate-400 mb-1">預估中位數營收</div>
                                                <div className="text-3xl font-black text-green-400">
                                                    ${recipe.revenueEst.toLocaleString()}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pl-11 grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="md:col-span-1 space-y-3">
                                                <div className="text-sm text-slate-400 mb-2">資源成本評估 (Complexity)</div>
                                                <div className="flex flex-col gap-2">
                                                    <ComplexityBadge type="art" score={recipe.complexity.art} />
                                                    <ComplexityBadge type="dev" score={recipe.complexity.dev} />
                                                    <ComplexityBadge type="ops" score={recipe.complexity.ops} />
                                                </div>
                                            </div>
                                            <div className="md:col-span-2 space-y-4">
                                                <div className="bg-indigo-950/20 border border-indigo-900/50 p-4 rounded-lg">
                                                    <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">💡 分析師策略短評</div>
                                                    <p className="text-slate-300 text-sm leading-relaxed">
                                                        {recipe.analysis}
                                                    </p>
                                                </div>
                                                <div className="bg-red-950/20 border border-red-900/50 p-4 rounded-lg flex gap-3">
                                                    <div className="text-red-400 pt-0.5">⚠️</div>
                                                    <div>
                                                        <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1">風險提示</div>
                                                        <p className="text-slate-300 text-sm">
                                                            {recipe.risk}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}

                                {recipes.length === 0 && (
                                    <div className="text-center py-12 text-slate-400">
                                        目前無法在資料庫中找到符合藍海條件的配方。<br />請嘗試新增更多不同類型的遊戲數據。
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
