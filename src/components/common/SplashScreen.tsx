import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Svg, { Image as SvgImage } from 'react-native-svg';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const AnimatedView = Animated.createAnimatedComponent(View);

const ShoplyLogo = () => {
  return (
    <Svg
      width="320"
      height="110"
      viewBox="0 0 2172 724"
    >
      <SvgImage
        href={require('@/assets/images/brand-logo.png')}
        x="0"
        y="0"
        width="2172"
        height="724"
        preserveAspectRatio="xMidYMid meet"
      />
    </Svg>
  );
};

const SplashScreen = () => {
  const theme = useTheme();

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.88);
  const translateY = useSharedValue(20);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 400,
    });

    translateY.value = withTiming(0, {
      duration: 650,
    });

    scale.value = withDelay(
      100,
      withSequence(
        withTiming(1.04, {
          duration: 450,
        }),
        withSpring(1, {
          damping: 12,
          stiffness: 150,
        }),
      ),
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      {
        translateY: translateY.value,
      },
      {
        scale: scale.value,
      },
    ],
  }));

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <AnimatedView style={[styles.logoContainer, animatedStyle]}>
        <ShoplyLogo />
      </AnimatedView>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoContainer: {
    width: 320,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
});