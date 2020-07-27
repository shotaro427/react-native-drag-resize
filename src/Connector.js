import React, {Component} from 'react';
import {
  PanResponder,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

export const CONNECTOR_TOP_LEFT = 'tl';
export const CONNECTOR_TOP_MIDDLE = 'tm';
export const CONNECTOR_TOP_RIGHT = 'tr';
export const CONNECTOR_MIDDLE_RIGHT = 'mr';
export const CONNECTOR_BOTTOM_RIGHT = 'br';
export const CONNECTOR_BOTTOM_MIDDLE = 'bm';
export const CONNECTOR_BOTTOM_LEFT = 'bl';
export const CONNECTOR_MIDDLE_LEFT = 'ml';
export const CONNECTOR_CENTER = 'c';

/**
 * Connector component for handle touch events.
 */
export class Connector extends Component {

  constructor(props) {
    super(props);

    this.position = {
      x: 0,
      y: 0,
    };

    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onStartShouldSetPanResponderCapture: (event, gestureState) => true,
      onMoveShouldSetPanResponder: (event, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (event, gestureState) => true,

      onPanResponderGrant: (event, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
        const {
          onStart
        } = this.props;

        this.position = {
          x: 0,
          y: 0,
        };

        onStart([
          0,
          0,
        ]);
      },
      onPanResponderMove: (event, gestureState) => {
        const {
          onMove
        } = this.props;

        onMove([
          gestureState.dx - this.position.x,
          gestureState.dy - this.position.y,
        ]);

        this.position = {
          x: gestureState.dx,
          y: gestureState.dy,
        };
      },
      onPanResponderTerminationRequest: (event, gestureState) => true,
      onPanResponderRelease: (event, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        const {
          onEnd
        } = this.props;

        onEnd([
          gestureState.moveX,
          gestureState.moveY,
        ]);
      },
      onPanResponderTerminate: (event, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (event, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
  }

  render() {
    const {
      type,
      x,
      y,
      size,
    } = this.props;

    if (type === 'c') {
      console.log(type);
      console.log(this._panResponder.panHandlers);
      return (
        <View
          style={{
            position: 'absolute',
            top: 7,
            left: 7,
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent'
          }}
          {...this._panResponder.panHandlers}
        />
      );
    }

    if (['ml', 'mr'].includes(type)) {
      return (
        <View
          style={{
            position: 'absolute',
            left: (type === 'ml') ? ( x - 4 ) : ( x + 6 ),
            top: ( y - ( y * 0.3 ) + 4.5 ),
            width: 4.5,
            height: '30%',
            backgroundColor: 'white'
          }}
          {...this._panResponder.panHandlers}
        />
      );
    }

    if (['tm', 'bm'].includes(type)) {
      console.log(type);
      console.log(this._panResponder.panHandlers);
      return (
        <View
          {...this._panResponder.panHandlers}
          style={{
            position: 'absolute',
            left: ( x - (x * 0.30) + 4.5 ),
            top: (type === 'tm') ? ( y - 4.5 ) : ( y + 6.5 ),
            width: '30%',
            height: 4.5,
            backgroundColor: 'white',
            zIndex: 100
          }}
        />
      );
    }

    if (type === 'bl') {
      return (
        <View style={{
          position: 'absolute',
          left: ( x - 4 ),
          top: ( y - ( y * 0.15 ) + 11 ),
          width: '15%',
          height: '15%',
          backgroundColor: 'transparent',
          zIndex: -1000
        }}>
        <View
          style={{
            width: 4.5,
            top: 0,
            height: '100%',
            backgroundColor: 'white'
          }}
          {...this._panResponder.panHandlers}
        />
        <View
          style={{
            top: -4.5,
            width: '100%',
            height: 4.5,
            backgroundColor: 'white'
          }}
          {...this._panResponder.panHandlers}
        />
      </View>
      );
    }

    if (type === 'br') {
      return (
        <View style={{
          position: 'absolute',
          left: ( x - ( x * 0.15 ) + 11.5),
          top: ( y - ( y * 0.15 ) + 11.5 ),
          width: '15%',
          height: '15%',
          backgroundColor: '',
          zIndex: -1000
        }}>
          <View
            style={{
              top: -1,
              left: ( (x * 0.15) - 4.5 ),
              width: 4.5,
              height: '100%',
              backgroundColor: 'white'
            }}
            {...this._panResponder.panHandlers}
          />
          <View
            style={{
              position: 'absolute',
              top: (y - ( y * 0.85) - 6),
              left: 0,
              width: '100%',
              height: 4.5,
              backgroundColor: 'white'
            }}
            {...this._panResponder.panHandlers}
          />
        </View>
      );
    }

    if (type === 'tl') {
      return (
        <View style={{
          position: 'absolute',
          left: ( x - ( x * 0.15 ) - 4.5 ),
          top: ( y - 4.5 ),
          width: '15%',
          height: '15%' ,
          backgroundColor: 'transparent',
          zIndex: -1000
        }}>
        <View
          style={{
            left: x, 
            top: ( y - ( y * 0.15 ) ),
            width: 4.5,
            height: '100%',
            backgroundColor: 'white'
          }}
          {...this._panResponder.panHandlers}
        />
        <View
          style={{
            left: x,
            top: '-100%',
            width: '100%',
            height: 4.5,
            backgroundColor: 'white'
          }}
          {...this._panResponder.panHandlers}
        />
      </View>
      );
    }

    if (type === 'tr') {
      return (
        <View style={{
          position: 'absolute',
          left: ( x - ( x * 0.15 ) + 11.5),
          top: ( y - 4.5 ),
          width: '15%',
          height: '15%',
          backgroundColor: 'transparent',
          zIndex: -1000
        }}>
          <View
            style={{
              left: ( (x * 0.15) - 4.5 ),
              top: y,
              width: 4.5,
              height: '100%',
              backgroundColor: 'white'
            }}
            {...this._panResponder.panHandlers}
          />
          <View
            style={{
              left: 0,
              top: '-100%',
              width: '100%',
              height: 4.5,
              backgroundColor: 'white'
            }}
            {...this._panResponder.panHandlers}
          />
        </View>
      );
    }
  }
}

Connector.propTypes = {
  type: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  size: PropTypes.number,
  onStart: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onEnd: PropTypes.func.isRequired,
};
