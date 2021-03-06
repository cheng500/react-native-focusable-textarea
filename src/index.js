import PropTypes from 'prop-types'
import React, { forwardRef, useRef, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

const TextArea = forwardRef(({
  value,
  containerStyle,
  style,
  onBlur,
  onFocus,
  ...props
}, ref) => {
  const inputRef = ref ? ref : useRef(null)
  const [isInitial, setIsInitial] = useState(true)

  const onBlurCallback = isInitial
  ? () => setIsInitial(false)
  : onBlur
  const onFocusCallback = isInitial
  ? () => inputRef && inputRef.current && inputRef.current.blur()
  : onFocus

  return (
    <View pointerEvents={isInitial ? 'box-only' : 'auto'} style={[styles.style, containerStyle]}>
      <TextInput
        ref={inputRef}
        autoFocus={isInitial}
        caretHidden={isInitial}
        multiline={true}
        selection={isInitial ? { start: 0, end: 0 } : undefined}
        showSoftInputOnFocus={! isInitial}
        textAlignVertical="top"
        value={value}
        style={[styles.style, style]}
        onBlur={onBlurCallback}
        onFocus={onFocusCallback}
        {...props}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  style: {
    flex: 1,
  }
})

TextArea.propTypes = {
  value: PropTypes.string,
  containerStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
}

export default TextArea
