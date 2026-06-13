import { useState } from 'react'
import SplashScreen from './components/SplashScreen'
import Onboarding from './components/Onboarding'
import App from './App'

const DONE_KEY = 'codepad-pro_onboarded_v1'
type Phase = 'splash' | 'onboard' | 'app'

export default function AppWrapper() {
  const [phase, setPhase] = useState<Phase>('splash')
  const features = ["Syntax highlighted snippets", "Tag and search library", "Copy with one click", "100+ languages"]
  return (
    <>
      {phase === 'splash' && <SplashScreen onDone={()=>setPhase(localStorage.getItem(DONE_KEY)?'app':'onboard')} color1="#6366f1" color2="#4f46e5" emoji="💻" name="CodePad Pro" tagline="Local code snippet manager"/>}
      {phase === 'onboard' && <Onboarding onDone={()=>{localStorage.setItem(DONE_KEY,'1');setPhase('app')}} color1="#6366f1" emoji="💻" name="CodePad Pro" features={features}/>}
      {phase === 'app' && <App/>}
    </>
  )
}