"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Camera, ArrowLeft, PenToolIcon } from 'lucide-react';
import { NavigationLayout } from '@/components/NavigationLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { signAndVerifyMessage } from '@/lib/worldcoin';

// Using the same mock data from profile page
const userProfile = {
  name: 'Emily',
  age: 28,
  location: 'San Francisco, CA',
  bio: 'Free-spirited yogi and coffee connoisseur seeking a partner in crime to explore the citys hidden gems and beyond! 🧘‍♀️',
  photos: [
    'https://img.freepik.com/free-photo/beautiful-asian-girl-sitting-cafe-with-cup-coffee-drawing-digital-tablet-with-graphic-pen-d_1258-120146.jpg?t=st=1743866366~exp=1743869966~hmac=a96e953b960fd017d15f0c504601cdc28768467dca108b03a56df187b5045cda&w=826',
  ],
  interests: [
    'Yoga',
    'Coffee',
    'Travel',
    'Art',
    'Fashion',
    'Wellness',
  ],
  prompts: [
    {
      question: 'A perfect day includes...',
      answer: 'Morning yoga on the beach, followed by a coffee tasting tour, and ending with a sunset picnic in the park.'
    },
    {
      question: 'Best travel story',
      answer: 'Discovering a secluded waterfall in Hawaii and spending the day swimming and meditating in nature.'
    }
  ],
  email: 'emily@example.com',
  isPremium: true
};

export default function EditProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: userProfile.name,
    age: userProfile.age,
    location: userProfile.location,
    bio: userProfile.bio,
    interests: userProfile.interests.join(', '),
    prompts: userProfile.prompts,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    router.push('/profile');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <NavigationLayout>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Page Header */}
        <header className="flex justify-between items-center p-4 bg-white border-b">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-dating-purple to-dating-pink">
              Edit Profile
            </h1>
          </div>
          <Button 
              variant="default" 
              size="sm" 
              onClick={async () => {
                await signAndVerifyMessage();
                router.push('/profile');
              }}
            >
              <PenToolIcon className="h-4 w-4 mr-1" />
              Save & Sign
            </Button>
        </header>

        <form onSubmit={handleSubmit} className="px-6 py-8 space-y-6 pb-20">
          {/* Photos Section */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Photos</h3>
              <div className="relative h-[300px] mb-4">
                <Image
                  src={userProfile.photos[0]}
                  alt="Profile photo"
                  fill
                  className="object-cover rounded-lg"
                />
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-4 right-4"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Basic Info Section */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Age</label>
                <Input
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
          </Card>

          {/* About Section */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold mb-4">About</h3>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Bio</label>
                <Textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Interests (comma-separated)</label>
                <Input
                  name="interests"
                  value={formData.interests}
                  onChange={handleChange}
                  placeholder="e.g., Yoga, Coffee, Travel"
                />
              </div>
            </CardContent>
          </Card>

          {/* Prompts Section */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold mb-4">Prompts</h3>
              
              {formData.prompts.map((prompt, index) => (
                <div key={index} className="space-y-2">
                  <label className="text-sm font-medium">{prompt.question}</label>
                  <Textarea
                    name={`prompts.${index}.answer`}
                    value={prompt.answer}
                    onChange={(e) => {
                      const newPrompts = [...formData.prompts];
                      newPrompts[index] = {
                        ...newPrompts[index],
                        answer: e.target.value
                      };
                      setFormData(prev => ({ ...prev, prompts: newPrompts }));
                    }}
                    rows={3}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </form>
      </div>
    </NavigationLayout>
  );
} 