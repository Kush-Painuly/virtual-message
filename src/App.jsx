import React, { useState } from 'react'
import Screen1 from './screens/Screen1.jsx'
import Screen2 from './screens/Screen2.jsx'
import Screen3 from './screens/Screen3.jsx'
import Screen4 from './screens/Screen4.jsx'
import Screen5 from './screens/Screen5.jsx'
import Screen6 from './screens/Screen6.jsx'

// As new screens are built, add them here and pass `onNext` to each screen
const SCREENS = [Screen1, Screen2, Screen3, Screen4, Screen5, Screen6]

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(0)

  const goNext = () => {
    setCurrentScreen(prev => Math.min(prev + 1, SCREENS.length - 1))
  }

  const CurrentScreen = SCREENS[currentScreen]

  return <CurrentScreen onNext={goNext} />
}
