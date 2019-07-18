import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppStyles from '@/config/styles';
import {
  Title,
  Subheading,
} from 'react-native-paper';
import {
  View,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({

});

export default class TypingText extends Component {
  constructor(props) {
    super(props);

    this.index = 0;
    this.timer = -1;
    this.blinking_cursor = -1;
  }

  state = {
    text: '',
    cursor_color: 'transparent',
  }

  componentDidMount() {
    if (this.props.autoPlay) {
      this.play();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    this.timer = -1;

    clearInterval(this.blinking_cursor);
    this.blinking_cursor = -1;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.text !== this.props.text) {
      const random = setTimeout(() => {
        this.setState({ text: '' }, () => {
          this.clear();
          this.play();
          clearTimeout(random);
        });
      }, this.props.delay);
    }
  }

  startTyping = () => {
    // clear previous timer to avoid memory leaks
    clearTimeout(this.timer);
    // Re-initalize the timer .
    this.timer = -1;
    // if the typing isn't finished
    if (this.index < this.props.text.length) {
      this.setState({ text: this.state.text + this.props.text.charAt(this.index) }, () => {
        this.index += 1;
        this.timer = setTimeout(() => this.startTyping(), this.props.speed);
      });
    } else {
      // Alert the parent component that typing is finshed.
      this.props.onComplete();
    }
  }

  blinkingCursor = () => {
    this.blinking_cursor = setInterval(() => {
      if (this.state.cursor_color === 'transparent') {
        this.setState({ cursor_color: this.props.color });
      } else {
        this.setState({ cursor_color: 'transparent' });
      }
    }, this.props.cursorSpeed);
  }

  play = () => {
    this.startTyping();
    this.blinkingCursor();
  }

  clear = () => {
    this.index = 0;

    clearTimeout(this.timer);
    this.timer = -1;

    clearInterval(this.blinking_cursor);
    this.blinking_cursor = -1;
  }

  render() {
    const Tag = this.props.type === 'smaller' ? Subheading : Title;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Tag
          style={{
            width: '100%',
            marginVertical: 8,
            textAlign: 'center',
            color: this.props.color,
            fontFamily: AppStyles.fonts.SECOND_FONT_REGULAR,
            lineHeight: this.props.type === 'smaller' ? 23 : 40,
          }}>
            { this.state.text }
            <Tag style={{ color: this.state.cursor_color, lineHeight: 44 }}>|</Tag>
        </Tag>
    </View>
    );
  }
}

TypingText.propTypes = {
  type: PropTypes.string,
  speed: PropTypes.number,
  delay: PropTypes.number,
  color: PropTypes.string,
  autoPlay: PropTypes.bool,
  onComplete: PropTypes.func,
  cursorSpeed: PropTypes.number,
  text: PropTypes.string.isRequired,
};

TypingText.defaultProps = {
  speed: 50,
  delay: 1000,
  autoPlay: false,
  cursorSpeed: 250,
  color: AppStyles.colors.inactiveGreyColor,
  onComplete: () => console.log('Finished Typing'),
};
