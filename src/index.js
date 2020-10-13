import PropTypes from 'prop-types'
import React, { forwardRef, useState } from 'react'
import { StyleSheet, ScrollView, TextInput, TouchableWithoutFeedback, View } from 'react-native'

const TextArea = forwardRef(({
  value,
  containerStyle,
  style,
  onBlur,
  onFocus,
  ...props
}, ref) => {
  const [isInitial, setIsInitial] = useState(true)
  const [isScrolling, setIsScrolling] = useState(false)

  const onBlurCallback = isInitial
  ? () => setIsInitial(false)
  : onBlur
  const onFocusCallback = isInitial
  ? () => ref && ref.current && ref.current.blur()
  : onFocus
  const onScrollBeginDrag = () => setIsScrolling(true)
  const onScrollEndDrag = () => setIsScrolling(false)

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainerStyle}
      style={[styles.style, containerStyle]}
      onScrollBeginDrag={onScrollBeginDrag}
      onScrollEndDrag={onScrollEndDrag}
    >
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.contentContainerStyle}
        style={[styles.style, containerStyle]}
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={onScrollEndDrag}
      >
        <View pointerEvents={isScrolling || isInitial ? 'box-only' : 'auto'} style={styles.style}>
          <TextInput
            ref={ref}
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  style: {
    flex: 1,
    width: '100%'
  },
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
