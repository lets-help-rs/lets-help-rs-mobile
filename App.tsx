import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import WebView from 'react-native-webview';
import {WEB_URL} from '@env';

const App: React.FC = () => {
  const webViewRef = useRef<WebView>(null);
  const url = WEB_URL;

  const [colorIndex, setColorIndex] = useState(0);
  const colors = ['#007f5f', '#fcbf49', '#d62828'];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setColorIndex(prevIndex => (prevIndex + 1) % colors.length);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [colors.length]);

  const handleRetry = () => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{uri: url}}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size={100} color={colors[colorIndex]} />
          </View>
        )}
        renderError={() => <Button title="Retry" onPress={handleRetry} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export default App;
