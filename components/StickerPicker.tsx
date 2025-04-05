import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Sticker {
  id: string;
  name: string;
  image: string;
  price?: number;
  isPremium: boolean;
}

const stickers: Sticker[] = [
  { id: 'heart', name: 'Heart', image: '❤️', isPremium: false },
  { id: 'smile', name: 'Smile', image: '😊', isPremium: false },
  { id: 'rose', name: 'Rose', image: '🌹', price: 1.99, isPremium: true },
  { id: 'kiss', name: 'Kiss', image: '💋', price: 2.99, isPremium: true },
  { id: 'ring', name: 'Ring', image: '💍', price: 4.99, isPremium: true },
  { id: 'chocolate', name: 'Chocolate', image: '🍫', price: 1.99, isPremium: true },
];

interface StickerPickerProps {
  onSelect: (sticker: Sticker) => void;
}

const StickerPicker: React.FC<StickerPickerProps> = ({ onSelect }) => {
  const [selectedSticker, setSelectedSticker] = useState<Sticker | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  const handleStickerClick = (sticker: Sticker) => {
    if (sticker.isPremium) {
      setSelectedSticker(sticker);
      setShowPaymentDialog(true);
    } else {
      onSelect(sticker);
    }
  };

  const handlePurchase = () => {
    if (selectedSticker) {
      onSelect(selectedSticker);
      setShowPaymentDialog(false);
      setSelectedSticker(null);
    }
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-4 gap-4">
        {stickers.map((sticker) => (
          <Card
            key={sticker.id}
            className={`p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors ${
              sticker.isPremium ? 'border-dating-purple' : ''
            }`}
            onClick={() => handleStickerClick(sticker)}
          >
            <span className="text-4xl mb-2">{sticker.image}</span>
            <span className="text-sm">{sticker.name}</span>
            {sticker.isPremium && (
              <span className="text-xs text-dating-purple mt-1">${sticker.price}</span>
            )}
          </Card>
        ))}
      </div>

      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Purchase Sticker</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-4">
            <span className="text-6xl mb-4">{selectedSticker?.image}</span>
            <p className="text-lg font-semibold">{selectedSticker?.name}</p>
            <p className="text-2xl font-bold text-dating-purple mt-2">
              ${selectedSticker?.price}
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPaymentDialog(false)}
            >
              Cancel
            </Button>
            <Button
              className="mb-1 text bg-gradient-to-r from-dating-purple to-dating-pink"
              onClick={handlePurchase}
            >
              Purchase & Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StickerPicker; 