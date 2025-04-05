'use client'

import { VerifyHumanity } from '@/components/VerifyHumanity'
// import { useVerification } from '@/contexts/verification-context'

export default function VerifyPage() {
//   const { setVerified } = useVerification()

//   const handleVerificationSuccess = () => {
//     setVerified(true)
//   }

  return (
    <div className="min-h-screen">
      <VerifyHumanity onVerificationSuccess={()=>{}} />
    </div>
  )
} 