import React, { useRef } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import TextArea from 'react-native-scrollable-text-area'

const text = "Test\nTest\nTest\nTest\nTest\nTest\nTest\nTest\nTest\nTest\nTest\nTest\nTest\nTest\nTest\nTest\nTest\nTest\nTest\nTest\nTest\nTest\nTest\nTest\nTest\n"

const App = function App() {
  const inputRef = useRef(null)
  return <TextArea ref={inputRef} value={text} containerStyle={{ height: 500 }}/>
}

export default App
