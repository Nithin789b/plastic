import React, { useState } from 'react';
import { Waves, Users, Droplets, RotateCcw, Trophy, Sparkles, CheckCircle, Award } from 'lucide-react';

const PlasticAwarenessPuzzle = () => {
  const allPieces = [
    { id: 1, emoji: '🧑', category: 'Human Impact', message: 'Humans consume microplastics daily' },
    { id: 2, emoji: '⚠️', category: 'Human Impact', message: 'Microplastics found in our blood' },
    { id: 3, emoji: '🐢', category: 'Marine Life', message: 'Sea turtles mistake plastic for food' },
    { id: 4, emoji: '🌊', category: 'Marine Life', message: 'Oceans filled with plastic waste' },
    { id: 5, emoji: '🦌', category: 'Land Animals', message: 'Wildlife trapped in plastic debris' },
    { id: 6, emoji: '🛍️', category: 'Land Animals', message: 'Animals eat plastic bags' },
    { id: 7, emoji: '💧', category: 'Water Systems', message: 'Plastic pollutes drinking water' },
    { id: 8, emoji: '♻️', category: 'Water Systems', message: 'Recycling helps protect water' }
  ];

  const categories = [
    { name: 'Human Impact', icon: Users, color: 'bg-red-100 border-red-300', ids: [1, 2] },
    { name: 'Marine Life', icon: Waves, color: 'bg-blue-100 border-blue-300', ids: [3, 4] },
    { name: 'Land Animals', icon: Droplets, color: 'bg-green-100 border-green-300', ids: [5, 6] },
    { name: 'Water Systems', icon: Droplets, color: 'bg-cyan-100 border-cyan-300', ids: [7, 8] }
  ];

  const [draggedPiece, setDraggedPiece] = useState(null);
  const [grid, setGrid] = useState(Array(8).fill(null));
  const [availablePieces, setAvailablePieces] = useState(() => 
    [...allPieces].sort(() => Math.random() - 0.5)
  );
  const [submitted, setSubmitted] = useState(false);
  const [completedCategories, setCompletedCategories] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleDragStart = (e, piece, fromGrid = false, gridIndex = null) => {
    setDraggedPiece({ piece, fromGrid, gridIndex });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropOnGrid = (e, targetIndex) => {
    e.preventDefault();
    if (!draggedPiece || submitted) return;

    const newGrid = [...grid];
    const newAvailable = [...availablePieces];

    if (draggedPiece.fromGrid) {
      newGrid[targetIndex] = newGrid[draggedPiece.gridIndex];
      newGrid[draggedPiece.gridIndex] = null;
    } else {
      if (newGrid[targetIndex]) {
        newAvailable.push(newGrid[targetIndex]);
      }
      newGrid[targetIndex] = draggedPiece.piece;
      const pieceIndex = newAvailable.findIndex(p => p.id === draggedPiece.piece.id);
      newAvailable.splice(pieceIndex, 1);
    }

    setGrid(newGrid);
    setAvailablePieces(newAvailable);
    setDraggedPiece(null);
  };

  const handleDropOnAvailable = (e) => {
    e.preventDefault();
    if (!draggedPiece || !draggedPiece.fromGrid || submitted) return;

    const newGrid = [...grid];
    const newAvailable = [...availablePieces];

    newAvailable.push(newGrid[draggedPiece.gridIndex]);
    newGrid[draggedPiece.gridIndex] = null;

    setGrid(newGrid);
    setAvailablePieces(newAvailable);
    setDraggedPiece(null);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const completed = [];
    
    categories.forEach((cat, catIndex) => {
      const startIdx = catIndex * 2;
      const piece1 = grid[startIdx];
      const piece2 = grid[startIdx + 1];
      
      if (piece1 && piece2 && 
          cat.ids.includes(piece1.id) && 
          cat.ids.includes(piece2.id)) {
        completed.push(cat.name);
      }
    });

    setCompletedCategories(completed);
    
    setTimeout(() => {
      setShowCelebration(true);
    }, 500);
  };

  const resetPuzzle = () => {
    setGrid(Array(8).fill(null));
    setAvailablePieces([...allPieces].sort(() => Math.random() - 0.5));
    setCompletedCategories([]);
    setShowCelebration(false);
    setSubmitted(false);
  };

  const isCategoryComplete = (catIndex) => {
    if (!submitted) return false;
    const category = categories[catIndex];
    return completedCategories.includes(category.name);
  };

  const isCategoryWrong = (catIndex) => {
    if (!submitted) return false;
    const category = categories[catIndex];
    const startIdx = catIndex * 2;
    const piece1 = grid[startIdx];
    const piece2 = grid[startIdx + 1];
    
    return piece1 && piece2 && !completedCategories.includes(category.name);
  };

  const allGridsFilled = grid.every(slot => slot !== null);

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 p-3 rounded-2xl shadow-lg">
              <Waves className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
              Plastic Awareness Puzzle
            </h1>
          </div>
          <p className="text-lg text-gray-600 mb-4">Drag and match pieces to their correct categories</p>
          
          {/* Progress */}
          <div className="inline-flex items-center gap-2 bg-yellow-50 px-6 py-3 rounded-full border-2 border-yellow-300">
            <Trophy className="w-5 h-5 text-yellow-600" />
            <span className="text-lg font-bold text-gray-800">
              {completedCategories.length} / 4 Categories Complete
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Available Pieces */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-3xl shadow-md p-6 border-2 border-gray-200 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  Pieces
                </h2>
                <span className="text-sky-500 font-semibold">{availablePieces.length}</span>
              </div>
              
              <div
                onDragOver={handleDragOver}
                onDrop={handleDropOnAvailable}
                className="grid grid-cols-2 gap-3 min-h-[300px] p-4 bg-white rounded-2xl border-2 border-dashed border-gray-300"
              >
                {availablePieces.map((piece) => (
                  <div
                    key={`available-${piece.id}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, piece, false)}
                    className="bg-gradient-to-br from-sky-100 to-sky-200 aspect-square rounded-2xl cursor-move hover:scale-105 transition-all shadow-md flex items-center justify-center text-5xl border-3 border-sky-300"
                  >
                    {piece.emoji}
                  </div>
                ))}
              </div>

              <button
                onClick={resetPuzzle}
                className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all border-2 border-gray-300"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>

              {allGridsFilled && !submitted && (
                <button
                  onClick={handleSubmit}
                  className="w-full mt-3 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md animate-bounce"
                >
                  <CheckCircle className="w-5 h-5" />
                  Submit Answer
                </button>
              )}

              <div className="mt-2 text-xs text-gray-500 text-center">
                Filled: {grid.filter(slot => slot !== null).length} / 8
              </div>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((category, catIndex) => {
                const Icon = category.icon;
                const isComplete = isCategoryComplete(catIndex);
                const startIdx = catIndex * 2;

                return (
                  <div
                    key={category.name}
                    className={`rounded-3xl shadow-md p-6 border-2 transition-all ${
                      isComplete 
                        ? 'bg-emerald-50 border-emerald-400' 
                        : isCategoryWrong(catIndex)
                        ? 'bg-red-50 border-red-400'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-xl ${
                          isComplete ? 'bg-emerald-200' : 'bg-gray-200'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            isComplete ? 'text-emerald-700' : 'text-gray-600'
                          }`} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800">{category.name}</h3>
                      </div>
                      {isComplete && (
                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                      )}
                      {isCategoryWrong(catIndex) && (
                        <div className="flex items-center gap-1 text-red-600 text-sm font-semibold">
                          ✗ Wrong
                        </div>
                      )}
                    </div>

                    {/* 2 Slots */}
                    <div className="grid grid-cols-2 gap-3">
                      {[0, 1].map((offset) => {
                        const index = startIdx + offset;
                        const piece = grid[index];
                        
                        return (
                          <div
                            key={`grid-${index}`}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDropOnGrid(e, index)}
                            className={`aspect-square rounded-2xl border-4 flex items-center justify-center text-6xl transition-all ${
                              piece
                                ? `${category.color} shadow-lg`
                                : 'bg-white border-dashed border-gray-300 hover:border-sky-400 hover:bg-sky-50'
                            }`}
                          >
                            {piece ? (
                              <div
                                draggable
                                onDragStart={(e) => handleDragStart(e, piece, true, index)}
                                className="cursor-move w-full h-full flex items-center justify-center"
                                title={piece.message}
                              >
                                {piece.emoji}
                              </div>
                            ) : (
                              <div className="text-gray-300 text-3xl font-bold">{offset + 1}</div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {isComplete && grid[startIdx] && (
                      <div className="mt-4 p-3 bg-white rounded-xl border-2 border-emerald-300">
                        <p className="text-sm text-gray-700 text-center">
                          ✓ {grid[startIdx].message}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Celebration */}
            {showCelebration && (
              <div className="mt-6 bg-gradient-to-r from-emerald-100 to-sky-100 rounded-3xl shadow-lg p-8 text-center border-2 border-emerald-400 animate-pulse">
                <Award className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-4xl font-bold text-gray-800 mb-3">
                  {completedCategories.length === 4 ? '🎉 Perfect Score!' : '🌟 Great Effort!'}
                </h2>
                <div className="mb-6">
                  <div className="inline-flex items-center gap-3 bg-white px-8 py-4 rounded-full shadow-md">
                    <Trophy className="w-8 h-8 text-yellow-500" />
                    <span className="text-3xl font-bold text-gray-800">
                      {completedCategories.length} / 4
                    </span>
                  </div>
                </div>
                <p className="text-xl text-gray-700 mb-2">
                  {completedCategories.length === 4 
                    ? 'Amazing! You matched all categories correctly!' 
                    : `You got ${completedCategories.length} ${completedCategories.length === 1 ? 'category' : 'categories'} right!`}
                </p>
                <p className="text-gray-600 mb-6">
                  Together, we can reduce plastic waste and protect our planet 🌍
                </p>
                <button
                  onClick={resetPuzzle}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-md inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Try Again
                </button>
              </div>
            )}

            {!showCelebration && (
              <div className="mt-6 p-4 bg-yellow-50 rounded-2xl text-center border-2 border-yellow-200">
                <p className="text-sm text-gray-700">
                  {allGridsFilled && !submitted 
                    ? '✨ All pieces placed! Click Submit Answer to check your results'
                    : '💡 Drag and match both pieces in each category, then submit'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlasticAwarenessPuzzle;