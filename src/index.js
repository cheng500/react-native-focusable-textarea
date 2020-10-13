import PropTypes from 'prop-types'
import React, { forwardRef, useRef, useState } from 'react'
import { StyleSheet, ScrollView, TextInput, TouchableWithoutFeedback, View } from 'react-native'

const TextArea = forwardRef(({
  value,
  containerStyle,
  style,
  onBlur,
  onFocus,
  onMomentumScrollEnd,
  ...props
}, ref) => {
  const inputRef = ref ? ref : useRef(null)
  const [isInitial, setIsInitial] = useState(true)
  const [isScrolling, setIsScrolling] = useState(false)

  const onBlurCallback = isInitial
  ? () => setIsInitial(false)
  : onBlur
  const onFocusCallback = isInitial
  ? () => inputRef && inputRef.current && inputRef.current.blur()
  : onFocus
  const onScrollBeginDrag = () => setIsScrolling(true)
  const onScrollEndDrag = () => setIsScrolling(false)

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainerStyle}
      style={[styles.style, containerStyle]}
      onScrollBeginDrag={onScrollBeginDrag}
      onScrollEndDrag={onScrollEndDrag}      
      onMomentumScrollEnd={onMomentumScrollEnd}
      keyboardShouldPersistTaps='handled'
    >
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.contentContainerStyle}
        style={[styles.style, containerStyle]}
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
        keyboardShouldPersistTaps='handled'
      >
        <View pointerEvents={isScrolling || isInitial ? 'box-only' : 'auto'} style={styles.style}>
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
      </ScrollView>
    </ScrollView>
  )
})

const styles = StyleSheet.create({
  contentContainerStyle: {
    minWidth: '100%'
  },
  style: {
    flex: 1,
  }
})

TextArea.propTypes = {
  hidden: PropTypes.bool,
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
