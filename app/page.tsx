"use client";

import { useState } from "react";

type CardSet = {
  id: number;
  title: string;
  cards: string[];
};

export default function HomePage() {
  const [view, setView] = useState<"home" | "study">("home");
  const [sets] = useState<CardSet[]>([
    {
      id: 1,
      title: "영단어",
      cards: ["apple", "banana", "orange"]
    },
    {
      id: 2,
      title: "한국사",
      cards: ["광개토대왕", "세종대왕", "임진왜란"]
    }
  ]);

  const [currentSet, setCurrentSet] = useState<CardSet | null>(null);
  const [cardIndex, setCardIndex] = useState(0);

  const startStudy = (set: CardSet) => {
    setCurrentSet(set);
    setCardIndex(0);
    setView("study");
  };

  const nextCard = () => {
    if (!currentSet) return;
    if (cardIndex < currentSet.cards.length - 1) {
      setCardIndex(cardIndex + 1);
    } else {
      setView("home");
    }
  };

  return (
    <main className="min-h-screen p-8">
      {view === "home" && (
        <>
          <h1 className="text-4xl font-bold mb-8">메모RE</h1>

          <div className="grid gap-4">
            {sets.map((set) => (
              <div
                key={set.id}
                className="p-4 rounded-xl shadow bg-white border"
              >
                <h2 className="text-2xl font-semibold">{set.title}</h2>
                <p>{set.cards.length}개 카드</p>

                <button
                  onClick={() => startStudy(set)}
                  className="mt-4 px-4 py-2 bg-black text-white rounded-lg"
                >
                  공부 시작
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {view === "study" && currentSet && (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-3xl font-bold mb-8">{currentSet.title}</h2>

          <div className="w-96 h-64 bg-white shadow rounded-2xl flex items-center justify-center text-2xl">
            {currentSet.cards[cardIndex]}
          </div>

          <button
            onClick={nextCard}
            className="mt-8 px-6 py-3 bg-black text-white rounded-xl"
          >
            다음
          </button>
        </div>
      )}
    </main>
  );
}
