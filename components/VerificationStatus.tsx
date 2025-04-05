import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { useProfileVerification } from '@/lib/hooks/useProfileVerification';

export const VerificationStatus = ({ address }: { address: string }) => {
  const { getProfile, loading, error } = useProfileVerification();
  const [profile, setProfile] = useState<{
    isVerified: boolean;
    timestamp: number;
  } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile(address);
        setProfile({
          isVerified: profileData.isVerified,
          timestamp: profileData.timestamp,
        });
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    if (address) {
      fetchProfile();
    }
  }, [address, getProfile]);

  if (loading) {
    return <Badge variant="outline">Loading...</Badge>;
  }

  if (error) {
    return <Badge variant="destructive">Error loading verification</Badge>;
  }

  if (!profile) {
    return <Badge variant="secondary">Not verified</Badge>;
  }

  return (
    <div className="flex flex-col gap-1">
      <Badge variant={profile.isVerified ? "default" : "secondary"}>
        {profile.isVerified ? "Verified Profile" : "Not Verified"}
      </Badge>
      {profile.isVerified && (
        <span className="text-xs text-gray-500">
          Verified on {new Date(Number(profile.timestamp) * 1000).toLocaleDateString()}
        </span>
      )}
    </div>
  );
}; 