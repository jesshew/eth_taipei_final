'use client'

import React from 'react'
import { Button } from '@/components/ui/button'

interface StickerPickerProps {
  onSelect: (sticker: { image: string }) => void
}

const stickers = [
  { image: '❤️' },
  { image: '😊' },
  { image: '🌟' },
  { image: '🎉' },
  { image: '🌈' },
  { image: '🦋' },
  { image: '🌺' },
  { image: '✨' },
  { image: '🎵' },
  { image: '🎨' },
  { image: '🌙' },
  { image: '☀️' },
  { image: '🌊' },
  { image: '🍀' },
  { image: '🎭' },
  { image: '🎪' },
]

const StickerPicker: React.FC<StickerPickerProps> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-4 gap-2 p-4 bg-white rounded-lg">
      {stickers.map((sticker, index) => (
        <Button
          key={index}
          variant="ghost"
          className="h-12 w-12 text-2xl hover:bg-gray-100"
          onClick={() => onSelect(sticker)}
        >
          {sticker.image}
        </Button>
      ))}
    </div>
  )
}

export default StickerPicker 